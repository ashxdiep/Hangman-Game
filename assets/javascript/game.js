

//list of songs
var songs= ["under the sea", "colors of the wind",
"a whole new world", "be our guest",
  "go the distance", "let it go", "you got a friend in me", "once upon a dream"];

//array of letters of keys that can be guessed
var legal= ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k","l", "m", "n", "o", "p",
 "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//array of letters already guessed
var guessed= ["~"];

//making my array of images
var createImage = function(src, title) {
  var img   = new Image();
  img.src   = src;
  img.alt   = title;
  return img;
};

// array of images
var images = [];

// push two images to the array
images.push(createImage("assets/images/hanger.png", "hanger"));
images.push(createImage("assets/images/hang2.png", "hang2"));
images.push(createImage("assets/images/hang3.png", "hang3"));
images.push(createImage("assets/images/hang4.png", "hang4"));
images.push(createImage("assets/images/hang5.png", "hang5"));
images.push(createImage("assets/images/hang6.png", "hang6"));
images.push(createImage("assets/images/hang7.png", "hang7"));
images.push(createImage("assets/images/hang8.png", "hang8"));
images.push(createImage("assets/images/hang9.png", "hang9"));





//initiating wins
var wins = 0;
var wrong = 0;
//current word is in arrays songs with index of num of wins
var word = songs[wins];

//display word as underscore
var display = newDisplay(word);



//when a key is pressed the game starts
document.onkeyup = function(event){

  // the key pressed
  var keypressed = event.key;

  //check if letter is already guessed
  var notGuessed = checkGuessed(keypressed, guessed);

  //check if letter is legal
  var isLetter = checkLegal(keypressed, legal);


  //can now continue game if a letter and not guessed
  if (notGuessed && isLetter){

  //check if the letter is in the word else
      var goodGuess = checkLetter(keypressed, word);

    //if yes, display new word and update letters guessed
      if (goodGuess){
        display = updateDisplay(keypressed, word, display);
        guessed.push(keypressed);

        //update display for guessed letters

        $(".lettersGuessed").append(keypressed + " ");
      }
    //if no,
      else{
        wrong++;
        guessed.push(keypressed);

        //update display for guessed letters
        $(".lettersGuessed").append(keypressed + " ");

        //update displays for number guesses remaining
        $(".numGuess").html(9 - wrong);

        //add bodypart
        console.log(images[wrong]);
        $("#hello").html(images[wrong]);
      }
    //check if the whole song was guessed
    var songGuessed = guessedSong(display);
    //if yes,
    if (songGuessed){

      //update win and on win display
      wins++;
      console.log("just updated wins");
      $(".wins").html(wins);

      //update header to the song guessed
      $("h2").html(word.toUpperCase());

      //update new song
      word = songs[wins];

      //alert that they guessed it
      alert("YOU GOT IT DUDE!");

      //update the display word to underscores
      display = newDisplay(word);

      //reset letters guessed display
      guessed= ["~"];
      $(".lettersGuessed").empty();

      //resent wrong and display for how many guesses left
      //wrong = 0;
      //$(".numGuess").html(9 - wrong);
    }

  //check if wrongs are more than 12
  if (wrong > 8){
    //if yes, alert you lose. Reload to play again
    alert("You just got hung. Come again next time.");
    location.reload();
  }
}

    //is not letter or already guessed
    else {
      alert ("NOT VALID! Try again.");
    }
  };

//function to take new word and turn it into underscores
function newDisplay(word){
  var display = "";
  for (var i = 0; i < word.length; i++){
    if (word.charAt(i) === ' '){
      display += " ";
    }
    else {
      display += "_";
    }
  }
  console.log(display);
  //document.getElementById("current").textContent(display);
  $("#current").html(display);
  return display;

}

//function to check if the letter was already guessed
function checkGuessed(keypressed,guessed){
  for (var k = 0; k < guessed.length; k++){
    if (keypressed === guessed[k]){
      console.log("guessed");
      return false;
    }
  }
  return true;
}

//function to check if key pressed is a letter
function checkLegal(keypressed, legal){
  for (var i = 0; i < legal.length; i++){
    if (keypressed === legal[i]){
      console.log("is a letter");
      return true;
    }
  }
  return false;
}

//function to see if the letter is in the word
function checkLetter(keypressed, word){
  for (var j = 0; j < word.length; j++){
    if (keypressed === word.charAt(j)){
      console.log("good guess");
      return true;
    }
  }
  return false;
}

//function to update display for the word with correctly guessed letters
function updateDisplay(keypressed, word, display){
  //empty String
  var newdisplay = "";

  //loop through each letter of the currect word
  for (var m = 0; m < word.length; m++){

    //if index of old display has not been filled in yet
    if (display.charAt(m) === "_"){

      //if the letter guessed is the same as index of the word (its a match)
      if (keypressed === word.charAt(m)){
        //add this letter to the new display
        newdisplay += keypressed;
      }

      //else if index of the word is a space, add a space to the new display
      else if (word.charAt(m) === " "){
        newdisplay += " ";
      }

      //else if the letter guessed does not match index of the word, add to new display an underscore
      else{
        newdisplay += "_";
      }
    }

    //if the index of the old displayed has already been guessed correctly
    //add the previously guesse letter into the new display
    else {
      newdisplay += display.charAt(m);
    }
  }
  console.log(newdisplay);

  //display the new display
  $("#current").html(newdisplay);
  return newdisplay;
}

//function to check if the whole song was guessed
function guessedSong(display){
  if (display === word){
    console.log("guessed song");
    return true;
  }
  console.log("did not guess");
  return false;
}
