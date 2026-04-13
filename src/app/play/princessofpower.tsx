import AlbumPlayer from "@/components/ui/AlbumPlayer";
import { COLORS } from "@/constants/theme";
import React from "react";

const albumCover = require("@/albuns/marina/princessofpower/PrincessofPower.png");

const tracks = [
  { name: "PRINCESS OF POWER", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-01 PRINCESS OF POWER.mp3") },
  { name: "BUTTERFLY", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-02 BUTTERFLY.mp3") },
  { name: "CUNTISSIMO", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-03 CUNTISSIMO.mp3") },
  { name: "ROLLERCOASTER", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-04 ROLLERCOASTER.mp3") },
  { name: "CUPID'S GIRL", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-05 CUPIDS GIRL.mp3") },
  { name: "METALLIC STALLION", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-06 METALLIC STALLION.mp3") },
  { name: "JE NE SAIS QUOI", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-07 JE NE SAIS QUOI.mp3") },
  { name: "DIGITAL FANTASY", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-08 DIGITAL FANTASY.mp3") },
  { name: "EVERYBODY KNOWS I'M SAD", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-09 EVERYBODY KNOWS IM SAD.mp3") },
  { name: "HELLO KITTY", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-10 HELLO KITTY.mp3") },
  { name: "ADULT GIRL", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-12 ADULT GIRL.mp3") },
  { name: "FINAL BOSS", source: require("@/albuns/marina/princessofpower/Marina - PRINCESS OF POWER (DELUXE) - 01-13 FINAL BOSS.mp3") },
];

export default function PrincessPlayer() {
  return (
    <AlbumPlayer
      albumTitle="Princess of Power"
      artistName="Marina"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={COLORS.gradient.hero}
    />
  );
}
