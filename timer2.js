// countdown time

let countdown;
let hrs;
let mins;
let secs;
let clockText;
let inputViz = true;
const clock = document.querySelector('#count');
const expiry = document.querySelector('#expiry');
const timeInput = document.querySelector('#customTime');
const timeInputForm = document.querySelector('.controls');

function hideInput() {
    timeInputForm.style.visibility = 'hidden';
    inputViz = false;
}

function showInput() {
    timeInputForm.style.visibility = 'visible'; // show input form
    timeInput.focus(); // move focus to user input after showing
    inputViz = true;
}

function toggleInputViz() {
    if (inputViz) {
        hideInput();
    } else {
        showInput();
    }
    console.log(inputViz);
}

function processKey(pressed) {
    pressed.preventDefault();
    key = pressed.code;
    if (key === 'Escape') {
        timer(0);
        console.log('quit now with [esc]');
    } else {
        toggleInputViz();
        console.log(pressed.code);
    }
}

function detectUser(active) {
    if (active) {
        document.addEventListener('click', toggleInputViz);
        document.addEventListener('keydown', processKey);
    } else {
        document.removeEventListener('click', toggleInputViz);
        document.removeEventListener('keydown', processKey);
    }
}

function displayTime(time) {
    hrs = Math.floor(time / 3600);
    mins = Math.floor(time / 60) % 60;
    secs = time % 60;

    clockText = `${hrs}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
    }${secs}`;
    clock.textContent = clockText;
    document.title = clockText;
}

function displayExpiry(timestamp) {
    let amPm = 'PM';
    const end = new Date(timestamp);
    let hour = end.getHours();
    if (hour > 12) {
        hour -= 12;
        // amPm = 'PM';
    } else if (hour === 0) {
        hour = 12;
        amPm = 'AM';
    } else if (hour < 12) {
        amPm = 'AM';
    }

    const minutes = end.getMinutes();
    expiry.textContent = `done at ${hour}:${
        minutes < 10 ? '0' : ''
    }${minutes}  ${amPm}`;
}

function timer(seconds) {
    hideInput(); // hide input form while running timer
    detectUser(true); // check for mouse click or keyboard press(es) from user
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTime(seconds);
    displayExpiry(then);

    countdown = setInterval(() => {
        const timeLeft = Math.round((then - Date.now()) / 1000);
        // are we done?
        if (seconds === 0 || timeLeft === 0) {
            displayTime(0);
            clearInterval(countdown);
            showInput(); // show input form after running timer
            detectUser(false);
            console.log('done');
            return;
        }
        displayTime(timeLeft);
    }, 1000);
}

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newTime = this.time.value;
    console.log(newTime);
    this.reset(); // clear user input
    // if (newTime > 59) {
    // }
    timer(newTime * 60);
});
