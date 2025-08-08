const songs = [
  {
    name: "song1",
    title: "Dreams",
    artist: "Bensound",
    cover: "images/cover1.jpg"
  },
  {
    name: "song2",
    title: "Going Higher",
    artist: "Bensound",
    cover: "images/cover1.jpg"
  }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistList = document.getElementById("playlist-list");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { duration: dur, currentTime: ct } = audio;
  if (dur) {
    progress.value = (ct / dur) * 100;
    currentTime.textContent = formatTime(ct);
    duration.textContent = formatTime(dur);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length; // autoplay next
  loadSong(songs[index]);
  playSong();
});

function formatTime(t) {
  const minutes = Math.floor(t / 60);
  const seconds = Math.floor(t % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Create playlist
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} – ${song.artist}`;
  li.addEventListener("click", () => {
    index = i;
    loadSong(songs[index]);
    playSong();
  });
  playlistList.appendChild(li);
});

loadSong(songs[index]);
