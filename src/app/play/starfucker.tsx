import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/slayyyyter/slayyyteralbum.avif");

const tracks = [
  { name: "Starfucker", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Starfucker.mp3") },
  { name: "Dramatic", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Dramatic.mp3") },
  { name: "Erotic Electronic", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Erotic Electronic.mp3") },
  { name: "Girl Like Me", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Girl Like Me.mp3") },
  { name: "I Love Hollywood!", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - I Love Hollywood!.mp3") },
  { name: "James Dean", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - James Dean.mp3") },
  { name: "Makeup", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Makeup.mp3") },
  { name: "Memories Of You", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Memories Of You.mp3") },
  { name: "Miss Belladonna", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Miss Belladonna.mp3") },
  { name: "My Body", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - My Body.mp3") },
  { name: "Out Of Time", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Out Of Time.mp3") },
  { name: "Plastic", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Plastic.mp3") },
  { name: "Purrr", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Purrr.mp3") },
  { name: "Rhinestone Heart", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Rhinestone Heart.mp3") },
  { name: "Tear Me Open", source: require("@/albuns/slayyyter/STARFUCKER/Slayyyter - Tear Me Open.mp3") },
];

export default function StarfuckerPlayer() {
  return (
    <AlbumPlayer
      albumTitle="STARFUCKER"
      artistName="Slayyyter"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#EC4899", "#DB2777"]}
    />
  );
}
