import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/tovelo/sunshinekitty.avif");

const tracks = [
  { name: "Gritty Pretty (Intro)", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/01 - Gritty Pretty (Intro).mp3") },
  { name: "Glad He's Gone", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/02 - Glad He's Gone.mp3") },
  { name: "Bad as the Boys", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/03 - Bad as the Boys.mp3") },
  { name: "Sweettalk my Heart", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/04 - Sweettalk my Heart.mp3") },
  { name: "Stay Over", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/05 - Stay Over.mp3") },
  { name: "Are U gonna tell her?", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/06 - Are U gonna tell her_.mp3") },
  { name: "Jacques", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/07 - Jacques.mp3") },
  { name: "Mateo", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/08 - Mateo.mp3") },
  { name: "Come Undone", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/09 - Come Undone.mp3") },
  { name: "Equally Lost", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/10 - Equally Lost.mp3") },
  { name: "Really don't like u", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/11 - Really dont like u.mp3") },
  { name: "Shifted", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/12 - Shifted.mp3") },
  { name: "Mistaken", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/13 - Mistaken.mp3") },
  { name: "Anywhere u go", source: require("@/albuns/tovelo/Tove Lo - Sunshine Kitty/14 - Anywhere u go.mp3") },
];

export default function SunshineKittyPlayer() {
  return (
    <AlbumPlayer
      albumTitle="Sunshine Kitty"
      artistName="Tove Lo"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#14B8A6", "#0D9488"]}
    />
  );
}
