import { Audio } from "expo-av";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface Track {
  name: string;
  source: any;
}

export interface AudioState {
  /** Currently loaded track list */
  tracks: Track[];
  /** Index of the active track */
  trackIndex: number;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Duration in seconds */
  duration: number | null;
  /** Current position in seconds */
  position: number;
  /** Album metadata */
  albumTitle: string;
  artistName: string;
  albumCover: any;
  accentColors: readonly [string, string];
  albumLink: string;
  /** Modes */
  isRepeat: boolean;
  isShuffle: boolean;
}

export interface AudioContextValue extends AudioState {
  /** Load an album and start playback from a given track index */
  loadAlbum: (params: {
    tracks: Track[];
    trackIndex?: number;
    albumTitle: string;
    artistName: string;
    albumCover: any;
    accentColors?: readonly [string, string];
    albumLink?: string;
  }) => void;
  /** Play / pause toggle */
  playPause: () => Promise<void>;
  /** Skip to next track */
  nextTrack: () => void;
  /** Go to previous track */
  previousTrack: () => void;
  /** Jump to a specific track by index */
  selectTrack: (index: number) => void;
  /** Seek to a position (0-1) */
  seekTo: (percentage: number) => Promise<void>;
  /** Toggle shuffle */
  toggleShuffle: () => void;
  /** Toggle repeat */
  toggleRepeat: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}

const DEFAULT_ACCENT: readonly [string, string] = ["#8B5CF6", "#EC4899"];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState<any>(null);
  const [accentColors, setAccentColors] = useState<readonly [string, string]>(DEFAULT_ACCENT);
  const [albumLink, setAlbumLink] = useState("");
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // Keep latest values in refs for use inside callbacks
  const tracksRef = useRef(tracks);
  tracksRef.current = tracks;
  const trackIndexRef = useRef(trackIndex);
  trackIndexRef.current = trackIndex;
  const isRepeatRef = useRef(isRepeat);
  isRepeatRef.current = isRepeat;
  const isShuffleRef = useRef(isShuffle);
  isShuffleRef.current = isShuffle;

  // Configure audio mode once
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  const loadIdRef = useRef(0);

  // Internal: load and play a sound for a given index
  const loadSound = useCallback(async (index: number, trackList?: Track[]) => {
    const list = trackList || tracksRef.current;
    if (!list.length || index < 0 || index >= list.length) return;

    const currentLoadId = ++loadIdRef.current;

    try {
      // Synchronously detach the previous sound to prevent other calls from referencing it
      const oldSound = soundRef.current;
      soundRef.current = null;

      // Unload previous
      if (oldSound) {
        try { await oldSound.unloadAsync(); } catch {}
      }

      // Abort if superseded during unload
      if (currentLoadId !== loadIdRef.current) return;

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        list[index].source
      );

      // Abort and discard if superseded during loading
      if (currentLoadId !== loadIdRef.current) {
        try { await newSound.unloadAsync(); } catch {}
        return;
      }

      soundRef.current = newSound;
      setIsPlaying(true);
      await newSound.playAsync();

      if (status.isLoaded) {
        setDuration(status.durationMillis ? status.durationMillis / 1000 : null);
      }

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis ? status.durationMillis / 1000 : null);
          setPosition(status.positionMillis / 1000);
          setIsPlaying(status.isPlaying);
          if (status.didJustFinish) {
            if (isRepeatRef.current) {
              newSound.replayAsync();
            } else {
              let next: number;
              if (isShuffleRef.current) {
                next = Math.floor(Math.random() * tracksRef.current.length);
              } else {
                next = (trackIndexRef.current + 1) % tracksRef.current.length;
              }
              setTrackIndex(next);
              trackIndexRef.current = next;
              loadSound(next);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  }, []);

  // Explicit loadSound is used for all transitions now.

  // Public API

  const loadAlbum = useCallback(
    (params: {
      tracks: Track[];
      trackIndex?: number;
      albumTitle: string;
      artistName: string;
      albumCover: any;
      accentColors?: readonly [string, string];
      albumLink?: string;
    }) => {
      const idx = params.trackIndex ?? 0;
      setTracks(params.tracks);
      tracksRef.current = params.tracks;
      setTrackIndex(idx);
      trackIndexRef.current = idx;
      setAlbumTitle(params.albumTitle);
      setArtistName(params.artistName);
      setAlbumCover(params.albumCover);
      setAccentColors(params.accentColors ?? DEFAULT_ACCENT);
      setAlbumLink(params.albumLink ?? "");
      setPosition(0);
      setDuration(null);
      // Load immediately with the new track list
      loadSound(idx, params.tracks);
    },
    [loadSound]
  );

  const playPause = useCallback(async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    if (!tracksRef.current.length) return;
    let next: number;
    if (isShuffleRef.current) {
      next = Math.floor(Math.random() * tracksRef.current.length);
    } else {
      next = (trackIndexRef.current + 1) % tracksRef.current.length;
    }
    setTrackIndex(next);
    trackIndexRef.current = next;
    loadSound(next);
  }, [loadSound]);

  const previousTrack = useCallback(() => {
    if (!tracksRef.current.length) return;
    const next = (trackIndexRef.current - 1 + tracksRef.current.length) % tracksRef.current.length;
    setTrackIndex(next);
    trackIndexRef.current = next;
    loadSound(next);
  }, [loadSound]);

  const selectTrack = useCallback((index: number) => {
    setTrackIndex(index);
    trackIndexRef.current = index;
    loadSound(index);
  }, [loadSound]);

  const seekTo = useCallback(async (percentage: number) => {
    if (soundRef.current && duration) {
      await soundRef.current.setPositionAsync(percentage * duration * 1000);
    }
  }, [duration]);

  const toggleShuffle = useCallback(() => setIsShuffle((p) => !p), []);
  const toggleRepeat = useCallback(() => setIsRepeat((p) => !p), []);

  const value: AudioContextValue = {
    tracks,
    trackIndex,
    isPlaying,
    duration,
    position,
    albumTitle,
    artistName,
    albumCover,
    accentColors,
    albumLink,
    isRepeat,
    isShuffle,
    loadAlbum,
    playPause,
    nextTrack,
    previousTrack,
    selectTrack,
    seekTo,
    toggleShuffle,
    toggleRepeat,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
};
