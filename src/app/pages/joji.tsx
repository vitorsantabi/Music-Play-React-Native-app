import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePoppinsFonts } from "@/components/fonts/PoppinsFonts";
import MediaItem from "@/components/ui/MediaItem";
import { BORDER_RADIUS, COLORS, FONTS, SPACING, SHADOWS } from "@/constants/theme";
import { allJojiSongs, Song } from "@/data/jojiDataMusic";

const bgImage = require("@/images/bgJoji.jpg");
const nectar = require("@/images/joji/nectar.png");
const smithereens = require("@/images/joji/Smithereens.png");

const Joji = () => {
  const [fontsLoaded] = usePoppinsFonts();
  const router = useRouter();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.95)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(heroOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(heroScale, { toValue: 1, useNativeDriver: true, damping: 18, stiffness: 120 }),
      ]).start();
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
        Animated.timing(contentTranslate, { toValue: 0, duration: 500, delay: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [fontsLoaded]);

  useEffect(() => { return () => { if (sound) sound.unloadAsync(); }; }, [sound]);

  const playSong = async (song: Song) => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(song.uri);
      setSound(newSound); await newSound.playAsync(); setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => { if (status.isLoaded && status.didJustFinish) { setIsPlaying(false); handleNext(); } });
    } catch (error) { console.error("Error playing sound", error); }
  };

  useEffect(() => { if (currentSong) playSong(currentSong); }, [currentSong]);

  const handleShufflePlay = () => { setCurrentSong(allJojiSongs[Math.floor(Math.random() * allJojiSongs.length)]); };
  const handleNext = () => { if (!currentSong) return; const i = allJojiSongs.findIndex(s => s.id === currentSong.id); setCurrentSong(allJojiSongs[(i + 1) % allJojiSongs.length]); };
  const handlePrevious = () => { if (!currentSong) return; const i = allJojiSongs.findIndex(s => s.id === currentSong.id); setCurrentSong(allJojiSongs[(i - 1 + allJojiSongs.length) % allJojiSongs.length]); };
  const handlePlayPause = async () => { if (!sound) return; if (isPlaying) { await sound.pauseAsync(); setIsPlaying(false); } else { await sound.playAsync(); setIsPlaying(true); } };

  const getAlbumImage = (albumName: string) => {
    switch (albumName) { case "Nectar": return nectar; case "SMITHEREENS": return smithereens; default: return bgImage; }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground source={bgImage} style={styles.background} imageStyle={styles.backgroundImage}>
        <BlurView intensity={85} tint="dark" style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color={COLORS.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Ionicons name="heart-outline" size={24} color={COLORS.white} /></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={[styles.scrollContent, currentSong && { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
            <Animated.View style={[styles.featuredContainer, { opacity: heroOpacity, transform: [{ scale: heroScale }] }]}>
              <View style={styles.featuredCard}>
                <ImageBackground source={bgImage} style={styles.featuredBackground} imageStyle={{ borderRadius: BORDER_RADIUS.l }}>
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.featuredOverlay} />
                  <View style={styles.featuredContent}>
                    <View style={styles.tagContainer}><Ionicons name="musical-note" size={12} color={COLORS.white} /><Text style={styles.tagText}>Artist Spotlight</Text></View>
                    <Text style={styles.artistName}>Joji</Text>
                    <Text style={styles.artistRole}>Cantor / Produtor</Text>
                    <TouchableOpacity style={styles.playButton} onPress={handleShufflePlay}>
                      <LinearGradient colors={["#6366F1", "#4F46E5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.playButtonGradient}>
                        <Ionicons name="shuffle" size={20} color={COLORS.white} /><Text style={styles.playButtonText}>Shuffle Play</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </Animated.View>

            <Animated.View style={[styles.section, { opacity: contentOpacity, transform: [{ translateY: contentTranslate }] }]}>
              <Text style={styles.sectionTitle}>Sobre</Text>
              <View style={styles.bioContainer}>
                <Text style={styles.bioText}>Joji, nome artístico de George Kusunoki Miller, é um cantor, compositor e produtor japonês-australiano. Conhecido por suas baladas lo-fi e R&B melancólico, Joji cria paisagens sonoras introspectivas que exploram temas de solidão, amor e vulnerabilidade.</Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.section, { opacity: contentOpacity, transform: [{ translateY: contentTranslate }] }]}>
              <Text style={styles.sectionTitle}>Álbuns Populares</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.albumsList}>
                <MediaItem imageUri={nectar} title="Nectar" sub="2020 • Álbum" linkHref="/play/nectar" variant="album" />
                <MediaItem imageUri={smithereens} title="Smithereens" sub="2022 • Álbum" linkHref="/play/smithereens" variant="album" />
              </ScrollView>
            </Animated.View>
          </ScrollView>

          {currentSong && (
            <BlurView intensity={90} tint="dark" style={styles.miniPlayer}>
              <View style={styles.miniPlayerContent}>
                <Image source={getAlbumImage(currentSong.album)} style={styles.miniPlayerImage} contentFit="cover" />
                <View style={styles.miniPlayerInfo}><Text style={styles.miniPlayerTitle} numberOfLines={1}>{currentSong.title}</Text><Text style={styles.miniPlayerArtist}>{currentSong.album}</Text></View>
                <View style={styles.miniPlayerControls}>
                  <TouchableOpacity onPress={handlePrevious}><Ionicons name="play-skip-back" size={22} color={COLORS.white} /></TouchableOpacity>
                  <TouchableOpacity style={styles.miniPlayButton} onPress={handlePlayPause}><Ionicons name={isPlaying ? "pause" : "play"} size={22} color={COLORS.black} /></TouchableOpacity>
                  <TouchableOpacity onPress={handleNext}><Ionicons name="play-skip-forward" size={22} color={COLORS.white} /></TouchableOpacity>
                </View>
              </View>
              <LinearGradient colors={["#6366F1", "#4F46E5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: isPlaying ? "100%" : "0%" }]} />
            </BlurView>
          )}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  background: { flex: 1, width: "100%", height: "100%" },
  backgroundImage: { resizeMode: "cover" },
  safeArea: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: SPACING.m, paddingVertical: SPACING.s },
  iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.1)", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  scrollContent: { paddingBottom: 40 },
  featuredContainer: { paddingHorizontal: SPACING.m, marginTop: SPACING.s, marginBottom: SPACING.l },
  featuredCard: { height: 320, borderRadius: BORDER_RADIUS.l, overflow: "hidden", ...SHADOWS.lg },
  featuredBackground: { flex: 1, justifyContent: "flex-end" },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: BORDER_RADIUS.l },
  featuredContent: { padding: SPACING.l },
  tagContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: SPACING.s + 2, paddingVertical: 5, borderRadius: BORDER_RADIUS.s, alignSelf: "flex-start", marginBottom: SPACING.s, gap: 6 },
  tagText: { color: COLORS.white, fontFamily: FONTS.medium, fontSize: 11, letterSpacing: 0.5 },
  artistName: { fontFamily: FONTS.bold, fontSize: 34, color: COLORS.white, marginBottom: 2 },
  artistRole: { fontFamily: FONTS.medium, fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: SPACING.m },
  playButton: { borderRadius: BORDER_RADIUS.xl, overflow: "hidden", ...SHADOWS.md },
  playButtonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 13, gap: 8 },
  playButtonText: { fontFamily: FONTS.bold, color: COLORS.white, fontSize: 15 },
  section: { marginBottom: SPACING.l, paddingHorizontal: SPACING.m },
  sectionTitle: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.white, marginBottom: SPACING.s },
  bioContainer: { padding: SPACING.m, borderRadius: BORDER_RADIUS.m, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  bioText: { fontFamily: FONTS.regular, fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 22 },
  albumsList: { paddingRight: SPACING.m },
  miniPlayer: { position: "absolute", bottom: 0, left: 0, right: 0, height: 80, borderTopLeftRadius: BORDER_RADIUS.l, borderTopRightRadius: BORDER_RADIUS.l, overflow: "hidden", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.08)" },
  miniPlayerContent: { flexDirection: "row", alignItems: "center", padding: SPACING.m, height: "100%" },
  miniPlayerImage: { width: 48, height: 48, borderRadius: BORDER_RADIUS.s, marginRight: SPACING.m },
  miniPlayerInfo: { flex: 1, justifyContent: "center" },
  miniPlayerTitle: { color: COLORS.white, fontFamily: FONTS.semiBold, fontSize: 14, marginBottom: 2 },
  miniPlayerArtist: { color: COLORS.textSecondary, fontFamily: FONTS.regular, fontSize: 12 },
  miniPlayerControls: { flexDirection: "row", alignItems: "center", gap: SPACING.m },
  miniPlayButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" },
  progressFill: { position: "absolute", bottom: 0, left: 0, height: 2 },
});

export default Joji;