
console.log("Welcome to Spotify!")

//initialize The variable
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Dil Se Dil",filePath:"songs/1.mp3",coverPath:"https://timesofindia.indiatimes.com/photo/msid-94237811,imgsize-52700.cms"},
    {songName:"Ek Ladki Ko Dekha to Aisa Lga",filePath:"songs/2.mp3",coverPath:"https://10to5.in/wp-content/uploads/2020/04/ek-ladki-ko-696x398.jpg"},
    {songName:"Intezaari",filePath:"songs/3.mp3",coverPath:"https://static.toiimg.com/photo/70042475.cms"},
    {songName:"Ishq Hai",filePath:"songs/4.mp3",coverPath:"https://i.ytimg.com/vi/SlK-0ha1bTw/maxresdefault.jpg"},
    {songName:"Jaane Kis Mod Pe",filePath:"songs/5.mp3",coverPath:"https://timesofindia.indiatimes.com/photo/msid-94300468,imgsize-43280.cms"},
    {songName:"Kisi Se Tum Pyaar Kro",filePath:"songs/6.mp3",coverPath:"https://i.ytimg.com/vi/8E-QA7TDHTU/maxresdefault.jpg"},
    {songName:"Likhe Jo Khat Tujhe",filePath:"songs/7.mp3",coverPath:"https://i.ytimg.com/vi/0R6FX7mIiF8/maxresdefault.jpg"},
    {songName:"Mere Mehboob Kayaamat",filePath:"songs/8.mp3",coverPath:"https://i.ytimg.com/vi/2KGC881fhqw/maxresdefault.jpg"},
    {songName:"Mere Sapno ki Raani",filePath:"songs/9.mp3",coverPath:"https://i.ytimg.com/vi/9PdSmDRGIwM/maxresdefault.jpg"},
    {songName:"Rab Kare Mujhe Bhi Pyaar ho Jaaye",filePath:"songs/10.mp3",coverPath:"https://i.ytimg.com/vi/m9ywnTGW4Fw/maxresdefault.jpg"},
    {songName:"Sarzameen Se",filePath:"songs/11.mp3",coverPath:"https://10to5.in/wp-content/uploads/2020/04/ek-ladki-ko-696x398.jpg"},
    {songName:"Suno Chanda",filePath:"songs/12.mp3",coverPath:"https://i.ytimg.com/vi/_afvuC0f7Pg/maxresdefault.jpg"},
    {songName:"Woh Ladki Bahut Yaad Aati h",filePath:"songs/13.mp3",coverPath:"https://timesofindia.indiatimes.com/photo/msid-94067581,imgsize-104593.cms"}, 
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


//Handle play/pause click
masterPlay.addEventListener('click',()=>{
     if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

     }
     else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
     }

})


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

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

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=songs.length-1){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
     document.getElementById(songIndex).classList.remove('fa-play-circle');
     document.getElementById(songIndex).classList.add('fa-pause-circle');

    audioElement.volume = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

    audioElement.volume = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});

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

// Toggle Shuffle
document.getElementById('shuffleBtn').addEventListener('click', () => {
    isShuffle = !isShuffle;
    document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
});

// Toggle Loop
document.getElementById('loopBtn').addEventListener('click', () => {
    isLoop = !isLoop;
    document.getElementById('loopBtn').classList.toggle('active', isLoop);
});

// Handle song end
audioElement.addEventListener('ended', () => {
    if (isLoop) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
        playSelectedSong(songIndex);
    } else {
        document.getElementById('next').click();
    }
});

// Function to play selected song
function playSelectedSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}


audioElement.addEventListener("error", (e) => {
    console.error("Audio load error: ", e);
    alert("Gaana load nahi ho raha. Check karo file sahi path pe hai ya nahi.");
});





