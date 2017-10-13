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
  // 1. Computer chooses band - DONE
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



// Set global variables
// MAY NOT USE 
var answerList = ["devo", "bananarama", "misfits"];
// MAY NOT USE 
var bandProperties = ["name", "image", "song"];
// MAY NOT USE 
var bands = [
  {
    name: "devo",
    nameArray: answerList[0], // MAY NOT USE 
    image: "./assets/images/band_devo_250x150.png",
    song: "url"
  },
  {
    name: "bananarama",
    nameArray: answerList[1],// MAY NOT USE 
    image: "./assets/images/band_bananarama_250x150.png",
    song: "url"
  },
  {
    name: "misfits",
    nameArray: answerList[2],// MAY NOT USE 
    image: "./assets/images/band_misfits_250x150.png",
    song: "url"
  }
]

// Global Variables 
var currentHangman = 0;
var currentHangmanAnswer = [];
var currentHangmanAnswerIndex = [];
var incorrectGuessCount = 0;
var incorrectLetters = [];
var roundCounter = -1;
var winsCounter = 0;

// Initializing / DOM loading  /////////////////////////////////////////
// we have to first declare page elements we are targeting
// globally so we can access them outside of the onLoad function
// if everything is working, try coming back and making this an object
var displayContent;
var displayScore;
var displayImage;
var displayCurrentHangmanAnswer;
var displayIncorrectGuessCount;
var displayIncorrectLetters;
// we have to assign values to our variables we want to target
// BEFORE the DOM loads, otherwise, the browser will not put
// be able to assign things. This is fired from the <body> tag. 
// The other way to do this is to just put the javascript link
// at the bottom of the page.
function onLoad () {
  displayPlay = document.getElementById('play-msg');
  displayContent = document.getElementById('game-space');
  displayScore = document.getElementById('score');
  displayImage = document.getElementById('band-image');
  displayCurrentHangmanAnswer = document.getElementById('current-answer');
  displayIncorrectGuessCount = document.getElementById('guess-remaining');
  displayIncorrectLetters = document.getElementById('letters-guessed');
}

var game = {
  newGame: function () {
    //reset or clear variables
    currentHangman = 0;
    currentHangmanAnswer = 0;
    incorrectGuessCount= 12;
    incorrectLetters: [],
    
    roundCounter++; //add to the rounds
    
    currentHangman = game.setNextBand(bands); //pick the next band and set main fields on screen
    // console.log(currentHangman);
    

    //create blanks


    //display blanks
  },

  setNextBand: function(set) {
    //have we played all the games, then pick next unless last
    if (roundCounter<set.length) {
      currentHangman = set[roundCounter];
      return currentHangman;
    }
    else {game.gameOver()};  // to do
  },

  setStage: function () {
    //update main area of stage, triggered from setNextBand
    if (roundCounter<set.length) {
      displayPlay.innerHTML = "Let's Play";
      displayScore.innerHTML = winsCounter;
      displayImage.innerHTML = "<img src=\"" + currentHangman.image + "\">";
    }
  },
  

  gameOver: function() {
  // to do
  }

};


//////////////////////////////////////////////////////////////
//initialize 
game.newGame();

//run the gain off an event listener
document.onkeyup = function(event) {

var userGuess = event.key;
game.setStage ();





  
};







