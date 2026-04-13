import { COLORS, FONTS, SPACING, BORDER_RADIUS, ANIMATION } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface ArtistCardProps {
  imageUri: any;
  title: string;
  linkHref: string;
  gradientColors?: readonly string[];
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  imageUri,
  title,
  linkHref,
  gradientColors = COLORS.gradient.hero,
}) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
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
    router.push(linkHref as any);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Gradient ring */}
        <LinearGradient
          colors={gradientColors as string[]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientRing}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={imageUri}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          </View>
        </LinearGradient>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: SPACING.s + 2,
    width: 100,
  },
  gradientRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    padding: 3,
    marginBottom: SPACING.s,
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 42,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    textAlign: "center",
  },
});

export default ArtistCard;
