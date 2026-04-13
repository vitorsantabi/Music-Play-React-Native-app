import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/dudabeat/essedelerio.avif");

const tracks = [
  { name: "Você Vai Gostar", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-01 você vai gostar.m4a") },
  { name: "Nossa Chance", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-02 Nossa Chance.m4a") },
  { name: "Fuga", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-03 fuga.m4a") },
  { name: "Pessoa Errada", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-04 Pessoa Errada.m4a") },
  { name: "Foi Mal", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-05 Foimal.m4a") },
  { name: "Casa", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-06 Casa.m4a") },
  { name: "Casa (Demo)", source: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-07 Casa (demo).m4a") },
];

export default function EsseDelirioPlayer() {
  return (
    <AlbumPlayer
      albumTitle="Esse Delírio vol.1"
      artistName="Duda Beat"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#F472B6", "#EC4899"]}
    />
  );
}
