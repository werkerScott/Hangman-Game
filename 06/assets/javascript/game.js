


// Rules
  // Computer picks a band and the user guesses the name of the band
  // User gets 12 guesses
  // If the users guesses correctly then all corresponding blanks are updated
  // If teh user guesses incorrectly then the guessed letter is added to a list and guesses remaining decreases by 1
  // If the user guesses an already guessed letter, wrong or right, it does nothing
  // If the user correctly fills in the letters before guesses are 0, then the win
  // If the user reaches 0 guesses before filling in all the letters, they lose

// Screen needs to display
  // A "Press any key to get started"
  // B "Wins"
  // C <image of band> (optional) Can also play a song (optional)
  // D "Current Word"
  // E "Guesses remaining"
  // F "Letters already guessed"

// How it works
  // Initialize / Next Round
  // 1. Computer chooses band                                                                         - DONE
  // 2. Computer presents photo associated with band (optional)                                       - DONE      
  // 3. Computer sets and displays wins to 0                                                          - DONE
  // 4. Computer sets and displays empty band name - with "blank spaces" for each letter of the name  - DONE
  // 5. Computer sets and displays unmatched letter guesses as blank                                  - DONE
  // 6. Computer sets and displays number of guesses left to 12                                       - DONE

  // Execution
  // 7. < INPUT LISTENER > User guesses letter by choosing any letter or number on keyboard           - DONE
  // 8. < EVALUATE > Did user's letter match any letter's in band name?
  //    1. IF Match(s) - If user letter matches band letter(s) then...
  //         Computer updates display of 'Current word                                                - DONE
  //    2. OR IF No matches - If user letter doesn't match a band letter AND not guessed already then
  //         Computer updates display of 'Letters already guesses'
  //         AND Computer decriments the guess counter
  //    3. Or if doesn't match band letters BUT does match already guessed letter then...
  //         Do nothing
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
// Comments:Struggling with initialization and click event, what and how to show stuff when

// Notes
// follow logic from another hangman file found in github
// removing anything advanced or overkill, focusing on basics
// making alterations/deviations/improvements to meet goals



// Set global variables
// MAY NOT USE 
var answerList = ["devo", "bananarama", "misfits"];
// MAY NOT USE, from class
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
var incorrectGuessCount = 12; 
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
    //this is called at startup, then, when a new round starts
    //add a round everytime called
    roundCounter++; 
    // check if game over
    if (roundCounter === 3){
      console.log("game over");
      return;
    } 


    //reset or clear specific variables
    currentHangman = 0;
    currentHangmanAnswer = [];
    currentHangmanAnswerIndex = []
    incorrectGuessCount = 12; 
    incorrectLetters: [],
    
   

    ///////// LOAD NEXT BAND /////////
    //pick the next band
    currentHangman = game.get_NextBand(bands); 
    //create blanks from current name at start of each round
    game.createEmpty_HangmanAnswer(); 
    // console.log(currentHangmanAnswer);

   ///////// UPDATE DISPLAY /////////
    displayScore.innerHTML = winsCounter;
    displayImage.innerHTML = "<img src=\"" + currentHangman.image + "\">";
    game.update_HangmanAnswer();
    game.display_HangmanAnswer();
    displayIncorrectGuessCount.innerHTML = incorrectGuessCount;
    displayIncorrectLetters.innerHTML = incorrectLetters;
   
  },

  ////////////////////////////////////
  check_Guess: function(guess) {
    if ( currentHangman.name.indexOf(guess) !== -1 && incorrectLetters.indexOf(guess) === -1 ) {
      // Does match a band letter AND not already gussed
      return 0;

    } else if ( currentHangman.name.indexOf(guess) === -1 && incorrectLetters.indexOf(guess) === -1 ) {
      // Does not match a band letter AND DOES NOT match an already guessed letter
      return 1;
    }
      // Do not need anything else since guessing with already guessed letter wrong or right does nothing
      else {return 2};
  },




  update_Game: function() {


    // USER LOST
    if (incorrectGuessCount === 0){
    // console.log("you lose");
      game.newGame();
    } 
    // USER WON
    else if (currentHangmanAnswer.indexOf("_") === -1) {
    // console.log("you win");
      winsCounter++;
      game.newGame();
    }
  },

  gameOver: function() {
   displayStart.innerHTML = "GAME OVER";
   break;
  },



  ////////////////////////////////////
  update_HangmanAnswer: function(guess) {
    //find matches and update display at end
    //   FIRST LINE
    //   clears the array each guess
    currentHangmanAnswerIndex = [];
    for (var i = 0; i < currentHangman.name.length; i++) {
      if (currentHangman.name[i] === guess) {
        // pushes correct letters into appropriate slots, everything inbetween slots is undefined
        currentHangmanAnswerIndex.push(i);
      }
    }

    // this inserts the new correct guesses from the array above, into the display object
    for (var i = 0; i < currentHangmanAnswerIndex.length; i++) { 
      currentHangmanAnswer[currentHangmanAnswerIndex[i]] = guess;
    }
  },


  update_incorrectGuess: function(guess) {
    incorrectLetters.push(guess);
    incorrectGuessCount--;
  },
  

  // HELPERS //////////////////////////////////
  createEmpty_HangmanAnswer: function() {
    // populate the blank array with appropriate number of blanks and store
    for (var i = 0; i < currentHangman.name.length; i++) {
      currentHangmanAnswer.push("_");
    };
  },

  get_NextBand: function(set) {
    //have we played all the games, then pick next unless last
    if (roundCounter<set.length) {
      currentHangman = set[roundCounter];
      return currentHangman;
    };
    //else {game.gameOver()};  // to do
  },



  // UPDATE DISPLAY ///////////////////////////
  display_instructionsMessage: function () {
    //this is called everytime but runs only once...
      if (roundCounter>-1) {
        displayInstructions.innerHTML = "Guess a letter";
        displayStart.innerHTML = " ";
      }
  },

  display_HangmanAnswer:function() {
    displayCurrentHangmanAnswer.innerHTML = currentHangmanAnswer.join("\u2009");
  },

  display_incorrectGuess: function() {
    displayIncorrectGuessCount.innerHTML = incorrectGuessCount;
    displayIncorrectLetters.innerHTML = incorrectLetters;
  },
};


//////////////////////////////////////////////////////////////
//initialize 
game.newGame();


//run the gain off an event listener
document.onkeyup = function(event) {

  var userGuess = event.key;

  // runs on every keypress, not efficent, 
  // REFACTOR: go back and bind start to key 1
  game.display_instructionsMessage();

  // CORRECT and not already used
  if (game.check_Guess(userGuess) === 0) { 
    game.update_HangmanAnswer(userGuess);
    game.display_HangmanAnswer();
  // INCORRECT and not already used 
  } else if (game.check_Guess(userGuess) === 1) {
    game.update_incorrectGuess(userGuess);
    game.display_incorrectGuess();
  // DUPLICATE can trigger something but for now does nothing
  } else if (game.check_Guess(userGuess) === 2) {}

  // check global status then update display
game.update_Game();
  
};







