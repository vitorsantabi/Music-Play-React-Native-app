import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/joji/Smithereens.png");

const tracks = [
  { name: "Glimpse of Us", source: require("@/albuns/joji/SMITHEREENS/Joji - Glimpse of Us.mp3") },
  { name: "Feeling Like The End", source: require("@/albuns/joji/SMITHEREENS/Joji - Feeling Like The End.mp3") },
  { name: "Die For You", source: require("@/albuns/joji/SMITHEREENS/Joji - Die For You.mp3") },
  { name: "Before The Day Is Over", source: require("@/albuns/joji/SMITHEREENS/Joji - Before The Day Is Over.mp3") },
  { name: "Dissolve", source: require("@/albuns/joji/SMITHEREENS/Joji - Dissolve.mp3") },
  { name: "NIGHT RIDER", source: require("@/albuns/joji/SMITHEREENS/Joji - NIGHT RIDER.mp3") },
  { name: "BLAHBLAHBLAH DEMO", source: require("@/albuns/joji/SMITHEREENS/Joji - BLAHBLAHBLAH DEMO.mp3") },
  { name: "YUKON (INTERLUDE)", source: require("@/albuns/joji/SMITHEREENS/Joji - YUKON (INTERLUDE).mp3") },
  { name: "1AM FREESTYLE", source: require("@/albuns/joji/SMITHEREENS/Joji - 1AM FREESTYLE.mp3") },
];

export default function SmithereensPlayer() {
  return (
    <AlbumPlayer
      albumTitle="SMITHEREENS"
      artistName="Joji"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#818CF8", "#6366F1"]}
    />
  );
}
