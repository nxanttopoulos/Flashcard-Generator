var fs = require("fs");
var inquirer = require("inquirer");
// Create a "Prompt"
inquirer.prompt([
     {
    type: "input",
    message: "Create your Basic Flash card by writing: 'basic', 'frontside text', 'backside text' \n  Or Cloze Card by writing: 'cloze', 'full text', 'cloze text' \n  (No Quotation Marks)",
    name: "name",
  },
]).then(function(user) {
  // Gets the user's input and readies it flash card production.
  var userInput = user.name;
  userInput = userInput.split(", ");
  var command = userInput[0];
  var frontSide = userInput[1];
  var backSide = userInput[2];
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
    this.partial = text.replace(cloze, "..."); 
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
});