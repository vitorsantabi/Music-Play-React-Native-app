import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/tovelo/dirty.avif");

const tracks = [
  { name: "Elevator Eyes", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/01 - Elevator Eyes.mp3") },
  { name: "I like u", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/02 - I like u.mp3") },
  { name: "Borderline", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/03 - Borderline.mp3") },
  { name: "No One Dies From Love", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/04 - No One Dies From Love.mp3") },
  { name: "Suburbia", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/05 - Suburbia.mp3") },
  { name: "2 Die 4", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/06 - 2 Die 4.mp3") },
  { name: "True Romance", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/07 - True Romance.mp3") },
  { name: "Grapefruit", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/08 - Grapefruit.mp3") },
  { name: "Cute & Cruel", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/09 - Cute & Cruel.mp3") },
  { name: "Call on Me", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/10 - Call on Me.mp3") },
  { name: "Attention Whore", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/11 - Attention Whore.mp3") },
  { name: "Pineapple Slice", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/12 - Pineapple Slice.mp3") },
  { name: "I'm to Blame", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/13 - Im to Blame.mp3") },
  { name: "Kick In The Head", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/14 - Kick In The Head.mp3") },
  { name: "How Long", source: require("@/albuns/tovelo/Tove Lo - Dirt Femme (Extended Cut)/15 - How Long.mp3") },
];

export default function DirtFemmePlayer() {
  return (
    <AlbumPlayer
      albumTitle="Dirt Femme"
      artistName="Tove Lo"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#2DD4BF", "#14B8A6"]}
    />
  );
}
