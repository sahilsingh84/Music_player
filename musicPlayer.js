const audio1='ZindaBanda.mp3';
const audio1Album='https://static-koimoi.akamaized.net/wp-content/new-galleries/2023/08/srk-lip-synced-first-time-in-three-languages-for-jawan-song-001.jpg';
const audio2='Zindagi.mp3';
const audio2Album='https://i.ytimg.com/vi/bqP-CVhtQfc/maxresdefault.jpg';
const audio3='Galliyan.mp3';
const audio3Album='http://i.ytimg.com/vi/9FXm9R2VTBg/maxresdefault.jpg';
const audio4='RamSiyaRam.mp3';
const audio4Album='https://c.saavncdn.com/916/Ram-Siya-Ram-From-Adipurush-Hindi-2023-20230530192919-500x500.jpg';
const audio5='RaatanLambiyan.mp3';
const audio5Album='https://www.musicallyamit.in/wp-content/uploads/2021/10/artworks-emD83LTbzNrgWCIh-cOXJVw-t500x500.jpg';
const audio6='keshariya.mp3';
const audio6Album='https://i.scdn.co/image/ab67616d0000b27377e9e66708843398caa9f2b5';
var songAlbum=document.querySelector('#albumImage');
var songName=document.querySelector('.uppertext');
var artistName=document.querySelector('p');
var audioFile=document.querySelector('#audioFile');
var prevButton=document.querySelector('.prev');
var playButton=document.querySelector('#ctrl');
var nextButton=document.querySelector('.next');
var progress=document.querySelector('#length');
var volumeButton=document.querySelector(".volume");
var volumeBar=document.querySelector("#setVolume");
var songList=document.querySelector(".songList");
var songs=document.querySelectorAll("span");
var listButton=document.querySelector(".right");
var back=document.querySelector(".back");
const songsArray=[
    {
       song:audio1,
       album:audio1Album,
       naam:"Zinda Banda",
       artist:"Shahrukh Khan"
    },
    {
        song:audio2,
        album:audio2Album,
        naam:"Zindagi Kuch Toh Bata",
        artist:"Salman Khan"
     },
     {
        song:audio3,
        album:audio3Album,
        naam:"Galliyan",
        artist:"Sidharth Malhotra"
     },
     {
        song:audio4,
        album:audio4Album,
        naam:"Ram Siya Ram",
        artist:"Prabhas"
     },
     {
        song:audio5,
        album:audio5Album,
        naam:"Raatan Lambiyan",
        artist:"Sidharth Malhotra"
     },
     {
        song:audio6,
        album:audio6Album,
        naam:"Kesariya",
        artist:"Ranbeer Kapoor"
     }
]
audioFile.volume=0.7;
audioFile.onloadedmetadata = function(){
    progress.max=audioFile.duration;
    progress.value=audioFile.currentTime;
}
progress.addEventListener('input', function() {
    const newTime = progress.value;
    audioFile.currentTime = newTime;
   
});
if(audioFile.play()){
   setInterval(()=>{
       progress.value=audioFile.currentTime; 
   },500);
}
audioFile.addEventListener('timeupdate', function () {
    progress.value = audioFile.currentTime;
    if (audioFile.currentTime >= audioFile.duration) {
        nextSong();
    }
});

let currentIndex=0;
function startPage(){
   
    songAlbum.src=songsArray[currentIndex].album;
    songName.innerText=songsArray[currentIndex].naam;
    artistName.innerText=songsArray[currentIndex].artist;
    audioFile.src = songsArray[currentIndex].song;
    prevButton.classList.add('preButton');  
    // audioFile.play();  
}
startPage();

playButton.addEventListener("click",()=>{
    audioFile.pause();
    if(playButton.classList.contains('fa-play')){
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        audioFile.play();
    }
    else if(playButton.classList.contains('fa-pause')){
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        audioFile.pause();
    }
    
})


nextButton.addEventListener("click",nextSong);
function prevSong(){
    if(currentIndex===0){
        prevButton.classList.remove('preButton');

    }
    else if(currentIndex!=0){
    currentIndex-=1;
    songAlbum.src=songsArray[currentIndex].album;
    songName.innerText=songsArray[currentIndex].naam;
    artistName.innerText=songsArray[currentIndex].artist;
    audioFile.src = songsArray[currentIndex].song;
    audioFile.play();
    }
}

function nextSong(){
    prevButton.classList.remove('preButton');
    if(currentIndex===songsArray.length-1){
        currentIndex=0;
        startPage();
    }
    else if(currentIndex<songsArray.length){
        currentIndex+=1;
        songAlbum.src=songsArray[currentIndex].album;
        songName.innerText=songsArray[currentIndex].naam;
        artistName.innerText=songsArray[currentIndex].artist;
        audioFile.src = songsArray[currentIndex].song;
        audioFile.play();
    }

    if(currentIndex!=0){
        prevButton.addEventListener("click",prevSong)
    }
}
prevButton.addEventListener("click",prevSong);
volumeBar.style.display="none";
volumeBar.addEventListener("input",()=>{
    var currentVolume=volumeBar.value;
    audioFile.volume=currentVolume;
})
function songVolume(){
    console.log(volumeBar.value);
    console.log(audioFile.volume);
    audioFile.volume=volumeBar.value;
}
function setVolume(){
    volumeBar.style.display="block"; 
    setTimeout(()=>{
        volumeBar.style.display="none";
    },10000);
    songVolume();
}
volumeButton.addEventListener("click",setVolume);

songList.style.display="none";
function songToPlay(){
        listButton.style.display="none";    

        songAlbum.src=songsArray[songIndex].album;
        songName.innerText=songsArray[songIndex].naam;
        artistName.innerText=songsArray[songIndex].artist;
        audioFile.src = songsArray[songIndex].song;
        audioFile.play();

}

function whichSongPlay(e){
    var songToPlay=e.target.innerText;
    console.log(songToPlay);
    for(let i=0;i<songsArray.length;i++){
        if(songToPlay==songsArray[i].naam){
            var songIndex=i;
        }
    }
       songList.style.display="none";    

        songAlbum.src=songsArray[songIndex].album;
        songName.innerText=songsArray[songIndex].naam;
        artistName.innerText=songsArray[songIndex].artist;
        audioFile.src = songsArray[songIndex].song;
        prevButton.classList.remove('preButton'); 
        audioFile.play();
        currentIndex=songIndex;

}

function listOfSongs(){
    songList.style.display="block";
    songs.forEach(songName=>{
        songName.addEventListener("click",whichSongPlay);
    })
}
listButton.addEventListener("click",listOfSongs);
back.addEventListener("click",()=>{
    songList.style.display="none";
})
if(audioFile.play()){

}