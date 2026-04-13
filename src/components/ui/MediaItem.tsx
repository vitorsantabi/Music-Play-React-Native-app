import { COLORS, FONTS, SPACING, BORDER_RADIUS, ANIMATION, SHADOWS } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface MediaItemProps {
  imageUri: any;
  title: string;
  sub?: string;
  linkHref: string;
  variant?: "album" | "artist";
}

const MediaItem: React.FC<MediaItemProps> = ({
  imageUri,
  title,
  sub,
  linkHref,
  variant = "album",
}) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      ...ANIMATION.springBouncy,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...ANIMATION.spring,
    }).start();
  };

  const handlePress = () => {
    if (linkHref) {
      router.push(linkHref as any);
    }
  };

  const isArtist = variant === "artist";
  const containerWidth = isArtist ? 130 : 160;
  const imageBorderRadius = isArtist ? BORDER_RADIUS.xl : BORDER_RADIUS.m;

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.container,
          { width: containerWidth, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={[styles.imageContainer, isArtist && styles.artistImageContainer]}>
          <Image
            source={imageUri}
            style={[styles.image, { borderRadius: imageBorderRadius }]}
            contentFit="cover"
            transition={300}
          />
          {/* Colored shadow beneath album art */}
          {!isArtist && <View style={styles.imageShadow} />}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {sub && (
            <Text style={styles.sub} numberOfLines={1}>
              {sub}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.s,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: SPACING.s + 2,
    position: "relative",
  },
  artistImageContainer: {
    ...SHADOWS.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageShadow: {
    position: "absolute",
    bottom: -6,
    left: "10%",
    right: "10%",
    height: 20,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    transform: [{ scaleX: 0.9 }],
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
  },
  sub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: "center",
    marginTop: 2,
  },
});

export default MediaItem;
