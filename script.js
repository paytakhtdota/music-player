// Select elements from the HTML document
const backBtn = document.querySelector("button#back-btn");
const preBtn = document.querySelector("button#pre-btn");
const playBtn = document.querySelector("button#play-btn");
const nexrBtn = document.querySelector("button#next-btn");
const forwardBtn = document.querySelector("button#forward-btn");
const cover = document.querySelector("img#cover");
const range = document.querySelector("input#range");
const title = document.querySelector("h1#title");
const animaton = document.querySelector("div.border");
const timer = document.querySelector("div#timer");
// Variables for track and current music
let track;
let currentMusic = 0;

// Array of music objects
let musics = [
    {
        name: "Bloody Tears", coverArt: "./assets/Bloody-Tears-Quincas-Moreira.png",
        audio: new Audio("./assets/Bloody-Tears-Quincas-Moreira.mp3")
    },
    {
        name: "Emergency On Level3", coverArt: "./assets/Emergency-On-Level3-Jeremy-Korpas.png",
        audio: new Audio("./assets/Emergency-On-Level3-Jeremy-Korpas.mp3")
    },
    {
        name: "Enough Neffex", coverArt: "./assets/Enough-NEFFEX.jpg",
        audio: new Audio("./assets/Enough-NEFFEX.mp3")
    },
    {
        name: "Gril on Top", coverArt: "./assets/GirlOnTop-AmyLynn-theHoneymen.png",
        audio: new Audio("./assets/GirlOnTop-AmyLynn-theHoneymen.mp3")
    },
    {
        name: "Pentagram", coverArt: "./assets/Pentagram-Audionautix.png",
        audio: new Audio("./assets/Pentagram-Audionautix.mp3")
    },
]
// Function to set the current music
function currentMusicF(trackNumber) {
    track = musics[trackNumber].audio;
    cover.src = musics[trackNumber].coverArt;
    title.innerText = musics[trackNumber].name;
}// Set initial music
currentMusicF(currentMusic);
// Event listener for when the track is ready to play
track.addEventListener("canplay", () => {
    range.max = track.duration; // Set range slider's maximum value
    timer.innerText = `00:00 / ${formatTime(parseInt(track.duration))}`;
})
// Function to update the timer as the track plays
const timeUpDater = function () {
    track.addEventListener("timeupdate", (e) => {
        range.value = track.currentTime;// Update range slider
        timer.innerText = formatTime(parseInt(track.currentTime)) + " / " + formatTime(parseInt(track.duration));                                                                                                                                                                                                         
    })
}
timeUpDater();// Call the timeUpDater function

// Event listener for when the range slider is changed
range.addEventListener("input", (e) => {
    track.currentTime = range.value;
})
// Event listener for the play/pause button
playBtn.addEventListener("click", (e) => {
    if (track.paused) {
        animaton.style.animationPlayState = "running";
        cover.style.animationPlayState = "running";
        document.querySelector("button#play-btn i").classList.replace("fa-play", "fa-pause");
        track.play();
    } else {
        animaton.style.animationPlayState = "paused";
        cover.style.animationPlayState = "paused";
        document.querySelector("button#play-btn i.fa-solid").classList.replace("fa-pause", "fa-play");
        track.pause();
    }
})

// Event listeners for forward/back buttons
forwardBtn.addEventListener("click", () => {
    changeMusic("next");
})
backBtn.addEventListener("click", () => {
    changeMusic("pre");
})

// Event listeners for next/previous buttons (15-second skips)
nexrBtn.addEventListener("click", () => {
    if (track.currentTime + 16 <= track.duration) track.currentTime += 15;
})
preBtn.addEventListener("click", () => {
    if (track.currentTime - 16 >= 0) track.currentTime -= 15;
    else track.currentTime = 0;
})

// Function to change the music
function changeMusic(state) {
    track.pause(); // Pause the current track
    range.value = 0;// Reset the range slider
    track.currentTime = 0;// Reset the track's current time
    document.querySelector("button#play-btn i.fa-solid").classList.replace("fa-pause", "fa-play")
    animaton.style.animationPlayState = "paused";
    cover.style.animationPlayState = "paused";
    //Increment currentMusic by 1, then take the remainder with musics.length.
    //If remainder is 0, set currentMusic to 0.
    //Otherwise, set currentMusic to remainder.
    if (state == "next") {
        currentMusic = (currentMusic + 1) % musics.length;
    } else if (state == "pre") {
        currentMusic = (currentMusic - 1 + musics.length) % musics.length;
    }
    currentMusicF(currentMusic);
    timeUpDater();
}

/* It's the first function I made for convert secends to minutes but I replace it with "formatTime()"
function convertor(secends) {
    if (secends > 59) {
        let mins = secends / 60;
        let secs = secends % 60;
        mins = padStart(parseInt(mins));
        secs = padStart(parseInt(secs));
        return [mins, secs];
    }
    else { return [0, padStart(secends)] }
} 

// For converting 1 digit number to 2 digit numbers 1 => 01 or 0 => 00
function padStart(num) { 
    return num.toString().padStart(2, "0");
}
*/


function formatTime(seconds) { // A function to convert seconds to minutes - and return "mins:secs" format >>  00:00
    const minutes = Math.floor(seconds / 60);
    const second = padStart(seconds % 60, 2);
    return `${padStart(minutes, 2)}:${second}`;
  }






