import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/slayyyyter/trouble.avif");

const tracks = [
  { name: "Self Destruct", source: require("@/albuns/slayyyter/TroubledParadise/01 - Self Destruct.mp3") },
  { name: "Venom", source: require("@/albuns/slayyyter/TroubledParadise/02 - Venom.mp3") },
  { name: "Throatzillaaa", source: require("@/albuns/slayyyter/TroubledParadise/03 - Throatzillaaa.mp3") },
  { name: "Dog House", source: require("@/albuns/slayyyter/TroubledParadise/04 - Dog House.mp3") },
  { name: "Butterflies", source: require("@/albuns/slayyyter/TroubledParadise/05 - Butterflies.mp3") },
  { name: "Troubled Paradise", source: require("@/albuns/slayyyter/TroubledParadise/06 - Troubled Paradise.mp3") },
  { name: "Clouds", source: require("@/albuns/slayyyter/TroubledParadise/07 - Clouds.mp3") },
  { name: "Cowboys", source: require("@/albuns/slayyyter/TroubledParadise/08 - Cowboys.mp3") },
  { name: "Serial Killer", source: require("@/albuns/slayyyter/TroubledParadise/09 - Serial Killer.mp3") },
  { name: "Over This!", source: require("@/albuns/slayyyter/TroubledParadise/10 - Over This!.mp3") },
  { name: "Villain", source: require("@/albuns/slayyyter/TroubledParadise/11 - Villain.mp3") },
  { name: "Letters", source: require("@/albuns/slayyyter/TroubledParadise/12 - Letters.mp3") },
];

export default function TroubledParadisePlayer() {
  return (
    <AlbumPlayer
      albumTitle="Troubled Paradise"
      artistName="Slayyyter"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#F472B6", "#EC4899"]}
    />
  );
}
