/* eslint-disable no-console */
// countdown time

let countdown;
let hrs;
let mins;
let secs;
let clockText;
let inputIsViz = true;
const clock = document.querySelector('#count');
const expiry = document.querySelector('#expiry');
const inputForm = document.querySelector('#custom');
const timeInput = document.querySelector('#customTime');
const timeInputForm = document.querySelector('.controls');

function hideInput() {
    inputForm.reset(); // clear form
    timeInputForm.style.visibility = 'hidden'; // hide input form
    inputIsViz = false; // track form visibily state
}

function showInput() {
    timeInputForm.style.visibility = 'visible'; // show input form
    inputForm.reset(); // clear form
    timeInput.focus(); // move focus to user input after showing
    inputIsViz = true; // track form visibily state
}

function toggleInputViz() {
    if (inputIsViz) {
        hideInput();
    } else {
        showInput();
    }
    // console.log(inputViz);
}

function processKey(pressed) {
    const key = pressed.code;
    const value = pressed.key;
    const ascii = pressed.keyCode;
    if (key === 'Escape') {
        timer(0);
        console.log('quit now with [esc]');
    } else if (key === 'AltLeft' || key === 'AltRight' || key === 'Tab') {
        console.log(`ignored ${key} - [${value}] key.`);
    } else if (
        !isNaN(value) ||
        ascii === 110 ||
        ascii === 190 ||
        ascii === 13
    ) {
        if (!inputIsViz) {
            toggleInputViz();
        }
    } else {
        if ((ascii > 36 && ascii < 46) || (ascii > 57 && ascii < 127)) {
            pressed.preventDefault();
            toggleInputViz();
        }
        // console.log(isNaN(value));
        console.log(`${key} - [${value}] ${ascii} ascii pressed.`);
        console.log(pressed);
    }

    // if (!inputViz) {
    //     toggleInputViz();
    //     console.log(pressed.code);
    // } else {
    //     console.log(pressed.code);
    // }
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
    // TODO: need input validation  --  simple try below

    const newTime = this.time.value;

    if (newTime != '') {
        console.log(newTime);
        this.reset(); // clear user input
        timer(newTime * 60);
    }
});
