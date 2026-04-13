import { COLORS, FONTS, SPACING, BORDER_RADIUS, ANIMATION, SHADOWS } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.4;
const CARD_HEIGHT = CARD_WIDTH * 1.15;

interface RecentlyPlayedCardProps {
  imageUri: any;
  title: string;
  subtitle?: string;
  linkHref: string;
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({
  imageUri,
  title,
  subtitle,
  linkHref,
}) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      ...ANIMATION.springBouncy,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...ANIMATION.spring,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(linkHref as any)}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Full Cover Image */}
        <Image
          source={imageUri}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)", "rgba(0,0,0,0.92)"]}
          locations={[0.3, 0.7, 1]}
          style={styles.gradient}
        />

        {/* Play Button (top-right) */}
        <View
          style={[
            styles.playButton,
            isPressed && styles.playButtonActive,
          ]}
        >
          <Ionicons
            name="play"
            size={12}
            color={COLORS.white}
            style={{ marginLeft: 1 }}
          />
        </View>

        {/* Text Content (bottom) */}
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS.m,
    overflow: "hidden",
    marginRight: SPACING.m,
    position: "relative",
    ...SHADOWS.md,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },
  playButton: {
    position: "absolute",
    top: SPACING.s,
    right: SPACING.s,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(139, 92, 246, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  playButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: "rgba(255,255,255,0.3)",
  },
  textContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.m,
  },
  title: {
    fontSize: 13.5,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
    letterSpacing: 0.3,
  },
});

export default RecentlyPlayedCard;
