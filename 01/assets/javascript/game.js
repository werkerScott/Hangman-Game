// Set global variables, way to many not sure how to use yet
var winCounter = 0;
var roundCounter = 1;
var userLetter;
var guessWrongCounter = 12;
var guessCorrectCounter = 0;
var currentAnswer=[];
var currentWord=[];

// Array with answers
var answerList = ["devo", "bananarama", "INXS"];
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

  INXS: {
  name: answerList[1],
  image: "../images/band_bananarama_250x150.png",
  song: "url"
  }
}

// Set game object
var game = {
  startNextRound: function () {},
  winsSetter: function () {},
  currentAnswerSetter: function () {
    currentWord = answerList[0];
    return currentWord;
  },
  guessesSetter: function () {},
}

var elements = {
  wins: document.getElementById('wins'),
  bandImage: document.getElementById('bandImage'),
  currentAnswer: document.getElementById('currentAnswer'),
  guessesRemaining: document.getElementById('guessesRemaining'),
  lettersGuessed: document.getElementById('lettersGuessed'),
}



// Run
window.onload = function startUp () {
elements.currentAnswer=game.currentAnswerSetter();
console.log(game.currentAnswerSetter());
}

  
  







