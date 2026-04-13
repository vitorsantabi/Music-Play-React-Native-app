export const COLORS = {
  background: "#0A0A0F",
  surface: "#16161F",
  surfaceLight: "#1E1E2A",
  surfaceElevated: "#252535",
  primary: "#8B5CF6",
  primaryDark: "#6D3BD2",
  secondary: "#14B8A6",
  accent: "#EC4899",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  error: "#EF4444",
  success: "#22C55E",
  white: "#FFFFFF",
  black: "#000000",
  blurTint: "dark" as const,

  gradient: {
    primary: ["#8B5CF6", "#6D3BD2"] as const,
    secondary: ["#14B8A6", "#0D9488"] as const,
    accent: ["#EC4899", "#DB2777"] as const,
    hero: ["#8B5CF6", "#EC4899"] as const,
    dark: ["rgba(10,10,15,0)", "rgba(10,10,15,0.8)", "rgba(10,10,15,1)"] as const,
    card: ["rgba(30,30,42,0.9)", "rgba(22,22,31,0.95)"] as const,
    glass: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"] as const,
  },
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  xs: 6,
  s: 8,
  m: 16,
  l: 24,
  xl: 50,
  round: 9999,
};

export const FONTS = {
  thin: "Poppins_100Thin",
  light: "Poppins_300Light",
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
  extraBold: "Poppins_800ExtraBold",
  black: "Poppins_900Black",
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  }),
};

export const ANIMATION = {
  fast: 200,
  normal: 350,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  springBouncy: {
    damping: 10,
    stiffness: 180,
    mass: 0.8,
  },
};
