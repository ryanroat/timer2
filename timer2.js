// countdown time

let countdown;
let hrs;
let mins;
let secs;
let clockText;
const clock = document.querySelector('#count');
const expiry = document.querySelector('#expiry');

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

function displayExpiry(timestamp) {
    let amPm = 'AM';
    const end = new Date(timestamp);
    let hour = end.getHours();
    if (hour > 12) {
        hour -= 12;
        amPm = 'PM';
    }

    const minutes = end.getMinutes();
    expiry.textContent = `done at ${hour}:${
        minutes < 10 ? '0' : ''
    }${minutes}  ${amPm}`;
}

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTime(seconds);
    displayExpiry(then);

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

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    // console.log(mins);
    this.reset();
    timer(mins * 60);
});
