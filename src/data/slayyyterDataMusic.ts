export interface Song {
  id: string;
  title: string;
  album: string;
  duration: string;
  uri: any;
}

// STARFUCKER
export const starfuckerSongs: Song[] = [
  { id: "sf-1", title: "Starfucker", album: "STARFUCKER", duration: "3:27", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Starfucker.mp3") },
  { id: "sf-2", title: "Dramatic", album: "STARFUCKER", duration: "3:14", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Dramatic.mp3") },
  { id: "sf-3", title: "Erotic Electronic", album: "STARFUCKER", duration: "2:27", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Erotic Electronic.mp3") },
  { id: "sf-4", title: "Girl Like Me", album: "STARFUCKER", duration: "2:49", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Girl Like Me.mp3") },
  { id: "sf-5", title: "I Love Hollywood!", album: "STARFUCKER", duration: "3:07", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - I Love Hollywood!.mp3") },
  { id: "sf-6", title: "James Dean", album: "STARFUCKER", duration: "2:33", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - James Dean.mp3") },
  { id: "sf-7", title: "Makeup", album: "STARFUCKER", duration: "3:13", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Makeup.mp3") },
  { id: "sf-8", title: "Memories Of You", album: "STARFUCKER", duration: "2:55", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Memories Of You.mp3") },
  { id: "sf-9", title: "Miss Belladonna", album: "STARFUCKER", duration: "3:07", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Miss Belladonna.mp3") },
  { id: "sf-10", title: "My Body", album: "STARFUCKER", duration: "3:42", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - My Body.mp3") },
  { id: "sf-11", title: "Out Of Time", album: "STARFUCKER", duration: "3:13", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Out Of Time.mp3") },
  { id: "sf-12", title: "Plastic", album: "STARFUCKER", duration: "2:44", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Plastic.mp3") },
  { id: "sf-13", title: "Purrr", album: "STARFUCKER", duration: "2:16", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Purrr.mp3") },
  { id: "sf-14", title: "Rhinestone Heart", album: "STARFUCKER", duration: "2:34", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Rhinestone Heart.mp3") },
  { id: "sf-15", title: "Tear Me Open", album: "STARFUCKER", duration: "3:39", uri: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Tear Me Open.mp3") },
];

// Troubled Paradise
export const troubledParadiseSongs: Song[] = [
  { id: "tp-1", title: "Self Destruct", album: "Troubled Paradise", duration: "2:19", uri: require("@/albuns/slayyyter/TroubledParadise/01 - Self Destruct.mp3") },
  { id: "tp-2", title: "Venom", album: "Troubled Paradise", duration: "2:28", uri: require("@/albuns/slayyyter/TroubledParadise/02 - Venom.mp3") },
  { id: "tp-3", title: "Throatzillaaa", album: "Troubled Paradise", duration: "3:07", uri: require("@/albuns/slayyyter/TroubledParadise/03 - Throatzillaaa.mp3") },
  { id: "tp-4", title: "Dog House", album: "Troubled Paradise", duration: "2:26", uri: require("@/albuns/slayyyter/TroubledParadise/04 - Dog House.mp3") },
  { id: "tp-5", title: "Butterflies", album: "Troubled Paradise", duration: "1:53", uri: require("@/albuns/slayyyter/TroubledParadise/05 - Butterflies.mp3") },
  { id: "tp-6", title: "Troubled Paradise", album: "Troubled Paradise", duration: "4:01", uri: require("@/albuns/slayyyter/TroubledParadise/06 - Troubled Paradise.mp3") },
  { id: "tp-7", title: "Clouds", album: "Troubled Paradise", duration: "3:12", uri: require("@/albuns/slayyyter/TroubledParadise/07 - Clouds.mp3") },
  { id: "tp-8", title: "Cowboys", album: "Troubled Paradise", duration: "3:39", uri: require("@/albuns/slayyyter/TroubledParadise/08 - Cowboys.mp3") },
  { id: "tp-9", title: "Serial Killer", album: "Troubled Paradise", duration: "3:57", uri: require("@/albuns/slayyyter/TroubledParadise/09 - Serial Killer.mp3") },
  { id: "tp-10", title: "Over This!", album: "Troubled Paradise", duration: "2:59", uri: require("@/albuns/slayyyter/TroubledParadise/10 - Over This!.mp3") },
  { id: "tp-11", title: "Villain", album: "Troubled Paradise", duration: "3:34", uri: require("@/albuns/slayyyter/TroubledParadise/11 - Villain.mp3") },
  { id: "tp-12", title: "Letters", album: "Troubled Paradise", duration: "3:16", uri: require("@/albuns/slayyyter/TroubledParadise/12 - Letters.mp3") },
];

export const allSlayyyterSongs: Song[] = [...starfuckerSongs, ...troubledParadiseSongs];
