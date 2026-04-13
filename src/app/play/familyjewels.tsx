import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/marina/Malbumum.jpg");

const tracks = [
  { name: "Are You Satisfied?", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-01 Are You Satisfied_.m4a") },
  { name: "Shampain", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-02 Shampain.m4a") },
  { name: "I Am Not a Robot", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-03 I Am Not a Robot.m4a") },
  { name: "Girls", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-04 Girls.m4a") },
  { name: "Mowgli's Road", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-05 Mowglis Road.m4a") },
  { name: "Obsessions", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-06 Obsessions.m4a") },
  { name: "Hollywood", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-07 Hollywood (Single Version).m4a") },
  { name: "The Outsider", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-08 The Outsider.m4a") },
  { name: "Guilty", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-09 Guilty.m4a") },
  { name: "Hermit the Frog", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-10 Hermit the Frog.m4a") },
  { name: "Oh No!", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-11 Oh No!.m4a") },
  { name: "Seventeen", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-12 Seventeen.m4a") },
  { name: "Numb", source: require("@/albuns/marina/thefamilyjewels/Marina - The Family Jewels - 01-13 Numb.m4a") },
];

export default function FamilyJewelsPlayer() {
  return (
    <AlbumPlayer
      albumTitle="The Family Jewels"
      artistName="Marina"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#8B5CF6", "#6D3BD2"]}
    />
  );
}
