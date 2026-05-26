let songs=[
    {
        title:"Ranakumbha",
        artist:"Sai Abhyankar",
        image:"./images/ssmb29.jpg",
        audio:"./songs/Rana_Kumbha.mp3"
    },
    {
        title:"Sahana Sahana",
        artist:"Sai Abhyankar",
        image:"./images/rajsab.jpg",
        audio:"./songs/Sahana_Sahana.mp3"
    },
    {
        title:"boom Boom",
        artist:"Sai Abhyankar",
        image:"./images/dude.jpg",
        audio:"./songs/Boom_Boom_(Anthuleni_Premani).mp3"
    }
];
let simage=document.getElementById("image");
let saudio=document.getElementById("music");
let stitle=document.getElementById("title");
let sartist=document.getElementById("artist");
let stoggle=document.getElementById("toggle");
let snext=document.getElementById("next");
let sprevious=document.getElementById("previous");
let sprogress=document.getElementById("progress");
let scurrentTime=document.getElementById("currentTime");
let stotalTime=document.getElementById("totalTime");
let ct,t,p;
function LoadSong(i){
    simage.src=songs[i].image;
    saudio.src=songs[i].audio;
    stitle.innerHTML=songs[i].title;
    sartist.innerHTML=songs[i].artist;
}

let isplay=false;
stoggle.addEventListener("click",()=>{
    if(isplay==false){
        isplay=true;
        stoggle.innerHTML="⏸";
        saudio.play();
        simage.style.animationPlayState="running";
    }else{
        isplay=false;
        stoggle.innerHTML="▶";
        saudio.pause();
          simage.style.animationPlayState="paused";
    }
})
currentSong=0;
LoadSong(currentSong);
snext.addEventListener("click",()=>{
   nextsong();
    
})
   
function nextsong(){
      if(currentSong<songs.length-1){
    currentSong++;
    LoadSong(currentSong);
        saudio.play();
         isplay=true;
        stoggle.innerHTML="⏸";
    }else{
        currentSong=0
        LoadSong(currentSong);
        saudio.play();
         isplay=true;
         stoggle.innerHTML="⏸";
    }
}
sprevious.addEventListener("click",()=>{
    prevsong();
})
function prevsong(){
    if(currentSong>0){
    currentSong--;
    LoadSong(currentSong);
    saudio.play();
    isplay=true;
    stoggle.innerHTML="⏸";
    
    }else{
        currentSong=songs.length-1;
        LoadSong(currentSong);
        saudio.play();
        isplay=true;
         stoggle.innerHTML="⏸";
    }

}
setInterval(function(){          
        if(isplay==true){
        ct=saudio.currentTime;
        t=saudio.duration;
        p=(ct/t)*100;
        sprogress.value=p;
         scurrentTime.innerHTML=formatTime(saudio.currentTime);
    }
    
},100)
saudio.addEventListener("ended",()=>{
            p=0;
            nextsong();
})
let min,sec;
function formatTime(num){
    min=Math.floor(num/60);
    sec=Math.floor(num%60);
    if(min < 10){
        min="0" + min;
    }
    if(sec<10){
        sec="0"+sec
    }
    return min+":"+sec;
}
saudio.addEventListener("loadedmetadata" , ()=>{
    stotalTime.innerHTML=formatTime(saudio.duration);
    scurrentTime.innerHTML=formatTime(saudio.currentTime);
    
});
sprogress.addEventListener("input",()=>{
    ct=(sprogress.value/saudio.duration)*100;
    scurrentTime.innerHTML=formatTime(ct);
    saudio.currentTime=ct;
})
let allSongs=document.querySelectorAll(".songs");
for(let i=0;i<allSongs.length;i++){
allSongs[i].addEventListener("click" , ()=>{
    LoadSong(i);
    saudio.play();
})
}
