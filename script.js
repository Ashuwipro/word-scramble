const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctword, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time off! ${correctword.toUpperCase()} was the correct word`);
    initGame(); //to restart the game
  }, 1000);
};

const initGame = () => {
  initTimer(100000);
  let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random object from words
  let wordArray = randomObj.word.split(""); //splitting each letter of random word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //getting random number
    //shuffling and swiping wordArray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join(""); //passing shufffled word as word text
  hintText.innerText = randomObj.hint; //passing random object hint as hint text
  correctword = randomObj.word.toLowerCase(); //passing random word to correctWord
  inputField.value = ""; //making input field empty
  inputField.setAttribute("maxlength", correctword.length); //setting input max-length
};
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase(); //getting user value
  //if user didn't enter anything
  if (!userWord) return alert(`Please enter a word`);

  //if user word doesn't match with the correct word
  if (userWord !== correctword)
    return alert(`Oops! ${userWord} is not a correct word`);

  //if above two if conditions are failed then show congrats alert because user word is correct
  return alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
