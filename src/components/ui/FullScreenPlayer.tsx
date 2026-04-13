import { poppinsFontMap } from "@/components/fonts/PoppinsFonts";
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from "@/constants/theme";
import { useAudio } from "@/contexts/AudioContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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
import { useRouter } from "expo-router";

interface FullScreenPlayerProps {
  onClose: () => void;
}

const { width } = Dimensions.get("window");
// A large cover size for a beautiful portrait layout
const COVER_SIZE = width * 0.85;

const formatTime = (seconds: number | null | undefined): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ onClose }) => {
  const audio = useAudio();
  const router = useRouter();

  const currentTrack = audio.tracks[audio.trackIndex];
  const isPlaying = audio.isPlaying;
  const position = audio.position;
  const duration = audio.duration;
  const progress = duration && duration > 0 ? (position / duration) * 100 : 0;

  // Intro Entry Animations
  const coverScale = useRef(new Animated.Value(0.9)).current;
  const coverOpacity = useRef(new Animated.Value(0)).current;
  const pillTranslateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(coverScale, {
        toValue: 1,
        damping: 15,
        stiffness: 150,
        useNativeDriver: true,
      }),
      Animated.timing(coverOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(pillTranslateY, {
        toValue: 0,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoToAlbum = () => {
    onClose();
    if (audio.albumLink) {
      router.push(audio.albumLink as any);
    }
  };

  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      {/* Heavy blurred background modeled after reference image */}
      <ImageBackground
        source={audio.albumCover}
        style={styles.background}
        blurRadius={90}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.85)"]}
          locations={[0, 0.4, 0.9]}
          style={StyleSheet.absoluteFillObject}
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
              <Ionicons name="chevron-down" size={32} color={COLORS.white} />
            </TouchableOpacity>
            
            <View style={{ alignItems: "center" }}>
              <Text style={styles.headerSubtitle}>TOCANDO AGORA</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>{audio.albumTitle}</Text>
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={handleGoToAlbum}>
              <Ionicons name="list" size={26} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Main Cover Section */}
          <View style={styles.mainContent}>
            <Animated.View
              style={[
                styles.coverWrapper,
                { transform: [{ scale: coverScale }], opacity: coverOpacity },
              ]}
            >
              <Image
                source={audio.albumCover}
                style={styles.coverImage}
                contentFit="cover"
                transition={300}
              />
            </Animated.View>

            <Text style={styles.songTitle} numberOfLines={1}>
              {currentTrack.name}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {audio.artistName}
            </Text>
          </View>

          {/* Glassmorphic Pill Controls Area */}
          <Animated.View style={[styles.bottomContainer, { transform: [{ translateY: pillTranslateY }] }]}>
            
            <View style={styles.progressContainer}>
              <View style={styles.timeLabels}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{duration ? `-${formatTime(duration - position)}` : "0:00"}</Text>
              </View>
              
              <TouchableOpacity
                style={styles.progressBarBackground}
                activeOpacity={1}
                onPress={(e) => {
                  const pct = Math.max(0, Math.min(1, e.nativeEvent.locationX / (width - 48)));
                  audio.seekTo(pct);
                }}
              >
                <View style={styles.progressBarTrack}>
                  <LinearGradient
                    colors={audio.accentColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBarFill, { width: `${progress}%` }]}
                  />
                  <View style={[styles.progressThumb, { left: `${progress}%` }]} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Glass Pill */}
            <BlurView intensity={35} tint="dark" style={styles.glassPill}>
              {/* Internal subtle gradient overlay */}
              <LinearGradient
                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.0)"]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={StyleSheet.absoluteFillObject}
              />

              <View style={styles.glassControls}>
                <TouchableOpacity onPress={audio.previousTrack} hitSlop={{top:10,bottom:10,left:10,right:10}}>
                  <Ionicons name="play-skip-back" size={32} color={COLORS.white} />
                </TouchableOpacity>

                <TouchableOpacity onPress={audio.playPause} style={styles.playButtonWrapper}>
                  <View style={styles.playButtonInner}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#000" style={{marginLeft: isPlaying ? 0 : 4}} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={audio.nextTrack} hitSlop={{top:10,bottom:10,left:10,right:10}}>
                  <Ionicons name="play-skip-forward" size={32} color={COLORS.white} />
                </TouchableOpacity>

                {/* Vertical Divider */}
                <View style={styles.divider} />

                {/* Mini Playing Info inside the pill */}
                <View style={styles.pillInfo}>
                  <Image source={audio.albumCover} style={styles.pillImage} />
                  <View style={styles.pillTextContainer}>
                    <Text style={styles.pillTitle} numberOfLines={1}>{currentTrack.name}</Text>
                    <Text style={styles.pillArtist} numberOfLines={1}>{audio.artistName}</Text>
                  </View>
                </View>

                {/* Additional controls (UI only for effect) */}
                <TouchableOpacity style={{marginLeft: 8}}>
                  <Ionicons name="chatbubble-ellipses-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
              </View>

            </BlurView>

            <View style={styles.bottomSecondaryControls}>
               <TouchableOpacity onPress={audio.toggleShuffle}>
                 <Ionicons name="shuffle" size={24} color={audio.isShuffle ? audio.accentColors[0] : "rgba(255,255,255,0.5)"} />
               </TouchableOpacity>
               <TouchableOpacity onPress={audio.toggleRepeat}>
                 <Ionicons name="repeat" size={24} color={audio.isRepeat ? audio.accentColors[0] : "rgba(255,255,255,0.5)"} />
               </TouchableOpacity>
            </View>

          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: poppinsFontMap.semiBold,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: poppinsFontMap.medium,
    color: COLORS.white,
    marginTop: 2,
    maxWidth: 200,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  coverWrapper: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: "#111",
    ...SHADOWS.glow("rgba(0,0,0,0.5)"),
    marginBottom: 40,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  songTitle: {
    fontSize: 32,
    fontFamily: poppinsFontMap.bold,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 18,
    fontFamily: poppinsFontMap.medium,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  progressContainer: {
    marginBottom: 24,
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    fontFamily: poppinsFontMap.medium,
    color: "rgba(255,255,255,0.6)",
  },
  progressBarBackground: {
    height: 30,
    justifyContent: "center",
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    position: "absolute",
    marginLeft: -6,
    ...SHADOWS.sm,
  },
  glassPill: {
    borderRadius: BORDER_RADIUS.round,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  glassControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playButtonWrapper: {
    marginHorizontal: 12,
  },
  playButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 12,
  },
  pillInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pillImage: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.s,
    marginRight: 10,
  },
  pillTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pillTitle: {
    fontSize: 12,
    fontFamily: poppinsFontMap.semiBold,
    color: COLORS.white,
  },
  pillArtist: {
    fontSize: 10,
    fontFamily: poppinsFontMap.medium,
    color: "rgba(255,255,255,0.6)",
  },
  bottomSecondaryControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 40,
  },
});

export default FullScreenPlayer;
