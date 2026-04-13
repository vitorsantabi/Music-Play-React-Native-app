import { COLORS, FONTS, SPACING } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  accentColor?: string;
  onSeeAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  accentColor = COLORS.primary,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: accentColor + "20" }]}>
            <Ionicons name={icon} size={16} color={accentColor} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Ver tudo</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}

      {/* Accent line */}
      <View style={styles.lineContainer}>
        <LinearGradient
          colors={[accentColor, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentLine}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.s,
    marginBottom: SPACING.xs,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    flex: 1,
  },
  seeAllButton: {
    position: "absolute",
    right: SPACING.l,
    top: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  lineContainer: {
    marginTop: SPACING.xs,
  },
  accentLine: {
    height: 2,
    width: 60,
    borderRadius: 1,
  },
});

export default SectionHeader;
