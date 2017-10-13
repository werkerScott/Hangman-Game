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
// Not randomly pciking bands. Spent 6 hours looking at code examples of other
// hangman games and found a skeleton to work from and reference.



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
var currentHangman ; //the string gets pulled from the object
var currentHangmanAnswer = []; //what gets filled in
var currentHangmanAnswerIndex = []; //tracks what has been entered
var incorrectLetters = [];
var roundCounter = -1;
var winsCounter = 0;


var displayStart = document.getElementById('start-msg');
var displayContent = document.getElementById('game-space');
var displayScore = document.getElementById('score');
var displayImage = document.getElementById('band-image');
var displayInstructions = document.getElementById('instruct-msg');
var displayCurrentHangmanAnswer = document.getElementById('blank-answer');
var displayIncorrectGuessCount = document.getElementById('guess-remaining');
var displayIncorrectLetters = document.getElementById('letters-guessed');

var game = {
  newGame: function () {
    //this is called at startup, then, when a new game starts
    //reset or clear specific variables
    currentHangman = 0;
    currentHangmanAnswer = [];
    currentHangmanAnswerIndex = []
    incorrectLetters: [],
    incorrectGuessCount= 12; 
    //add a round everytime called
    roundCounter++; 

    ///////// LOAD NEXT BAND/////////
    //pick the next band
    currentHangman = game.getNextBand(bands); 
    //set and display fields
    displayScore.innerHTML = winsCounter;
    displayImage.innerHTML = "<img src=\"" + currentHangman.image + "\">";

    //create blanks from current name at start of each round
    
    game.createEmpty_HangmanAnswer(); 
    console.log(currentHangmanAnswer)
    // show 
    game.update_HangmanAnswer();
  },


///////// Handling Answer Line ( blank-answer) /////////
  createEmpty_HangmanAnswer: function() {
    // populate the blank array with appropriate number of blanks and store
    for (var i = 0; i < currentHangman.name.length; i++) {
      currentHangmanAnswer.push("_");
    };
  },

  update_HangmanAnswer: function(guess) {
    //find where in the song name it exists
    //the first line is in here to clear the index on each user guess, otherwise,
    //it would build with answers
    //i am sure there is better way to do this, goign to go back in and try
    //this with my orginal guess
    currentHangmanAnswerIndex = [];
    for (var i = 0; i < currentHangman.name.length; i++) {
      if (currentHangman.name[i] === guess) {
        // pushes correct letters into appropriate slots, everything inbetween is undefined
        currentHangmanAnswerIndex.push(i);
      };
    };

    // this inserts the new correct guesses into the display object
    for (var i = 0; i < currentHangmanAnswerIndex.length; i++) { 
      currentHangmanAnswer[currentHangmanAnswerIndex[i]] = guess;
    };

    // update the display on the web page
    game.display_HangmanAnswer();
  },

  display_HangmanAnswer: function() {
    displayCurrentHangmanAnswer.innerHTML = currentHangmanAnswer.join("\u2009");
  },



  getNextBand: function(set) {
    //have we played all the games, then pick next unless last
    if (roundCounter<set.length) {
      currentHangman = set[roundCounter];
      return currentHangman;
    };
    //else {game.gameOver()};  // to do
  },



  instructionsMessage: function () {
    //this is called everytime but runs only once...
      if (roundCounter>-1) {
        displayInstructions.innerHTML = "Guess a letter";
        displayStart.innerHTML = " ";
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

//runs on every keypress, not efficent, go back and bind
//starting to pressing "1"
game.instructionsMessage();





  
};







