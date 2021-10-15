// ---------- Variable Part ---------//

const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video-container video");
const sounds = document.querySelectorAll(".sound-picker button");

const displayTime= document.querySelector(".time-displayer");
const lengthOutlined = outline.getTotalLength();
console.log(lengthOutlined);

const selectTime = document.querySelectorAll(".time-selector button");
let assumedDuration = 600;

// ---------- Functionality Part ----------//

// Outline to the circle with respect to time taken

outline.style.strokeDashoffset = lengthOutlined;
outline.style.strokeDasharray = lengthOutlined;

selectTime.forEach(option=>{
	option.addEventListener("click", function(){
	assumedDuration = this.getAttribute("data-time");
	displayTime.textContent = `${Math.floor(assumedDuration / 60)}: ${Math.floor(assumedDuration % 60)}`;
	});
});


// Sounds buzzing from off the player

const playingChecker = song =>{
	if(song.paused){
		song.play();
		video.play();
		play.src = "./svg/pause.svg";
	}else{
		song.pause();
		video.pause();
		play.src="./svg/play.svg";
		}
	};

const restartSong = song=>{
	let timeRightNow = song.currentTime;
	song.currentTime = 0;
}


	sounds.forEach(sound=>{
		sound.addEventListener("click",function(){
			song.src = this.getAttribute("data-sound");
			video.src = this.getAttribute("data-video");
			playingChecker(song);
		});
	});

	play.addEventListener("click",function(){
		playingChecker(song);
	});

	replay.addEventListener("click",function(){
		restartSong(song);
	});


	song.ontimeupdate = () => {
		let timeRightNow = song.currentTime;
		let timeElapsed = assumedDuration - timeRightNow;
		let seconds = Math.floor(timeElapsed % 60);
		let minutes = Math.floor(timeElapsed / 60);
		displayTime.textContent = `${minutes}:${seconds}`;
		let progressCircle = lengthOutlined - (timeRightNow / assumedDuration) * lengthOutlined;
		outline.style.strokeDashoffset = progressCircle;

		

		if( timeRightNow >= assumedDuration){
			song.pause();
			song.currentTime = 0;
			play.src = "./svg/play.svg";
			video.pause();
		}
	};