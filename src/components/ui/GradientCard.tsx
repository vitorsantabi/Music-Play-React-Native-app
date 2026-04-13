import { COLORS, BORDER_RADIUS, SPACING } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface GradientCardProps {
  colors?: readonly string[];
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  borderRadius?: number;
}

const GradientCard: React.FC<GradientCardProps> = ({
  colors = COLORS.gradient.card,
  children,
  onPress,
  style,
  borderRadius = BORDER_RADIUS.l,
}) => {
  const content = (
    <LinearGradient
      colors={colors as string[]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, { borderRadius }, style]}
    >
      <View style={[styles.border, { borderRadius }]}>{children}</View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.container, { borderRadius }]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.container, { borderRadius }]}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  gradient: {
    overflow: "hidden",
  },
  border: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
});

export default GradientCard;
