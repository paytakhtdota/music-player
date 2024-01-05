const range = document.querySelector("input#music-time");
const playBtn = document.querySelector("i#play-btn");
const nextBtn = document.querySelector("i#next-btn");
const preBtn = document.querySelector("i#pre-btn");
const backBtn = document.querySelector("i#back-btn");
const forwardBtn = document.querySelector("i#forward-btn");
const cover = document.querySelector("img#music-cover");
const title = document.querySelector("h1#music-name");

let musics = [
    {
        name: "Lose Your Self",
        cover: "./assets/loseYourSelf.jpg",
        audio: new Audio("./assets/loseYourSelf.mp3")
    },
    {
        name: "I ain Worried",
        cover: "./assets/IAinTWorried.jpg",
        audio: new Audio("./assets/IAinTWorried.mp3")
    },
    {
        name: "Vacation",
        cover: "./assets/DirtyHeadsVacation.jpg",
        audio: new Audio("./assets/DirtyHeadsVacation.mp3")
    },
];

let currentMusic = 0;
let audio = musics[currentMusic].audio;
cover.src = musics[currentMusic].cover;
title.innerText = musics[currentMusic].name;

audio.addEventListener("canplay", () => {
    range.max = audio.duration;
})

audio.addEventListener("timeupdate", (e) => {
    range.value = audio.currentTime;
})

range.addEventListener("input", (e) => {
    audio.currentTime = range.value;
})

playBtn.addEventListener("click", (e) => {
    if (audio.paused) {
        audio.play();
        cover.style.animationPlayState = "running";
        playBtn.classList.replace("fa-play", "fa-pause")
    } else {
        audio.pause();
        cover.style.animationPlayState = "paused";
        playBtn.classList.replace("fa-pause", "fa-play")
    }
})

forwardBtn.addEventListener("click", () => {
    changeMusic("next");
   
})

backBtn.addEventListener("click", () => {
    changeMusic("pre");
    
})


function changeMusic(state) {
    audio.pause();
    range.value = 0;
    playBtn.classList.replace("fa-pause", "fa-play")
    cover.style.animationPlayState = "paused";
    audio.currentTime = 0;
    if (state == "next") {
        if (currentMusic + 1 == musics.length) currentMusic = 0; else currentMusic += 1;
    } else { 
        if (currentMusic == 0) currentMusic = musics.length-1; else currentMusic -= 1;

    }

audio = musics[currentMusic].audio;
cover.src = musics[currentMusic].cover;
title.innerText = musics[currentMusic].name;

audio.addEventListener("timeupdate", (e) => {
    range.value = audio.currentTime;
})
audio.play();
}









