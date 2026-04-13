import { poppinsFontMap, usePoppinsFonts } from "@/components/fonts/PoppinsFonts";
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

interface Track {
  name: string;
  source: any;
}

interface AlbumPlayerProps {
  albumTitle: string;
  artistName: string;
  albumCover: any;
  tracks: Track[];
  accentColors?: readonly [string, string];
}

const { width } = Dimensions.get("window");
const COVER_SIZE = width * 0.85;

const formatTime = (seconds: number | null | undefined): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({
  albumTitle,
  artistName,
  albumCover,
  tracks,
  accentColors = COLORS.gradient.hero,
}) => {
  const [fontsLoaded] = usePoppinsFonts();
  const router = useRouter();
  const [trackIndex, setTrackIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const currentTrack = tracks[trackIndex];

  // Entry animations
  const coverOpacity = useRef(new Animated.Value(0)).current;
  const coverScale = useRef(new Animated.Value(0.85)).current;
  const controlsOpacity = useRef(new Animated.Value(0)).current;
  const controlsTranslate = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(coverOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(coverScale, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 100 }),
        Animated.timing(controlsOpacity, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
        Animated.timing(controlsTranslate, { toValue: 0, duration: 500, delay: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    return () => { if (sound) sound.unloadAsync(); };
  }, [sound]);

  const loadSound = async (index: number) => {
    try {
      if (sound) { try { await sound.unloadAsync(); } catch {} }
      const { sound: newSound, status } = await Audio.Sound.createAsync(tracks[index].source, { shouldPlay: true });
      setSound(newSound);
      setIsPlaying(true);
      if (status.isLoaded) setDuration(status.durationMillis ? status.durationMillis / 1000 : null);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis ? status.durationMillis / 1000 : null);
          setPosition(status.positionMillis / 1000);
          setIsPlaying(status.isPlaying);
          if (status.didJustFinish) nextTrack();
        }
      });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 0.3, duration: 150, useNativeDriver: true }).start(() => {
      loadSound(trackIndex);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  }, [trackIndex]);

  const playPause = async () => {
    if (sound) { isPlaying ? await sound.pauseAsync() : await sound.playAsync(); }
  };

  const nextTrack = () => {
    if (isShuffle) { setTrackIndex(Math.floor(Math.random() * tracks.length)); }
    else { setTrackIndex((prev) => (prev + 1) % tracks.length); }
  };

  const previousTrack = () => { setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length); };

  const handleTrackSelect = (index: number) => { setTrackIndex(index); setModalVisible(false); };

  const seekTo = async (percentage: number) => {
    if (sound && duration) await sound.setPositionAsync(percentage * duration * 1000);
  };

  if (!fontsLoaded) return null;

  const progress = duration && duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground source={albumCover} style={styles.background} imageStyle={styles.backgroundImage} blurRadius={80}>
        {/* Dynamic Dark Gradient Overlay to ensure text visibility */}
        <LinearGradient 
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]} 
          style={StyleSheet.absoluteFillObject} 
        />
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-down" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Cover */}
          <View style={styles.coverContainer}>
            <Animated.View style={[styles.coverWrapper, { opacity: coverOpacity, transform: [{ scale: coverScale }] }]}>
              <Image source={albumCover} style={styles.coverImage} contentFit="cover" transition={300} />
            </Animated.View>
          </View>

          {/* Player controls */}
          <Animated.View style={[styles.controlsContainer, { opacity: controlsOpacity, transform: [{ translateY: controlsTranslate }] }]}>
            
            {/* Song Info */}
            <View style={styles.songInfo}>
              <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
                <Text style={styles.songTitle} numberOfLines={1}>{currentTrack.name}</Text>
                <Text style={styles.artistNameText}>{artistName}</Text>
              </Animated.View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Lyrics Badge */}
            <TouchableOpacity style={styles.lyricsBadge}>
              <Ionicons name="text-outline" size={14} color="#fff" style={{marginRight: 6}} />
              <Text style={styles.lyricsText}>Lyrics</Text>
            </TouchableOpacity>

            {/* Progress */}
            <View style={styles.progressContainer}>
              <TouchableOpacity style={styles.progressBarBackground} activeOpacity={1}
                onPress={(e) => { const pct = Math.max(0, Math.min(1, e.nativeEvent.locationX / (width - 48))); seekTo(pct); }}>
                <LinearGradient colors={["#ffffff", "#cccccc"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: `${progress}%` }]} />
                <View style={[styles.progressThumb, { left: `${progress}%` }]} />
              </TouchableOpacity>
              <View style={styles.timeLabels}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{duration ? `-${formatTime(duration - position)}` : "0:00"}</Text>
              </View>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
                <Ionicons name="shuffle" size={24} color={isShuffle ? accentColors[0] : "rgba(255,255,255,0.6)"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={previousTrack}>
                <Ionicons name="play-skip-back" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={playPause} style={styles.playButton}>
                <View style={styles.playButtonInner}>
                  <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="#000" style={{ marginLeft: isPlaying ? 0 : 3 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextTrack}>
                <Ionicons name="play-skip-forward" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
                <Ionicons name="repeat" size={24} color={isRepeat ? accentColors[0] : "rgba(255,255,255,0.6)"} />
              </TouchableOpacity>
            </View>
          </Animated.View>

        </SafeAreaView>

        {/* Playlist Modal */}
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <BlurView intensity={95} tint="dark" style={styles.modalContainer}>
            <SafeAreaView style={styles.modalSafeArea}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{albumTitle}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <FlatList data={tracks} keyExtractor={(_, i) => i.toString()} contentContainerStyle={styles.trackList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={[styles.trackItem, index === trackIndex && styles.activeTrackItem]} onPress={() => handleTrackSelect(index)}>
                    <View style={styles.trackItemLeft}>
                      {index === trackIndex && <View style={styles.playingIndicator}>
                        <LinearGradient colors={accentColors as unknown as string[]} style={styles.playingDot} />
                      </View>}
                      <View style={styles.trackItemInfo}>
                        <Text style={[styles.trackItemTitle, index === trackIndex && { color: accentColors[0] as string, fontFamily: poppinsFontMap.bold }]}>{item.name}</Text>
                        <Text style={styles.trackItemArtist}>{artistName}</Text>
                      </View>
                    </View>
                    {index === trackIndex && <Ionicons name="musical-notes" size={18} color={accentColors[0] as string} />}
                  </TouchableOpacity>
                )} />
            </SafeAreaView>
          </BlurView>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1, width: "100%", height: "100%" },
  backgroundImage: { resizeMode: "cover", opacity: 0.85 },
  safeArea: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  iconButton: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  coverContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 },
  coverWrapper: { width: COVER_SIZE, height: COVER_SIZE, borderRadius: BORDER_RADIUS.xl, ...SHADOWS.xl, shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 30, elevation: 20, backgroundColor: "#222" },
  coverImage: { width: "100%", height: "100%", borderRadius: BORDER_RADIUS.xl },
  controlsContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  songInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  songTitle: { color: "#fff", fontSize: 26, fontFamily: poppinsFontMap.bold, marginBottom: 2 },
  artistNameText: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontFamily: poppinsFontMap.medium },
  lyricsBadge: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 30 },
  lyricsText: { color: "#fff", fontSize: 13, fontFamily: poppinsFontMap.semiBold },
  progressContainer: { marginBottom: 30 },
  progressBarBackground: { height: 4, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2, marginBottom: 12, position: "relative", justifyContent: "center" },
  progressBarFill: { height: "100%", borderRadius: 2 },
  progressThumb: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#fff", position: "absolute", marginLeft: -6, ...SHADOWS.sm },
  timeLabels: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: poppinsFontMap.medium },
  controls: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 4 },
  playButton: { justifyContent: "center", alignItems: "center" },
  playButtonInner: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", ...SHADOWS.md },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.92)" },
  modalSafeArea: { flex: 1 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.08)" },
  modalTitle: { fontSize: 20, fontFamily: poppinsFontMap.bold, color: "#fff" },
  modalCloseButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.1)", justifyContent: "center", alignItems: "center" },
  trackList: { padding: 20 },
  trackItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 12, borderRadius: BORDER_RADIUS.s, marginBottom: 2 },
  activeTrackItem: { backgroundColor: "rgba(139,92,246,0.12)" },
  trackItemLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  playingIndicator: { marginRight: 12 },
  playingDot: { width: 8, height: 8, borderRadius: 4 },
  trackItemInfo: { flex: 1 },
  trackItemTitle: { fontSize: 15, fontFamily: poppinsFontMap.medium, color: "rgba(255,255,255,0.8)", marginBottom: 2 },
  trackItemArtist: { fontSize: 12, fontFamily: poppinsFontMap.regular, color: "rgba(255,255,255,0.4)" },
});

export default AlbumPlayer;
