var fs = require("fs");
var command = process.argv[2];
var userInput = process.argv;
var newCard = "";
// Gets the user's input and readies it flash card production.
for (var i = 3; i < userInput.length; i++) {
  if (i > 3 && i < userInput.length) {
    newCard = newCard + " " + userInput[i];
  }
  else {
    newCard += userInput[i];
  }
}
newCard = newCard.split(", ");
var frontSide = newCard[0];
var backSide = newCard[1];
// Basic Flash Card Constructor.
function BasicCard(front, back) {
  this.front = front;
  this.back = back;
}
var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");
// Cloze Flash Card Constructor.
function ClozeCard(text, cloze) {
  this.fullText = text;
  this.cloze = cloze;
  var minusOne = text.substring(text.indexOf(' ')+1);
  this.partial = "..." + minusOne.substring(minusOne.indexOf(' ')+1);
}
var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");
// Checks the user's input and makes the desired Flaskcard.
if (command === "basic") {
	var basicCard = new BasicCard(frontSide, backSide);
	fs.appendFile('log.txt', "Basic Card: " + JSON.stringify(basicCard)+"\n", (err) => {
  		if (err) throw err;
  		console.log("New Basic Flash Card Created!");
	});
	console.log("Frontside: "+ basicCard.front);
	console.log("Backside: "+ basicCard.back);
} else if (command === "cloze") {
	if (frontSide.includes(backSide) === false) {
		console.log("Oops, this doesn't work!");
	} else {
	var clozeCard = new ClozeCard(frontSide, backSide);
	fs.appendFile('log.txt', "Cloze Card: " + JSON.stringify(clozeCard)+"\n", (err) => {
  		if (err) throw err;
  		console.log("New Cloze Flash Card Created!");
	});
	console.log("Full Text: "+ clozeCard.fullText + ".");
	console.log("Partial Text : "+ clozeCard.partial + ".");
	console.log("Cloze Text: "+ clozeCard.cloze);
	}
}  
// Example User entries to create the two types of flashcards.
// node flashcard-app basic Who was the second president of the United States?, George Washington
// node flashcard-app cloze John Adams was the second president of the united states?, George Washington