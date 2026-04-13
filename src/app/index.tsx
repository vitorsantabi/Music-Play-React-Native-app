import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePoppinsFonts } from "@/components/fonts/PoppinsFonts";
import ArtistCard from "@/components/ui/ArtistCard";
import MediaItem from "@/components/ui/MediaItem";
import RecentlyPlayedCard from "@/components/ui/RecentlyPlayedCard";
import SearchBar from "@/components/ui/SearchBar";
import SectionHeader from "@/components/ui/SectionHeader";
import { BORDER_RADIUS, COLORS, FONTS, SPACING, SHADOWS } from "@/constants/theme";
import { ALBUMS, ARTISTS } from "@/data/mockData";

const avatar = require("@/images/userAvatar.jpg");

// Get greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

// Recently played items (first 6 albums for grid)
const RECENTLY_PLAYED = ALBUMS.slice(0, 6);

export default function App() {
  const [fontsLoaded] = usePoppinsFonts();

  // Animated values for staggered fade-in
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(20)).current;
  const searchOpacity = useRef(new Animated.Value(0)).current;
  const searchTranslate = useRef(new Animated.Value(20)).current;
  const recentOpacity = useRef(new Animated.Value(0)).current;
  const recentTranslate = useRef(new Animated.Value(30)).current;
  const artistsOpacity = useRef(new Animated.Value(0)).current;
  const artistsTranslate = useRef(new Animated.Value(30)).current;
  const albumsOpacity = useRef(new Animated.Value(0)).current;
  const albumsTranslate = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (fontsLoaded) {
      const stagger = (opacity: Animated.Value, translate: Animated.Value, delay: number) =>
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(translate, {
            toValue: 0,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
        ]);

      Animated.stagger(0, [
        stagger(headerOpacity, headerTranslate, 0),
        stagger(searchOpacity, searchTranslate, 100),
        stagger(recentOpacity, recentTranslate, 200),
        stagger(artistsOpacity, artistsTranslate, 350),
        stagger(albumsOpacity, albumsTranslate, 500),
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={COLORS.gradient.hero as unknown as string[]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradient}
              >
                <Ionicons name="musical-notes" size={20} color={COLORS.white} />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>Vitor</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={COLORS.gradient.hero as unknown as string[]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarRing}
              >
                <Image
                  source={avatar}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          style={{
            opacity: searchOpacity,
            transform: [{ translateY: searchTranslate }],
          }}
        >
          <SearchBar />
        </Animated.View>

        {/* Recently Played Grid */}
        <Animated.View
          style={{
            opacity: recentOpacity,
            transform: [{ translateY: recentTranslate }],
          }}
        >
          <SectionHeader
            title="Tocado Recentemente"
            icon="time"
            accentColor={COLORS.secondary}
          />
          <View style={styles.recentGrid}>
            {RECENTLY_PLAYED.map((item) => (
              <RecentlyPlayedCard
                key={item.id}
                imageUri={item.image}
                title={item.title}
                linkHref={item.link}
              />
            ))}
          </View>
        </Animated.View>

        {/* Artists Section */}
        <Animated.View
          style={{
            opacity: artistsOpacity,
            transform: [{ translateY: artistsTranslate }],
            marginTop: SPACING.l,
          }}
        >
          <SectionHeader
            title="Artistas"
            icon="person"
            accentColor={COLORS.accent}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {ARTISTS.map((artist) => (
              <ArtistCard
                key={artist.id}
                imageUri={artist.image}
                title={artist.title}
                linkHref={artist.link}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Albums Section */}
        <Animated.View
          style={{
            opacity: albumsOpacity,
            transform: [{ translateY: albumsTranslate }],
            marginTop: SPACING.l,
          }}
        >
          <SectionHeader
            title="Álbuns + Ouvidos"
            icon="disc"
            accentColor={COLORS.primary}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {ALBUMS.map((album) => (
              <MediaItem
                key={album.id}
                imageUri={album.image}
                title={album.title}
                sub={album.sub}
                linkHref={album.link}
                variant="album"
              />
            ))}
          </ScrollView>
        </Animated.View>

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.l,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.m,
  },
  logoContainer: {
    ...SHADOWS.md,
  },
  logoGradient: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.m,
  },
  avatarContainer: {
    ...SHADOWS.sm,
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    padding: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    backgroundColor: COLORS.surface,
  },
  recentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.l - SPACING.xs,
  },
  horizontalList: {
    paddingHorizontal: SPACING.l - SPACING.s,
    paddingVertical: SPACING.s,
  },
  footerSpacer: {
    height: 60,
  },
});
