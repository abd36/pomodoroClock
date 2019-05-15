const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const footer = document.getElementById('footerDiv');
const workI = document.getElementById('workInput');
const breakI = document.getElementById('breakInput');
const back = document.getElementById('back');
const reset = document.getElementById('reset');
const forward = document.getElementById('forward');
const stop = document.getElementById('stop');
const playPause = document.getElementById('play');
const sound = document.getElementById('sound');

let minInt = workI.value;
let secInt = 0;
let workState = true;
let startState = true;
resetCountdown();

playPause.onclick = countdown;
stop.onclick = stopCountdown;
back.onclick = function() { minInt++; displayTime(); };
forward.onclick = fastForward;
reset.onclick = resetCountdown;
breakI.onsubmit = submit;
window.addEventListener('keydown', keyPress);

let timer = function() {
	checkEndOfTimer();
	if (secInt <= 0) { secInt = 60; minInt--; };
	secInt--;
	displayTime();
}

function fastForward() {
	minInt--;
	checkEndOfTimer();
	displayTime();
}

function keyPress(e) {
  if (e.keyCode == 13) { submit(); }
  if (e.keyCode == 82) { resetCountdown(); }
  if (e.keyCode == 66) { minInt++; displayTime(); }
  if (e.keyCode == 83) { stopCountdown(); }
  if (e.keyCode == 80) { countdown(); }
  if (e.keyCode == 70) { fastForward() }
}

function submit() {
	stopCountdown();
	countdown();
	workI.blur();
	breakI.blur();
}

function inputChange() {
	if (startState) { minInt = workI.value; displayTime(); }
}

function checkEndOfTimer() {
	if ((secInt <= 0 && minInt <= 0) || minInt < 0) {
		sound.play();
		if (workState) {
			workState = false;
			workI.style.borderColor = '#303236';
			breakI.style.borderColor = '#787d87';
			minInt = breakI.value;
			secInt = 0;
		} else {
			workState = true;
			breakI.style.borderColor = '#303236';
			workI.style.borderColor = '#787d87';
			minInt = workI.value;
			secInt = 0;
		}
		countdown();
	}
}

function changeToPlayClass() {
	if (playPause.classList.contains('fa-pause')) {
		playPause.classList.toggle('fa-play');
		playPause.classList.toggle('fa-pause');
	}
}

function resetState() {
	changeToPlayClass();
	pauseCountdown();
	breakI.style.borderColor = '#303236';
	workI.style.borderColor = '#787d87';
	workState = true;
	startState = true;
}

function resetCountdown() {
	resetState();
	workI.value = 25;
	breakI.value = 5;
	minInt = workI.value;
	secInt = 0;
	displayTime();
}

function stopCountdown() {
	resetState();
	minInt = workI.value;
	secInt = 0;
	displayTime();
}

function countdown() {
	playPause.classList.contains('fa-play') ? resumeCountdown() : pauseCountdown()
	playPause.classList.toggle('fa-play');
	playPause.classList.toggle('fa-pause');
}

function resumeCountdown() {
	setInterval(timer, 1000)
	startState = false;
}

function pauseCountdown() {
	var highestTimeoutId = setTimeout(';');
	for (var i = 0 ; i < highestTimeoutId ; i++) {
	    clearTimeout(i);
	}
}

//creates footer text/links
for (let i = 0; i < 23; i++) {
  let name = document.createElement('a');
  name.href = 'https://github.com/abd36/';
  name.target = '_blank';
  name.classList.add('footerText');
  name.textContent = '@abd36'
  footer.appendChild(name);
}


function displayTime() {
	mins.textContent = pad(minInt);
	secs.textContent = pad(secInt);
}

function pad(int) {
	if (typeof(int) == 'string') {
		if (int.charAt(0) == '0' && int.length == 2) { return int } 
	}
	if (int == '') { return '00' }
  return int < 10 ? '0' + int.toString() : int
}
