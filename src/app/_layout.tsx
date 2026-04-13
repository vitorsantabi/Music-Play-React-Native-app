import { COLORS } from "@/constants/theme";
import { AudioProvider } from "@/contexts/AudioContext";
import MiniPlayer from "@/components/ui/MiniPlayer";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <AudioProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.background },
            animation: "slide_from_right",
          }}
        />
        <MiniPlayer />
      </View>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
