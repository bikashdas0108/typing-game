const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteTextElement = document.getElementById("quoteText");
const userInputTextElement = document.getElementById("userInputText");
const timerElement = document.getElementById("timer");

userInputTextElement.addEventListener("input", () => {
  const quoteSpanList = quoteTextElement.querySelectorAll("span");
  const valueCharactersList = userInputTextElement.value.split("");
  let correct = true;

  quoteSpanList.forEach((quoteSpan, index) => {
    const character = valueCharactersList[index];
    if (!character) {
      quoteSpan.classList.remove("correct");
      quoteSpan.classList.remove("incorrect");
      correct = false;
    } else if (quoteSpan.innerText === character) {
      quoteSpan.className = "correct";
    } else {
      correct = false;
      quoteSpan.className = "incorrect";
    }
  });

  if (correct) getNewQuote();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((data) => data.json())
    .then((res) => res.content);
}

async function getNewQuote() {
  const quote = await getRandomQuote();
  quoteTextElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteTextElement.appendChild(characterSpan);
  });
  userInputTextElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

getNewQuote();
