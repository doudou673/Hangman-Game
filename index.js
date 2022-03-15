const parts = document.querySelectorAll('.figure-part');
const popup = document.querySelector('.popup-container');
const popuptext = document.getElementById('final-message');
const popupbtn = document.getElementById('paly-button');
const wordContainer = document.getElementById('word');
const notification = document.getElementById('notification-container');
const playbtn = document.getElementById('paly-button');
const wrongContainer = document.getElementById('wrong-letters');
let wrongLetters = [];
let correctLetters = [];
const words = ['computer', 'television', 'bluetooth', 'switch'];
let selectWord = words[Math.floor(Math.random() * words.length)];
let playable = true;


function displayWord() {

  wordContainer.innerHTML = `${selectWord.split('').map(
    letter => `<span class='letter'>${correctLetters.includes(letter)?letter:''}</span>`
  ).join('')}`;
  const innerword = wordContainer.innerText.replace(/\n/g, '');
  console.log(innerword);
  if (innerword == selectWord) {
    popup.style.display = 'flex'
    popuptext.innerHTML = "Congratulations! You won!  😃"
    playable = false;
  }
}

function updateWrongLettersEl() {
  const errors = wrongLetters.length;
  if (errors > parts.length) {
    popup.style.display = 'flex'
    popuptext.innerHTML = "Unfortunately you lost~ 😕"
    playable = false;
  }
  parts.forEach((part, index) => {
    if (index < errors) {
      part.style.display = "block";
    }
  })
  wrongContainer.innerHTML = `<p>Wrong:</p>${wrongLetters.map(letter=>`<span>${letter}</span>`)}`
  
}
window.addEventListener('keydown', e => {
  if (playable) {
    const letter = e.key.toLowerCase();

    // show notification
    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      notification.classList.add('show')

      setTimeout(() => {
        notification.classList.remove('show')  
      }, 2000)
      return;
    }

    if (selectWord.includes(letter)) {
      correctLetters.push(letter)
    } else {
      wrongLetters.push(letter);
    }
    updateWrongLettersEl()
    displayWord()
  }
  
})
playbtn.addEventListener('click', e => {
  selectWord = words[Math.floor(Math.random() * words.length)];
  playable = true;
  wrongLetters = [];
  correctLetters = [];
  popup.style.display = 'none'
  parts.forEach((part) => {
      part.style.display = "none";
  })
  displayWord()

})
displayWord()