const showDigitsButton = document.getElementById('showDigitsButton');
const stopButton = document.getElementById('stopButton');
const piDigitsDiv = document.getElementById('piDigits');
let intervalId;
let index = 0;

function showDigitsOfPi() {
  // Obtain a large number of digits of pi (in this case, 10,000 digits)
  fetch('pi_digits.txt')
    .then(response => response.text())
    .then(piDigitsText => {
      const piDigits = piDigitsText.trim().split('');

      // Display each digit with a delay of 1 millisecond
      intervalId = setInterval(() => {
        if (index >= piDigits.length) {
          clearInterval(intervalId);
        } else {
          if (index % 53 === 0 && index !== 0) { // Changed 318 to 53 for better visibility in the CSS box
            piDigitsDiv.appendChild(document.createElement('br'));
          }
          piDigitsDiv.append(piDigits[index]);
          index++;
        }
      }, 125);
    });
}

function stopShowingDigitsOfPi() {
  clearInterval(intervalId);
}

function resumeShowingDigitsOfPi() {
  showDigitsOfPi();
}

showDigitsButton.addEventListener('click', () => {
  if (index === 0) { // Start from the beginning
    showDigitsOfPi();
  } else {
    resumeShowingDigitsOfPi();// Resume from where it left off
  }
});

stopButton.addEventListener('click', () => {
  stopShowingDigitsOfPi();
  piDigitsDiv.appendChild(document.createElement('br'));
  index = piDigitsDiv.innerText.length; // store the last index displayed before stopping
});