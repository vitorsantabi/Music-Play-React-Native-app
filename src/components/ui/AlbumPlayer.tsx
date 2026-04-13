import { poppinsFontMap, usePoppinsFonts } from "@/components/fonts/PoppinsFonts";
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from "@/constants/theme";
import { useAudio, Track } from "@/contexts/AudioContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

interface AlbumPlayerProps {
  albumTitle: string;
  artistName: string;
  albumCover: any;
  tracks: Track[];
  accentColors?: readonly [string, string];
}

const { width } = Dimensions.get("window");
const COVER_SIZE = width * 0.55;

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({
  albumTitle,
  artistName,
  albumCover,
  tracks,
  accentColors = COLORS.gradient.hero,
}) => {
  const [fontsLoaded] = usePoppinsFonts();
  const router = useRouter();
  const pathname = usePathname();
  const audio = useAudio();

  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Check if this album is currently loaded in the AudioContext
  const isThisAlbumLoaded = audio.albumTitle === albumTitle && audio.artistName === artistName;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(listOpacity, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [fontsLoaded]);

  const handleTrackSelect = (index: number) => {
    if (isThisAlbumLoaded) {
      audio.selectTrack(index);
      if (!audio.isPlaying) {
        audio.playPause();
      }
    } else {
      audio.loadAlbum({
        tracks,
        trackIndex: index,
        albumTitle,
        artistName,
        albumCover,
        accentColors,
        albumLink: pathname,
      });
    }
  };

  const handlePlayAlbum = () => {
    if (isThisAlbumLoaded && audio.isPlaying) {
      audio.playPause();
    } else if (isThisAlbumLoaded && !audio.isPlaying) {
      audio.playPause();
    } else {
      handleTrackSelect(0);
    }
  };

  // Shuffle function removed as per request

  if (!fontsLoaded) return null;

  const currentTrackIndex = isThisAlbumLoaded ? audio.trackIndex : -1;
  const isPlaying = isThisAlbumLoaded ? audio.isPlaying : false;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [50, 0, 100],
    extrapolate: "clamp",
  });

  const coverScrollOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground source={albumCover} style={styles.background} imageStyle={styles.backgroundImage} blurRadius={90}>
        <LinearGradient 
          colors={["rgba(10,10,15,0.4)", "rgba(10,10,15,0.8)", COLORS.background]} 
          locations={[0, 0.4, 0.7]}
          style={StyleSheet.absoluteFillObject} 
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* Header Bar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {/* Album Info Header */}
            <Animated.View style={[styles.albumInfoContainer, { opacity: headerOpacity }]}>
              <Animated.View style={[styles.coverWrapper, { opacity: coverScrollOpacity, transform: [{ translateY: headerTranslateY }] }]}>
                <Image source={albumCover} style={styles.coverImage} contentFit="cover" transition={300} />
              </Animated.View>
              
              <Text style={styles.albumTitle} numberOfLines={2}>{albumTitle}</Text>
              <Text style={styles.artistNameText}>{artistName}</Text>
              <Text style={styles.metadataText}>Álbum • {tracks.length} músicas</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionIconBtn}>
                  <Ionicons name="add-circle-outline" size={28} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn}>
                  <Ionicons name="arrow-down-circle-outline" size={28} color={COLORS.textSecondary} />
                </TouchableOpacity>
                
                <View style={{ flex: 1 }} />

                {/* Shuffle button removed as per request */}
                <TouchableOpacity onPress={handlePlayAlbum} style={styles.playBtn}>
                  <LinearGradient colors={accentColors} style={styles.playBtnGradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" style={{ marginLeft: isPlaying ? 0 : 3 }} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Tracklist */}
            <Animated.View style={[styles.trackListContainer, { opacity: listOpacity }]}>
              {tracks.map((item, index) => {
                const isActive = index === currentTrackIndex;
                return (
                  <TouchableOpacity 
                    key={index.toString()} 
                    style={styles.trackItem} 
                    onPress={() => handleTrackSelect(index)}
                  >
                    <View style={styles.trackIndexContainer}>
                      {isActive && isPlaying ? (
                        <View style={styles.playingIndicator}>
                          <LinearGradient colors={accentColors} style={styles.playingDot} />
                        </View>
                      ) : (
                        <Text style={[styles.trackIndexText, isActive && { color: accentColors[0] as string }]}>
                          {index + 1}
                        </Text>
                      )}
                    </View>
                    
                    <View style={styles.trackItemInfo}>
                      <Text style={[styles.trackItemTitle, isActive && { color: accentColors[0] as string, fontFamily: poppinsFontMap.bold }]}>
                        {item.name}
                      </Text>
                      <Text style={styles.trackItemArtist}>{artistName}</Text>
                    </View>

                    <TouchableOpacity style={styles.trackMoreBtn}>
                      <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textMuted} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
            <View style={{ height: 120 }} />
          </Animated.ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  background: { flex: 1, width: "100%", height: "100%" },
  backgroundImage: { resizeMode: "cover", opacity: 0.6 },
  safeArea: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, zIndex: 10 },
  iconButton: { width: 44, height: 44, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 22 },
  scrollContent: { paddingBottom: 40 },
  albumInfoContainer: { alignItems: "center", paddingHorizontal: 24, paddingTop: 10, paddingBottom: 24 },
  coverWrapper: { width: COVER_SIZE, height: COVER_SIZE, borderRadius: BORDER_RADIUS.m, ...SHADOWS.lg, marginBottom: 24, backgroundColor: "#222" },
  coverImage: { width: "100%", height: "100%", borderRadius: BORDER_RADIUS.m },
  albumTitle: { color: COLORS.white, fontSize: 24, fontFamily: poppinsFontMap.bold, textAlign: "center", marginBottom: 4 },
  artistNameText: { color: COLORS.textSecondary, fontSize: 16, fontFamily: poppinsFontMap.medium, marginBottom: 8 },
  metadataText: { color: COLORS.textMuted, fontSize: 13, fontFamily: poppinsFontMap.regular, marginBottom: 20 },
  actionButtons: { flexDirection: "row", alignItems: "center", width: "100%", marginTop: 10 },
  actionIconBtn: { padding: 8, marginRight: 8 },
  shuffleBtn: { padding: 12, marginRight: 8 },
  playBtn: { ...SHADOWS.md },
  playBtnGradient: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" },
  trackListContainer: { paddingHorizontal: 16, marginTop: 10 },
  trackItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.05)" },
  trackIndexContainer: { width: 40, alignItems: "center", justifyContent: "center" },
  trackIndexText: { color: COLORS.textMuted, fontSize: 15, fontFamily: poppinsFontMap.medium },
  playingIndicator: { justifyContent: "center", alignItems: "center" },
  playingDot: { width: 12, height: 12, borderRadius: 6 },
  trackItemInfo: { flex: 1, paddingRight: 16 },
  trackItemTitle: { fontSize: 16, fontFamily: poppinsFontMap.medium, color: COLORS.text, marginBottom: 2 },
  trackItemArtist: { fontSize: 13, fontFamily: poppinsFontMap.regular, color: COLORS.textMuted },
  trackMoreBtn: { padding: 8 },
});

export default AlbumPlayer;
