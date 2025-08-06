console.log("Welcome to Spotify!")

//initialize variable
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName('songItem'));
let loopBtn = document.getElementById('loopBtn');



    let songs = [
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

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

       // document.getElementById('currentSongImg').src = songs[songIndex].coverPath;

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


myProgressBar.addEventListener('click', (e) => {
    let progressBar = e.target;
    let rect = progressBar.getBoundingClientRect();
    let clickX = e.clientX - rect.left; // click position from left
    let width = rect.width;
    let clickPercent = clickX / width;

    // Update time
    audioElement.currentTime = clickPercent * audioElement.duration;
});
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
       
})
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
   element.addEventListener('click',(e)=>{
        let clickedIndex = parseInt(e.target.id);

        if(songIndex === clickedIndex && !audioElement.paused){
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
        else{
            makeAllPlays();
            songIndex = clickedIndex;
           
        
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;

            const currentSongImg = document.getElementById("currentSongImg");
            currentSongImg.src = songs[songIndex].coverPath;

            audioElement.currentTime = 0;
            audioElement.play();
            audioElement.volume = 1;  // Full volume set karo manually

            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            
        }
           
   })
});

//next
    document.getElementById('next').addEventListener('click', () => {
        if (isShuffle) {
            songIndex = getRandomSongIndex();
        } else {
            songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
        }
        playSelectedSong(songIndex);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.addEventListener('loadedmetadata', () => {
        myProgressBar.value = 0; 
        document.getElementById('totalDuration').innerText = formatTime(audioElement.duration);
    });
    audioElement.play();
    makeAllPlays();
     document.getElementById(songIndex).classList.remove('fa-play-circle');
     document.getElementById(songIndex).classList.add('fa-pause-circle');

    audioElement.volume = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//previous 
    document.getElementById('previous').addEventListener('click', () => {
        if (isShuffle) {
            songIndex = getRandomSongIndex();
        } else {
            songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
        }    
        playSelectedSong(songIndex);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.addEventListener('loadedmetadata', () => {
        myProgressBar.value = 0; // Reset progress bar properly
        document.getElementById('totalDuration').innerText = formatTime(audioElement.duration);
    });
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

    audioElement.volume = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

//time format 
function formatTime(time) {
    if (isNaN(time)) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
   return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

}
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    let current = formatTime(audioElement.currentTime);
    let total = formatTime(audioElement.duration);
    document.getElementById('currentTime').innerText = current;
document.getElementById('totalDuration').innerText = total;

});

let isShuffle = false;
let isLoop = false;

//loop song
let loopMode = 'none'; 

document.getElementById('loopBtn').addEventListener('click', () => {
    if (loopMode === 'none') {
        loopMode = 'song';
        loopBtn.title = 'Loop current song';
        loopBtn.style.color = 'green';
        loopBtn.innerText = '    Song'; // Or use classes/icons if using FontAwesome
    } else if (loopMode === 'song') {
        loopMode = 'playlist';
        loopBtn.title = 'Loop playlist';
        loopBtn.style.color = 'orange';
        loopBtn.innerText = '    Playlist';
    } else {
        loopMode = 'none';
        loopBtn.title = 'Loop off';
        loopBtn.style.color = '';
        loopBtn.innerText = '';
    }
});

//handle loop 
audioElement.addEventListener('ended', () => {
    if (loopMode === 'song') {
        audioElement.currentTime = 0;
        audioElement.play();
    } else if (loopMode === 'playlist' || isShuffle) {
        if (isShuffle) {
            songIndex = getRandomSongIndex();
        } else {
            songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
        }
        playSelectedSong(songIndex);
    } else {
        if (songIndex < songs.length - 1) {
            songIndex += 1;
            playSelectedSong(songIndex);
        } else {
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    }
});

// Shuffle functionality
document.getElementById('shuffleBtn').addEventListener('click', () => {
    isShuffle = !isShuffle;
    document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
    document.getElementById('shuffleBtn').style.color = isShuffle ? 'green' : '';
});

function getRandomSongIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === songIndex); 
    return randomIndex;
}

// Function to play selected song
function playSelectedSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    const currentSongImg = document.getElementById("currentSongImg");
    currentSongImg.src = songs[songIndex].coverPath;
   // document.getElementById('currentSongImg').src = songs[songIndex].coverPath;
    console.log(songs[index].coverPath);

    gif.style.opacity = 1;

    audioElement.currentTime = 0;
    audioElement.addEventListener('loadedmetadata', () => {
        myProgressBar.value = 0; 
        document.getElementById('totalDuration').innerText = formatTime(audioElement.duration);
    });
    
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

   
}

let modeBtn = document.querySelector("#toggleBtn");  // ✅ "#" lagana bhool gaya tha
let currMode = "light";

modeBtn.addEventListener("click", () => {
    if (currMode === "light") {
        currMode = "dark";
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        modeBtn.textContent = "Light ";
    } else {
        currMode = "light";
        document.body.style.backgroundColor = "#dfa271";
        document.body.style.color = "black";
        modeBtn.textContent = " Dark";
    }
    console.log(currMode);
});

const favBtn = document.getElementById("favBtn");
let isFavorite = false;

favBtn.addEventListener("click", () => {
    isFavorite = !isFavorite;
    favBtn.classList.toggle("active");
    // You can store the liked song using songIndex or songName if needed
    console.log("Favorite toggled:", isFavorite);
});

const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");

volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value;

    // Update volume icon based on level
    if (volumeBar.value == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark fa-2x";
    } else if (volumeBar.value < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low fa-2x";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high fa-2x";
    }
});

const playbackRate = document.getElementById("playbackRate");

playbackRate.addEventListener("change", () => {
  audioElement.playbackRate = parseFloat(playbackRate.value);
  console.log(`Playback speed set to ${playbackRate.value}x`);
});

document.getElementById("searchBar").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    songItems.forEach((item, index) => {
        const songName = songs[index].songName.toLowerCase();
        item.style.display = songName.includes(query) ? "flex" : "none";
    });
});

document.addEventListener("keydown", function (e) {
    const activeElement = document.activeElement;

    // Block all shortcuts when typing in search bar or any input/textarea
    if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
        return;
    }

    switch (e.code) {
        case "Space":
            e.preventDefault();
            masterPlay.click(); // toggle play/pause
            break;

        case "ArrowRight":
            document.getElementById("next").click();
            break;

        case "ArrowLeft":
            document.getElementById("previous").click();
            break;

        case "ArrowUp":
            volumeBar.value = Math.min(1, parseFloat(volumeBar.value) + 0.1);
            audioElement.volume = volumeBar.value;
            break;

        case "ArrowDown":
            volumeBar.value = Math.max(0, parseFloat(volumeBar.value) - 0.1);
            audioElement.volume = volumeBar.value;
            break;

          break;
    }
});







