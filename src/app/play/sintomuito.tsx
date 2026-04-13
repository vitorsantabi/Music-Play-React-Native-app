import AlbumPlayer from "@/components/ui/AlbumPlayer";
import React from "react";

const albumCover = require("@/images/dudabeat/sinto.avif");

const tracks = [
  { name: "Anicca (Intro)", source: require("@/albuns/dudabeat/sintomuito/01 Anicca (Intro).mp3") },
  { name: "Bedi Beat", source: require("@/albuns/dudabeat/sintomuito/02 Bedi Beat.mp3") },
  { name: "Bixinho", source: require("@/albuns/dudabeat/sintomuito/03 Bixinho.mp3") },
  { name: "Pro Mundo Ouvir", source: require("@/albuns/dudabeat/sintomuito/04 Pro Mundo Ouvir.mp3") },
  { name: "Parece Pouco", source: require("@/albuns/dudabeat/sintomuito/05 Parece Pouco.mp3") },
  { name: "Back to Bad", source: require("@/albuns/dudabeat/sintomuito/06 Back to Bad.mp3") },
  { name: "Derretendo", source: require("@/albuns/dudabeat/sintomuito/07 Derretendo.mp3") },
  { name: "Ninguém Dança", source: require("@/albuns/dudabeat/sintomuito/08 Ninguem Danca.mp3") },
  { name: "Egoísta", source: require("@/albuns/dudabeat/sintomuito/09 Egoista.mp3") },
  { name: "Bolo de Rolo", source: require("@/albuns/dudabeat/sintomuito/10 Bolo de Rolo.mp3") },
  { name: "Todo Carinho", source: require("@/albuns/dudabeat/sintomuito/11 Todo Carinho.mp3") },
];

export default function SintoMuitoPlayer() {
  return (
    <AlbumPlayer
      albumTitle="Sinto Muito"
      artistName="Duda Beat"
      albumCover={albumCover}
      tracks={tracks}
      accentColors={["#EC4899", "#DB2777"]}
    />
  );
}
