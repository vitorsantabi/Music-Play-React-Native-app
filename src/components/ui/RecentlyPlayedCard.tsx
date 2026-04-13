import { COLORS, FONTS, SPACING, BORDER_RADIUS, ANIMATION } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface RecentlyPlayedCardProps {
  imageUri: any;
  title: string;
  linkHref: string;
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({
  imageUri,
  title,
  linkHref,
}) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(linkHref as any)}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image
          source={imageUri}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.s,
    overflow: "hidden",
    flex: 1,
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
    height: 58,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  image: {
    width: 58,
    height: 58,
  },
  title: {
    flex: 1,
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    paddingHorizontal: SPACING.s + 2,
  },
});

export default RecentlyPlayedCard;
