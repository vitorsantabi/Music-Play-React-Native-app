import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/joji/nectar.png");

const tracks = [
  { name: "Sanctuary", source: require("@/albuns/joji/nectar/Joji - Sanctuary.mp3") },
  { name: "Run", source: require("@/albuns/joji/nectar/Joji - Run.mp3") },
  { name: "Gimme Love", source: require("@/albuns/joji/nectar/Joji - Gimme Love.mp3") },
  { name: "Daylight", source: require("@/albuns/joji/nectar/Joji - Daylight.mp3") },
  { name: "Upgrade", source: require("@/albuns/joji/nectar/Joji - Upgrade.mp3") },
  { name: "Tick Tock", source: require("@/albuns/joji/nectar/Joji - Tick Tock.mp3") },
  { name: "MODUS", source: require("@/albuns/joji/nectar/Joji - MODUS.mp3") },
  { name: "Ew", source: require("@/albuns/joji/nectar/Joji - Ew.mp3") },
  { name: "777", source: require("@/albuns/joji/nectar/Joji - 777.mp3") },
  { name: "Reanimator (feat. Yves Tumor)", source: require("@/albuns/joji/nectar/Joji - Reanimator (feat. Yves Tumor).mp3") },
  { name: "Normal People (feat. rei brown)", source: require("@/albuns/joji/nectar/Joji - Normal People (feat. rei brown).mp3") },
  { name: "NITROUS", source: require("@/albuns/joji/nectar/Joji - NITROUS.mp3") },
  { name: "Pretty Boy (feat. Lil Yachty)", source: require("@/albuns/joji/nectar/Joji - Pretty Boy (feat. Lil Yachty).mp3") },
  { name: "High Hopes (feat. Omar Apollo)", source: require("@/albuns/joji/nectar/Joji - High Hopes (feat. Omar Apollo).mp3") },
  { name: "Afterthought", source: require("@/albuns/joji/nectar/Joji - Afterthought.mp3") },
  { name: "Mr. Hollywood", source: require("@/albuns/joji/nectar/Joji - Mr. Hollywood.mp3") },
  { name: "Like You Do", source: require("@/albuns/joji/nectar/Joji - Like You Do.mp3") },
  { name: "Your Man", source: require("@/albuns/joji/nectar/Joji - Your Man.mp3") },
];

export default function NectarPlayer() {
  return (
    <AlbumPlayer
      albumTitle="Nectar"
      artistName="Joji"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#6366F1", "#4F46E5"]}
    />
  );
}
