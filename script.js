console.log("🎧 Welcome to Spotify Clone");

let songIndex = 0;
let isShuffle = false;
let isLoop = false;
let loopMode = 'none';
let isFavorite = false;
let currMode = 'light';

const audioElement = new Audio('songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const waveform = document.getElementById("waveform");
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));
const loopBtn = document.getElementById('loopBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');
const playbackRate = document.getElementById('playbackRate');
const modeBtn = document.getElementById('toggleBtn');
const favBtn = document.getElementById('favBtn');
const searchBar = document.getElementById('searchBar');
const currentSongImg = document.getElementById("currentSongImg");
    const songs = [
    {
        songName: "Dil Se Dil",
        filePath: "songs/1.mp3",
        coverPath: "https://i.scdn.co/image/ab67616d0000b27307466c8163f8bac45b0801e7"
    },
    {
        songName: "Ek Ladki Ko Dekha to Aisa Lga",
        filePath: "songs/2.mp3",
        coverPath: "https://images.hungama.com/c/1/6e0/a58/271941/271941_300x300.jpg"
    },
    {
        songName: "Intezaari",
        filePath: "songs/3.mp3",
        coverPath: "https://static.toiimg.com/photo/70042475.cms"
    },
    {
        songName: "Ishq Hai",
        filePath: "songs/4.mp3",
        coverPath: "https://i.ytimg.com/vi/SlK-0ha1bTw/maxresdefault.jpg"
    },
    {
        songName: "Jaane Kis Mod Pe",
        filePath: "songs/5.mp3",
        coverPath: "https://timesofindia.indiatimes.com/photo/msid-94300468,imgsize-43280.cms"
    },
    {
        songName: "Kisi Se Tum Pyaar Kro",
        filePath: "songs/6.mp3",
        coverPath: "https://i.ytimg.com/vi/8E-QA7TDHTU/maxresdefault.jpg"
    },
    {
        songName: "Likhe Jo Khat Tujhe",
        filePath: "songs/7.mp3",
        coverPath: "https://i.ytimg.com/vi/0R6FX7mIiF8/maxresdefault.jpg"
    },
    {
        songName: "Mere Mehboob Kayaamat",
        filePath: "songs/8.mp3",
        coverPath: "https://i.ytimg.com/vi/2KGC881fhqw/maxresdefault.jpg"
    },
    {
        songName: "Mere Sapno ki Raani",
        filePath: "songs/9.mp3",
        coverPath: "https://i.ytimg.com/vi/2KGC881fhqw/maxresdefault.jpg"
    },
    {
        songName: "Rab Kare Mujhe Bhi Pyaar ho Jaaye",
        filePath: "songs/10.mp3",
        coverPath: "https://i.ytimg.com/vi/m9ywnTGW4Fw/maxresdefault.jpg"
    },
    {
        songName: "Sarzameen Se",
        filePath: "songs/11.mp3",
        coverPath: "https://images.hungama.com/c/1/6e0/a58/271941/271941_300x300.jpg"
    },
    {
        songName: "Suno Chanda",
        filePath: "songs/12.mp3",
        coverPath: "https://i.ytimg.com/vi/_afvuC0f7Pg/maxresdefault.jpg"
    },
    {
        songName: "Woh Ladki Bahut Yaad Aati h",
        filePath: "songs/13.mp3",
        coverPath: "https://timesofindia.indiatimes.com/photo/msid-94067581,imgsize-104593.cms"
    },
];

// ============== PLAY/PAUSE TOGGLE ==============
function togglePlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;

        makeAllPlays(); // Reset all play icons
        const currentBtn = document.getElementById(songIndex);
        if (currentBtn) toggleIcon(currentBtn, true); 

    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;

        const currentBtn = document.getElementById(songIndex);
        if (currentBtn) toggleIcon(currentBtn, false);
    }
}
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;

        // Update current song icon to pause
        makeAllPlays(); // Reset others
        const currentIcon = document.getElementById(songIndex);
        if (currentIcon) {
            currentIcon.classList.remove("fa-play-circle");
            currentIcon.classList.add("fa-pause-circle");
        }

    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;

        // Update current song icon to play
        const currentIcon = document.getElementById(songIndex);
        if (currentIcon) {
            currentIcon.classList.remove("fa-pause-circle");
            currentIcon.classList.add("fa-play-circle");
        }
    }
});



// ============ PROGRESS BAR CONTROL =============
myProgressBar.addEventListener('click', (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const clickPercent = (e.clientX - left) / width;
    audioElement.currentTime = clickPercent * audioElement.duration;
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    document.getElementById('currentTime').innerText = formatTime(audioElement.currentTime);
    document.getElementById('totalDuration').innerText = formatTime(audioElement.duration);
});

function formatTime(time) {
    if (isNaN(time)) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// ============== SONG ITEM CONTROL ==============
function makeAllPlays() {
    document.querySelectorAll(".songItemPlay").forEach(el => {
        el.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
}

document.querySelectorAll('.songItemPlay').forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            toggleIcon(e.target, false);
        } else {
            playSelectedSong(index);
        }
    });
});

function toggleIcon(element, isPlaying) {
    if (isPlaying) {
        element.classList.replace('fa-play-circle', 'fa-pause-circle');
    } else {
        element.classList.replace('fa-pause-circle', 'fa-play-circle');
    }
}

// =============== NEXT / PREVIOUS ===============
document.getElementById('next').addEventListener('click', () => {
    songIndex = isShuffle ? getRandomSongIndex() : (songIndex + 1) % songs.length;
    playSelectedSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = isShuffle ? getRandomSongIndex() : (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong(songIndex);
});

// ================= SONG PLAYER =================
function playSelectedSong(index) {
    songIndex = index;
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    document.getElementById("currentSongImg").src = songs[index].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();

    gif.style.opacity = 1;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    makeAllPlays();

    const currentBtn = document.getElementById(songIndex);
    if (currentBtn) toggleIcon(currentBtn, true);

   // document.getElementById(songIndex).classList.replace('fa-play-circle', 'fa-pause-circle');
    
}

// ================= LOOP / SHUFFLE ===============
loopBtn.addEventListener('click', () => {
    loopMode = loopMode === 'none' ? 'song' : loopMode === 'song' ? 'playlist' : 'none';
    loopBtn.title = loopMode === 'song' ? 'Loop current song' : loopMode === 'playlist' ? 'Loop playlist' : 'Loop off';
    loopBtn.style.color = loopMode === 'song' ? 'green' : loopMode === 'playlist' ? 'orange' : '';
    loopBtn.innerText = loopMode === 'none' ? '' : loopMode.charAt(0).toUpperCase() + loopMode.slice(1);
});

audioElement.addEventListener('ended', () => {
    if (loopMode === 'song') {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        const nextIndex = loopMode === 'playlist' || isShuffle ? getRandomSongIndex() : (songIndex + 1) % songs.length;
        if (loopMode !== 'none' || songIndex < songs.length - 1) playSelectedSong(nextIndex);
        else {
            masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
            gif.style.opacity = 0;
        }
    }
});

audioElement.addEventListener("play", () => {
    const currentBtn = document.getElementById(songIndex);
    makeAllPlays();
    if (currentBtn) toggleIcon(currentBtn, true); // show pause icon
});


audioElement.addEventListener("pause", () => {
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    gif.style.opacity = 0;

    const currentBtn = document.getElementById(songIndex);
    if (currentBtn) toggleIcon(currentBtn, false); // make sure icon is play
});


document.getElementById('shuffleBtn').addEventListener('click', () => {
    isShuffle = !isShuffle;
    document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
    document.getElementById('shuffleBtn').style.color = isShuffle ? 'green' : '';
});

function getRandomSongIndex() {
    let rand;
    do { rand = Math.floor(Math.random() * songs.length); } while (rand === songIndex);
    return rand;
}

// ================ UI FEATURES ===================
modeBtn.addEventListener("click", () => {
    currMode = currMode === 'light' ? 'dark' : 'light';
    document.body.classList.toggle("dark-mode", currMode === 'dark');
    document.body.classList.toggle("light-mode", currMode === 'light');
    modeBtn.textContent = currMode === 'light' ? ' Dark' : 'Light ';
});

favBtn.addEventListener("click", () => {
    isFavorite = !isFavorite;
    favBtn.classList.toggle("active");
    console.log("Favorite toggled:", isFavorite);
});

volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value;
    if (volumeBar.value == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark fa-2x";
    } else if (volumeBar.value < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low fa-2x";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high fa-2x";
    }
});

playbackRate.addEventListener("change", () => {
    audioElement.playbackRate = parseFloat(playbackRate.value);
    console.log(`Playback speed set to ${playbackRate.value}x`);
});

searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    songItems.forEach((item, index) => {
        const name = songs[index].songName.toLowerCase();
        item.style.display = name.includes(query) ? "flex" : "none";
    });
});

document.addEventListener("keydown", (e) => {
    const active = document.activeElement.tagName;
    if (active === "INPUT" || active === "TEXTAREA") return;
    switch (e.code) {
        case "Space": e.preventDefault(); togglePlayPause(); break;
        case "ArrowRight": document.getElementById("next").click(); break;
        case "ArrowLeft": document.getElementById("previous").click(); break;
        case "ArrowUp": volumeBar.value = Math.min(1, parseFloat(volumeBar.value) + 0.1); audioElement.volume = volumeBar.value; break;
        case "ArrowDown": volumeBar.value = Math.max(0, parseFloat(volumeBar.value) - 0.1); audioElement.volume = volumeBar.value; break;
    }
});

//========== WAVEFORM ANIMATION ===========
function animateWaveform() {
    if (!waveform) return;
    const context = new AudioContext();
    const src = context.createMediaElementSource(audioElement);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    waveform.innerHTML = '';
    for (let i = 0; i < bufferLength; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        waveform.appendChild(bar);
    }

    const bars = waveform.querySelectorAll(".bar");

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        bars.forEach((bar, index) => {
            const height = dataArray[index] / 2;
            bar.style.height = `${height}px`;
        });
    }

    renderFrame();
}

// ========== ALBUM ART TRANSITION ===========
audioElement.addEventListener("play", () => {
    const albumImg = document.getElementById("currentSongImg");
    if (albumImg) albumImg.classList.add("rotate-album");
});

audioElement.addEventListener("pause", () => {
    const albumImg = document.getElementById("currentSongImg");
    if (albumImg) albumImg.classList.remove("rotate-album");
});

audioElement.addEventListener("loadedmetadata", animateWaveform);

// ========== GRID VIEW ===========
function renderSongsGrid() {
    const container = document.getElementById("songsContainer");
    container.innerHTML = songs.map((song, index) => `
        <div class="songItem">
            <img src="${song.coverPath}" alt="cover">
            <div class="songName">${song.songName}</div>
            <i id="${index}" class="far songItemPlay fa-play-circle"></i>
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", renderSongsGrid);

songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        document.getElementById("currentSongImg").src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});

audioElement.addEventListener("ended", () => {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;

    const currentIcon = document.getElementById(songIndex);
    if (currentIcon) {
        currentIcon.classList.remove("fa-pause-circle");
        currentIcon.classList.add("fa-play-circle");
    }
});


