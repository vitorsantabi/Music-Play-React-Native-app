import { useAudio } from "@/contexts/AudioContext";
import { COLORS, FONTS, SPACING, BORDER_RADIUS, ANIMATION, SHADOWS } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FullScreenPlayer from "./FullScreenPlayer";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const formatTime = (seconds: number | null | undefined): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const MiniPlayer: React.FC = () => {
  const audio = useAudio();
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  const [isFullPlayerVisible, setFullPlayerVisible] = useState(false);

  // Show/hide animation
  const isVisible = audio.tracks.length > 0;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isVisible ? 0 : 100,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [isVisible]);

  // Update progress width
  useEffect(() => {
    const progress = audio.duration && audio.duration > 0
      ? (audio.position / audio.duration) * 100
      : 0;
    progressAnim.setValue(progress);
  }, [audio.position, audio.duration]);

  if (!isVisible) return null;

  const currentTrack = audio.tracks[audio.trackIndex];
  if (!currentTrack) return null;

  const progress = audio.duration && audio.duration > 0
    ? (audio.position / audio.duration) * 100
    : 0;

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Progress bar at the very top of the mini player */}
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={audio.accentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBar, { width: `${progress}%` }]}
          />
        </View>

        <View style={styles.content}>
          {/* Clickable Info Area */}
          <TouchableOpacity
            style={styles.infoArea}
            activeOpacity={0.9}
            onPress={() => setFullPlayerVisible(true)}
          >
            {/* Album Art */}
            <View style={styles.artContainer}>
              <Image
                source={audio.albumCover}
                style={styles.albumArt}
                contentFit="cover"
                transition={200}
              />
            </View>

            {/* Track Info */}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                {currentTrack.name}
              </Text>
              <Text style={styles.artistName} numberOfLines={1}>
                {audio.artistName}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={audio.previousTrack}
              style={styles.controlButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="play-skip-back" size={18} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={audio.playPause}
              style={styles.playButton}
            >
              <LinearGradient
                colors={audio.accentColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playButtonGradient}
              >
                <Ionicons
                  name={audio.isPlaying ? "pause" : "play"}
                  size={18}
                  color={COLORS.white}
                  style={{ marginLeft: audio.isPlaying ? 0 : 2 }}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={audio.nextTrack}
              style={styles.controlButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="play-skip-forward" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Modal
        visible={isFullPlayerVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setFullPlayerVisible(false)}
      >
        <FullScreenPlayer onClose={() => setFullPlayerVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(22, 22, 31, 0.97)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingBottom: 34, // safe area for bottom devices
    ...SHADOWS.lg,
  },
  progressBarContainer: {
    height: 2.5,
    backgroundColor: "rgba(255,255,255,0.08)",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    borderRadius: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s + 2,
  },
  infoArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  artContainer: {
    ...SHADOWS.sm,
    borderRadius: BORDER_RADIUS.s,
    overflow: "hidden",
  },
  albumArt: {
    width: 46,
    height: 46,
    borderRadius: BORDER_RADIUS.s,
  },
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.m,
    marginRight: SPACING.s,
  },
  trackTitle: {
    color: COLORS.white,
    fontSize: 13.5,
    fontFamily: FONTS.semiBold,
    letterSpacing: 0.1,
  },
  artistName: {
    color: COLORS.textMuted,
    fontSize: 11.5,
    fontFamily: FONTS.regular,
    marginTop: 1,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.s,
  },
  controlButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    ...SHADOWS.sm,
  },
  playButtonGradient: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiniPlayer;
