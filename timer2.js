// countdown time

let countdown;
let hrs;
let mins;
let secs;
let clockText;
const clock = document.querySelector('#display');

function displayTime(time) {
    hrs = Math.floor(time / 3600);
    mins = Math.floor(time / 60);
    secs = time % 60;

    clockText = `${hrs}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
    }${secs}`;
    clock.textContent = clockText;
    document.title = clockText;
}

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTime(seconds);

    countdown = setInterval(() => {
        const timeLeft = Math.round((then - Date.now()) / 1000);
        // are we done?
        if (timeLeft < 0) {
            clearInterval(countdown);
            console.log('done');
            return;
        }
        displayTime(timeLeft);
    }, 1000);
}
