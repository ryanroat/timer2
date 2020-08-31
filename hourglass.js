function runHourglass() {
  const hourglass = document.querySelector('#hourglass');
  hourglass.innerHTML = '&#xf251';

  setTimeout(() => {
    hourglass.innerHTML = '&#xf252';
  }, 1000);
  setTimeout(() => {
    hourglass.innerHTML = '&#xf253';
  }, 2000);
  setTimeout(() => {
    hourglass.classList.add('rotate');
  }, 3000);
  setTimeout(() => {
    hourglass.classList.remove('rotate');
  }, 4000);
}

runHourglass();

setInterval(() => {
  runHourglass();
}, 4000);
