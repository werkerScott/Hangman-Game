// REQUIREMENTS
// Screen displays
  // A "Press any key to get started"
  // B "Wins"
  // C <image of band> (optional) Can also play a song (optional)
  // D "Current Word"
  // E "Number of guesses remaining"
  // F "Letters already guessed"

// How it works
  // Initialize / Next Round
  // 1. Computer chooses band
  // 2. Computer presents photo associated with band (optional)      
  // 3. Computer sets and displays wins to 0 
  // 4. Computer sets and displays empty band name - with "blank spaces" for each letter of the name
  // 5. Computer sets and displays unmatched letter guesses as blank
  // 6. Computer sets and displays number of guesses left to 12

  // Execution
  // 7. < INPUT LISTENER > User guesses letter by choosing any letter or number on keyboard
  // 8. < EVALUATE > Did user's letter match any letter's in band name?
  //    1. IF Match(s) - If user letter matches band letter(s) then...
  //       Computer updates display of 'Current Word'(D)
  //    2. OR IF No matches - If user letter does not match a band letter then...
  //       Computer updates display of 'Letters already guesses'(F)
  //    3. Or if matches letter already guessed then...
  //       Do nothing
  // 9. < EVALUATE > Has the user guessed all the letters in the band name?
  //    1. If true, 
  //        1. Add a win and update 'Wins" (B)
  //        2. Go to next round (1)
  //    2. Otherwise, do nothing and wait (7)
  // 10. < EVALUATE > Is the "Number of guesses remaining 0"?
  //    1. If True
  //        1. Go to Next Round (1)
  //    2. Otherwise, do nothing and wait (7)
  // </div>

// Caveats
// Try to do it without using a page refresh. 
// Comments:To me this means there has to do 
// with reset/initialize which is the hardest aprt of this. I may try refreshing all html
// at teh div level first, then, try targeting just the spans after everything works 

// Notes
// I am not sure if we should serialy choose the bands, seems random would be complicated
// because you have to then determine if it has been picked. 



// Set global variables in a reusable object

var game = {
    currentAnswer: null,
    guessCounter: null,
    guessedLetters: [],
    gameStarted:false,
    roundCounter: 0
  }



// Array with answers
var answerList = ["devo", "bananarama", "misfits"];
// Might find this useful, not sure yet
var bandProperties = ["name", "image", "song"];
// Looks like we should do this to add things to the page related to the band
var bands = {
  devo: {
  name: answerList[0],
  image: "../images/band_devo_250x150.png",
  song: "url"
  },

  bananarama: {
  name: answerList[1],
  image: "../images/band_bananarama_250x150.png",
  song: "url"
  },

  misfits: {
  name: answerList[1],
  image: "../images/band_bananarama_250x150.png",
  song: "url"
  }
}



// Put all the page ID's into a global object
var gameHTML = {
  play: document.getElementById('play-msg'),
  content: document.getElementById('game-space'),
  score: document.getElementById('score'),
  bandImage: document.getElementById('band-image'),
  currentAnswer: document.getElementById('current-answer'),
  guessesRemaining: document.getElementById('guess-remaining'),
  lettersGuessed: document.getElementById('letters-guessed'),
}


//////////////////////////////////////////////////////////////

// first function called everytime there is a key pressed
function setGame() {
  //event listener
  document.onkeyup = onUserInput;
  resetModel();
}


function onUserInput(arr) {
  var keyPress = arr.key.toLowerCase();
  updateGame(keyPress);
  render();
}


function resetModel() {
  game.currentAnswer = getNextAnswer();
  game.guessCounter = 12;
  game.lettersGuessed = [];
  game.gameStarted = false;
  render()
}

function getNextAnswer() {
  return  answerList[game.roundCounter];
}

function render() {
  //detects if game has been started then updates only the play-msg field
  if ( game.gameSarted===false ) {
    gameHTML.play.innerHTML = "Press Any Key To Play!";
    game.gameStarted = true;
    return;
  } 
  else {
    gameHTML.play.innerHTML = " ";
  }

  //render current score
  var renderTarget = gameHTML.content;
  var emptyAnswer = emptyAnswerBuilder(game.currentAnswer, game.guessedLetters)
    /////////// Not touched below ///////////////////////////////////////////////////

  var textToRender = 

          "current word: " + wordWithDashes + "<br>"
          + "number of guesses remaining: " + hangManModel.numGuessRemaining + "<br>"
          + "letters guessed: " + hangManModel.lettersGuessed + "<br>"
  renderTarget.innerHTML = textToRender;
}


function updateGame(keyPress) {
  if (globalVars.guessNumCounter < 1 ) {
    resetModel();
    return;
  } 
  if (globalVars.guessedLetters.indexOf(keyPress)=== -1) {
    globalVars.guessedLetters.push(keyPress)
  }
  globalVars.guessNumCounter = globalVars.guessNumCounter-1 ;

}

/////////// Not touched above ///////////////////////////////////////////////////
function emptyAnswerBuilder(word, charArr) {
  var result = "";
  for (var i = 0; i < word.length; i++) {
    var charAt =  charArr.indexOf(word[i]);
    if(charAt > -1) {
      result+=word[i];
    } else {
      result+="-"
    }
  }
  return result;
}

// Run
// setGame()

  
  







