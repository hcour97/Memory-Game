const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0; // keeps track of how many cards have been clicked, we want MAX 2 at a time
let noClicking = false; // keeps track of whether the card has been clicked on or not
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const btnContainer = document.querySelector("btns");
let scoreCount = 0;
//let highScore = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// "black",
  // "lime",
  // "lavender",
  // "aqua",
  // "hotpink",



// here is a helper function to shuffle an array
// it returns the same array with values shuffleds
// it is based on an algorithm called Fisher Yates if you want it research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// document.addEventListener("DOMContentLoaded", function () {
//   if (localStorage.highScore) {
//     score2.innerText = JSON.parse(localStorage.highScore);
//   }
//   else {
//     localStorage.setItem("highScore", JSON.stringify(score2.innerText));
//   }
// })

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function startGame(event) {
  // when the DOM loads
createDivsForColors(shuffledColors);

}
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) return;
  scoreCount ++;
  score1.innerText = scoreCount;
 let newScore = document.querySelector('#score1');
 newScore.innerHTML = `${scoreCount}`;
  if (e.target.classList.contains("flipped")) return;

  //make the correct color appear when clicked
  let currentCard = e.target; // current card is the card that was clicked;
  console.log("you just clicked", currentCard.classList);
  currentCard.style.backgroundColor = currentCard.classList[0]; // sets the background color of the card clicked to the one it clicked 

  //compare clicked on cards
  if (!card1 || !card2) {
    currentCard.classList.add("flipped"); // tells you the card was flipped over
    console.log("you just clicked", currentCard.classList);
    card1 = card1 || currentCard; // gives card1 a value other than null
    card2 = currentCard === card1 ? null : currentCard;
  }

// COMPARE CLICKED CARDS
if (card1 && card2) {
  noClicking = true;
  // rename them
  let gif1 = card1.className;
  let gif2 = card2.className;
  console.log(gif1,gif2);


if (gif1 === gif2) {
  cardsFlipped += 2;
  // console.log(cardsFlipped);
  //matching cards can no longer be clicked on
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  card1 = null;
  card2 = null;
  noClicking = false;
}

// if they do not match, reset them
else {
  setTimeout(function() {
  card1.style.backgroundColor = "";
  card2.style.backgroundColor = "";
  card1.classList.remove("flipped");
  card2.classList.remove("flipped");
  card1 = null;
  card2 = null;
  noClicking = false;
}, 1000);
    }
}

// function reset(event) {
//   const cards = document.querySelectorAll("#game div");
//   for (card of cards) {
//     card.remove()
//   }
//   // reset the score
//   scoreCount = 0;
//   score1.inenrText = scoreCount;
//   score2.innerText = JSON.parse(localStorage.highScore);
//   shuffledColors = shuffle(COLORS);
//   createDivsForColors(shuffledColors);
//   const resets = document.querySelectorAll(".resets");
//   for (btns of resets) {
//     btns.remove();
//   }
// }

if (cardsFlipped === COLORS.length) {
  alert("Game Over! You Won.");
//   let restartbtn = document.createElement("button");
//   restart.innerText = "Play Again";
//   restart.setAttribute("class", "resets");
//   restart.addEventListener("click", reset);
//   btnContainer.appendChild(restartbtn);
// }
//   if (scoreCount < parseInt(score2.innerText) || parseInt(score2.innerText) === 0) {
//     localStorage.setItem("highScore", JSON.stringify(scoreCount));
//     score2.innerText = scoreCount;
//   }
}
}
