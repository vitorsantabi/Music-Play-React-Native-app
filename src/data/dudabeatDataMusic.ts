export interface Song {
  id: string;
  title: string;
  album: string;
  duration: string;
  uri: any;
}

// Sinto Muito
export const sintoMuitoSongs: Song[] = [
  { id: "sm-1", title: "Anicca (Intro)", album: "Sinto Muito", duration: "1:39", uri: require("@/albuns/dudabeat/sintomuito/01 Anicca (Intro).mp3") },
  { id: "sm-2", title: "Bedi Beat", album: "Sinto Muito", duration: "3:16", uri: require("@/albuns/dudabeat/sintomuito/02 Bedi Beat.mp3") },
  { id: "sm-3", title: "Bixinho", album: "Sinto Muito", duration: "3:20", uri: require("@/albuns/dudabeat/sintomuito/03 Bixinho.mp3") },
  { id: "sm-4", title: "Pro Mundo Ouvir", album: "Sinto Muito", duration: "3:58", uri: require("@/albuns/dudabeat/sintomuito/04 Pro Mundo Ouvir.mp3") },
  { id: "sm-5", title: "Parece Pouco", album: "Sinto Muito", duration: "2:02", uri: require("@/albuns/dudabeat/sintomuito/05 Parece Pouco.mp3") },
  { id: "sm-6", title: "Back to Bad", album: "Sinto Muito", duration: "3:38", uri: require("@/albuns/dudabeat/sintomuito/06 Back to Bad.mp3") },
  { id: "sm-7", title: "Derretendo", album: "Sinto Muito", duration: "3:34", uri: require("@/albuns/dudabeat/sintomuito/07 Derretendo.mp3") },
  { id: "sm-8", title: "Ninguém Dança", album: "Sinto Muito", duration: "3:37", uri: require("@/albuns/dudabeat/sintomuito/08 Ninguem Danca.mp3") },
  { id: "sm-9", title: "Egoísta", album: "Sinto Muito", duration: "3:33", uri: require("@/albuns/dudabeat/sintomuito/09 Egoista.mp3") },
  { id: "sm-10", title: "Bolo de Rolo", album: "Sinto Muito", duration: "3:39", uri: require("@/albuns/dudabeat/sintomuito/10 Bolo de Rolo.mp3") },
  { id: "sm-11", title: "Todo Carinho", album: "Sinto Muito", duration: "4:02", uri: require("@/albuns/dudabeat/sintomuito/11 Todo Carinho.mp3") },
];

// Esse Delírio vol.1
export const esseDelirioSongs: Song[] = [
  { id: "ed-1", title: "Você Vai Gostar", album: "Esse Delírio vol.1", duration: "2:46", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-01 você vai gostar.m4a") },
  { id: "ed-2", title: "Nossa Chance", album: "Esse Delírio vol.1", duration: "3:00", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-02 Nossa Chance.m4a") },
  { id: "ed-3", title: "Fuga", album: "Esse Delírio vol.1", duration: "3:19", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-03 fuga.m4a") },
  { id: "ed-4", title: "Pessoa Errada", album: "Esse Delírio vol.1", duration: "2:49", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-04 Pessoa Errada.m4a") },
  { id: "ed-5", title: "Foi Mal", album: "Esse Delírio vol.1", duration: "2:40", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-05 Foimal.m4a") },
  { id: "ed-6", title: "Casa", album: "Esse Delírio vol.1", duration: "2:35", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-06 Casa.m4a") },
  { id: "ed-7", title: "Casa (Demo)", album: "Esse Delírio vol.1", duration: "3:15", uri: require("@/albuns/dudabeat/essedelíriovol.1/DUDA BEAT - esse delírio vol.1 - 01-07 Casa (demo).m4a") },
];

export const allDudaBeatSongs: Song[] = [...sintoMuitoSongs, ...esseDelirioSongs];
