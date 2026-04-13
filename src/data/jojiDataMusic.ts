export interface Song {
  id: string;
  title: string;
  album: string;
  duration: string;
  uri: any;
}

// Nectar
export const nectarSongs: Song[] = [
  { id: "n-1", title: "Sanctuary", album: "Nectar", duration: "3:31", uri: require("@/albuns/joji/nectar/Joji - Sanctuary.mp3") },
  { id: "n-2", title: "Run", album: "Nectar", duration: "3:14", uri: require("@/albuns/joji/nectar/Joji - Run.mp3") },
  { id: "n-3", title: "Gimme Love", album: "Nectar", duration: "3:32", uri: require("@/albuns/joji/nectar/Joji - Gimme Love.mp3") },
  { id: "n-4", title: "Daylight", album: "Nectar", duration: "2:43", uri: require("@/albuns/joji/nectar/Joji - Daylight.mp3") },
  { id: "n-5", title: "Upgrade", album: "Nectar", duration: "1:32", uri: require("@/albuns/joji/nectar/Joji - Upgrade.mp3") },
  { id: "n-6", title: "Tick Tock", album: "Nectar", duration: "2:12", uri: require("@/albuns/joji/nectar/Joji - Tick Tock.mp3") },
  { id: "n-7", title: "MODUS", album: "Nectar", duration: "3:24", uri: require("@/albuns/joji/nectar/Joji - MODUS.mp3") },
  { id: "n-8", title: "Ew", album: "Nectar", duration: "3:25", uri: require("@/albuns/joji/nectar/Joji - Ew.mp3") },
  { id: "n-9", title: "777", album: "Nectar", duration: "3:00", uri: require("@/albuns/joji/nectar/Joji - 777.mp3") },
  { id: "n-10", title: "Reanimator (feat. Yves Tumor)", album: "Nectar", duration: "3:01", uri: require("@/albuns/joji/nectar/Joji - Reanimator (feat. Yves Tumor).mp3") },
  { id: "n-11", title: "Normal People (feat. rei brown)", album: "Nectar", duration: "2:46", uri: require("@/albuns/joji/nectar/Joji - Normal People (feat. rei brown).mp3") },
  { id: "n-12", title: "NITROUS", album: "Nectar", duration: "2:11", uri: require("@/albuns/joji/nectar/Joji - NITROUS.mp3") },
  { id: "n-13", title: "Pretty Boy (feat. Lil Yachty)", album: "Nectar", duration: "2:36", uri: require("@/albuns/joji/nectar/Joji - Pretty Boy (feat. Lil Yachty).mp3") },
  { id: "n-14", title: "High Hopes (feat. Omar Apollo)", album: "Nectar", duration: "3:00", uri: require("@/albuns/joji/nectar/Joji - High Hopes (feat. Omar Apollo).mp3") },
  { id: "n-15", title: "Afterthought", album: "Nectar", duration: "3:13", uri: require("@/albuns/joji/nectar/Joji - Afterthought.mp3") },
  { id: "n-16", title: "Mr. Hollywood", album: "Nectar", duration: "3:19", uri: require("@/albuns/joji/nectar/Joji - Mr. Hollywood.mp3") },
  { id: "n-17", title: "Like You Do", album: "Nectar", duration: "3:56", uri: require("@/albuns/joji/nectar/Joji - Like You Do.mp3") },
  { id: "n-18", title: "Your Man", album: "Nectar", duration: "2:42", uri: require("@/albuns/joji/nectar/Joji - Your Man.mp3") },
];

// SMITHEREENS
export const smithereensSongs: Song[] = [
  { id: "s-1", title: "Glimpse of Us", album: "SMITHEREENS", duration: "3:54", uri: require("@/albuns/joji/SMITHEREENS/Joji - Glimpse of Us.mp3") },
  { id: "s-2", title: "Feeling Like The End", album: "SMITHEREENS", duration: "1:50", uri: require("@/albuns/joji/SMITHEREENS/Joji - Feeling Like The End.mp3") },
  { id: "s-3", title: "Die For You", album: "SMITHEREENS", duration: "3:35", uri: require("@/albuns/joji/SMITHEREENS/Joji - Die For You.mp3") },
  { id: "s-4", title: "Before The Day Is Over", album: "SMITHEREENS", duration: "3:37", uri: require("@/albuns/joji/SMITHEREENS/Joji - Before The Day Is Over.mp3") },
  { id: "s-5", title: "Dissolve", album: "SMITHEREENS", duration: "3:03", uri: require("@/albuns/joji/SMITHEREENS/Joji - Dissolve.mp3") },
  { id: "s-6", title: "NIGHT RIDER", album: "SMITHEREENS", duration: "2:15", uri: require("@/albuns/joji/SMITHEREENS/Joji - NIGHT RIDER.mp3") },
  { id: "s-7", title: "BLAHBLAHBLAH DEMO", album: "SMITHEREENS", duration: "2:29", uri: require("@/albuns/joji/SMITHEREENS/Joji - BLAHBLAHBLAH DEMO.mp3") },
  { id: "s-8", title: "YUKON (INTERLUDE)", album: "SMITHEREENS", duration: "2:27", uri: require("@/albuns/joji/SMITHEREENS/Joji - YUKON (INTERLUDE).mp3") },
  { id: "s-9", title: "1AM FREESTYLE", album: "SMITHEREENS", duration: "2:01", uri: require("@/albuns/joji/SMITHEREENS/Joji - 1AM FREESTYLE.mp3") },
];

export const allJojiSongs: Song[] = [...nectarSongs, ...smithereensSongs];
