/* All sounds from freesound.org, including:
https://freesound.org/people/Jagadamba/sounds/254282/
https://freesound.org/people/HaraldDeLuca/sounds/170220/
https://freesound.org/people/reznik_Krkovicka/sounds/324277/
https://freesound.org/people/imasoundingboard/sounds/263166/
*/
// "You are very hungry" is Amelle Margaron's final submission for CART253. In this game, the player roams through
// space and can eat different objects or interact with others. This project is inspired by sidescroller movement and wanting
// to learn the tricks of working with GIFs and array animation in P5.


// Declare all game variables. Includes sound and image objects, game states, player position and movement elements...
let history = [];
let player;
let playerImage;
let playerRight1;
let playerRight2;
let playerLeft1;
let playerLeft2;
let playerWidth = 46;
let playerHeight = 81;
let planetX = 0;
let planetY = 0;
let planetWidth = 300;
let planetHeight = 300;
let backgroundImage;
let menuImage1;
let menuImage2;
let menuImage3;
let menuImageArray = [];
let menuArrayIndex = 0;
let currentMenuImage;
let endscreenImage;
let textSpeech = "YOU ARE VERY HUNGRY.";
let pixelFont;
let playerX = 200;
let playerY = 500;
let playerVX = 0;
let playerVY = 0;
let playerSpeed = 4;
let planet1Image;
let planet1Array = [];
let planet2Array = [];
let planet3Array = [];
let flamingoArray = [];
let planet1Appear = true;
let planet1Event = false;
let planet2;
let planet2Image;
let planet3;
let planet3Image;
let gameState = 0;
let landState = 0;
let dog;
let dogImage;
let firstDogAppear = true;
let secondDogAppear = false;
let dogX;
let dogVX;
let dogY;
let dogVY;
let dogSpeed = 10;
let planetCount = 0;
let walkSound;
let backgroundSound;
let eatSound;
let textSound;
let angle = 0;
let radius = playerWidth / 2;
let planetsArray = []
let currentPlanetsArray;
let currentPlanetsArrayIndex = 0;
let menWidth = 100;
let starGif_loadImg;
let starGif_createImg;
let myGif;
let gifArray = [];
let gifArrayCount = 1;
let flamingoTopImage;
let flamingoMidImage;
let tropicalSound;
let starObject;
let flamingoObject;
let charactersArray = [];
let playerObject;
let menArray = [];
let messageSound;
let subFlamingoImageLeft;
let subFlamingoImageRight;
let subflamingoArray = [];

//preload
//
//Loads linked resources.
function preload() {
  //Calls function to set up resources
  resourceSetup();
  // // Call .playmode function which prevents this sound from being played until before it's playtime has elapsed
  // // ie. my sound was really slowing down my project and this prevents calling my sound 5million times/minute
  walkSound.playMode('untilDone');
}

//resourceSetup
//
// Load all linked resources and load them into arrays if needed
function resourceSetup() {
  // for Star class
  starGif_createImg0 = createImg("assets/images/star.gif");
  gifArray.push(starGif_createImg0);
  //Player images and default
  playerRight1 = loadImage("assets/images/rightman.png");
  playerLeft1 = loadImage("assets/images/leftman.png");
  playerImage = playerRight1;
  //Background
  backgroundImage = loadImage("assets/images/newbackground.png");
  //Special font
  pixelFont = loadFont("assets/fonts/vt323.ttf");
  //Menu + endscreen
  menuImage1 = loadImage("assets/images/newmenu1.png");
  menuImage2 = loadImage("assets/images/newmenu2.png");
  menuImageArray.push(menuImage1);
  menuImageArray.push(menuImage2);
  endscreenImage = loadImage("assets/images/endscreen.png");

  // Planet1
  for (let i = 1; i <= 16; i++) {
    let planet1path = "assets/images/saturn/saturn" + i + ".png";
    let planet1image = loadImage(planet1path);
    planet1Array.push(planet1image);
  }
  //Planet 2
  for (let i = 1; i <= 11; i++) {
    let planet2Path = "assets/images/eyeball/eyeball" + i + ".png";
    let planet2Image = loadImage(planet2Path);
    planet2Array.push(planet2Image);
  }
  //Planet 3
  for (let i = 1; i <= 13; i++) {
    let planet3path = "assets/images/many/many" + i + ".png";
    let planet3Image = loadImage(planet3path);
    planet3Array.push(planet3Image);
  }
  //Flamingo 'planet'
  for (let i = 0; i <= 9; i++) {
    let flamingoPath = "assets/images/flamingo/flamingotop" + i + ".png";
    let flamingoImage = loadImage(flamingoPath);
    flamingoArray.push(flamingoImage);
  }
  // Little floating men
  for (let i = 1; i <= 7; i++) {
    let menPath = "assets/images/men/men" + i + ".png";
    let menImage = loadImage(menPath);
    menArray.push(menImage);
  }
  // planet2Image = loadImage("assets/images/eyeball/eyeball.png");

  //Other images
  planet3Image = loadImage("assets/images/eyeball/eyeball.png");
  dogImage = loadImage("assets/images/littledog.png");
  menImage = loadImage("assets/images/dudes.png");
  flamingoImage = loadImage("assets/images/flamingo.png");
  flamingoTopImage = loadImage("assets/images/flamingotop.png");
  flamingoMidImage = loadImage("assets/images/flamingomedium.png");
  subFlamingoImageLeft = loadImage("assets/images/subflamingoleft.png");
  subFlamingoImageRight = loadImage("assets/images/subflamingoright.png");

  //Other sounds
  backgroundSound = loadSound("assets/sounds/shortAmbiance.wav");
  eatSound = loadSound("assets/sounds/applecrunch.wav");
  walkSound = loadSound("assets/sounds/deepbass.wav");
  textSound = loadSound("assets/sounds/electrobass.wav");
  tropicalSound = loadSound("assets/sounds/tropical.wav");
  messageSound = loadSound("assets/sounds/shortelectronic.wav");
}

//setup
//
// Make canvas, create game objects
function setup() {
  //Create canvas
  createCanvas(1300, 750);
  callClassObjects();
  //Set star class object's image offscreen so it won't be constantly visible.
  starGif_createImg0.position(-500, -500);
  //Set tropical sound (appears in latter half of game) to certain volume / loop
  tropicalSound.loop();
  tropicalSound.amp(0);
}

//draw
//
// Loads all functions that need to be called every frame
// Consider what needs to be displayed according to whether the game has started/ended or not
function draw() {

  // If game hasn't started, display menu, which the player can cycle through (through an array) with mousePressed()
  if (gameState == 0) {
    currentMenuImage = menuImageArray[menuArrayIndex];
    image(currentMenuImage, 0, 0, 1300, 750);
  }
  //If game has started, call all game related methods and elements
  if (gameState == 1) {
    // Set backgroundImage
    background(backgroundImage);
    // Set display properties of onscreen text
    fill(255);
    textSize(15);
    fill(255);
    textAlign(LEFT, CENTER);
    textFont(pixelFont);
    text(textSpeech, 50, 650);
    // Call player related methods
    handleInput();
    move();
    displayPlayer();
    // Check which part of the game the player is in  (landstates 0-8) and call functions that display related elements accordingly
    if (landState === 0) {
      landState0Display();
    }
    if (landState === 1) {
      landState1Display();
    }
    if (landState === 2) {
      landState2Display();
    }
    if (landState == 3) {
      landState3Display();
    }
    if (landState == 4) {
      landState4Display();
    }
    if (landState == 5) {
      landState5Display();
    }
    if (landState == 6) {
      landState6Display();
    }
    if (landState == 7) {
      landState7Display();
    }
    if (landState == 8) {
      landState8Display();
    }
    //Call function that navigate through the landStates
    movePlayerThroughLandscape();

    // Arrays to call class functions for planets, star, characters, flamingo, subflamingo objects
    for (let i = 0; i < planetsArray.length; i++) {
      planetsArray[i].checkDistance(playerX, playerY, playerWidth);
      planetsArray[i].draw(landState, flamingoObject); // move boolean to main script, classes can't communicate booleans
      starObject.checkDistance(planetsArray[i]); // does this make sense??
    }
    for (let i = 0; i < charactersArray.length; i++) {
      charactersArray[i].move();
      charactersArray[i].draw(landState);
      charactersArray[i].handleWrapping();
      charactersArray[i].checkDistance(playerX, playerY, playerWidth);
      charactersArray[i].checkTextSpeech(playerX, playerY, playerWidth, textSpeech);
    }
    for (let i = 0; i < subflamingoArray.length; i++) {
      subflamingoArray[i].move(playerX, playerY);
      subflamingoArray[i].handleWrapping();
      subflamingoArray[i].draw(landState, flamingoObject);
    }
    starObject.draw();
    flamingoObject.draw(landState);
    flamingoObject.checkDistance(playerX, playerY, playerWidth);

    //Display dog if the condition is correct
    if (secondDogAppear == true) {
      image(dogImage, random(playerX - 60, playerX - 80), random(playerY + 60, playerY + 70));
    }
    // End game if enter key is pressed
    if (keyIsDown(ENTER)) {
      console.log("pressed");
      gameState = 2;
    }
  }
  // If game is over display end screen
  if (gameState == 2) {
    image(endscreenImage, 0, 0, 1300, 750);
  }
}
// handleInput
//
// Handle keyboard input from player and display corresponding images
function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
    playerImage = playerLeft1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
    playerImage = playerRight1;
  } else {
    playerVX = 0;
  }
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
    if (playerImage == playerLeft1) {
      playerImage = playerLeft1;
    } else {
      playerImage = playerRight1;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;

    if (playerImage == playerLeft1) {
      playerImage = playerLeft1;
    } else {
      playerImage = playerRight1;
    }
  } else {
    playerVY = 0;
  }
}
// move
//
// Move player according to velocity.
function move() {
  // console.log(landState, playerX, playerY);
  playerX += playerVX;
  playerY += playerVY;
  // If the player has velocity, play a sound
  if (playerVX > 0 || playerVY > 0) {
    walkSound.play();
  }
  // Declare variable that saves player location, push into an array.
  // This is used later in displayPlayer() to display a player trail
  let vector = createVector(playerX, playerY);
  history.unshift(vector);
  // If the array in question has over a certain quantity of items, start removing them so the trail disappears gradually
  if (history.length > 70) {
    history.pop(); // not: the alternative is push() and shift () but that means losing the oscillation
  }
}
//movePlayerThroughLandscape
//
//Check if player is in screen space. If they are not, move them to according next/previous screen space
function movePlayerThroughLandscape() {
  if (landState === 0) {
    constrain(playerY, 0, height);
    if (playerX >= width) {
      landState = 1;
      // Setting coordinates to make it easier to see where player is
      playerX = 25;
      playerY = 7300;
    } else if (playerX < 0) {
      landState = 5;
      playerX = 1300;
      playerY = 700;
    }
  }
  if (landState === 1) {
    if (playerX >= width) {
      landState = 2;
      playerX = 25;
      playerY = 700;
    } else if (playerX < 0) {
      landState = 0;
      playerX = 1300;
      playerY = 700;
    }
  }
  if (landState === 2) {
    if (playerX >= width) {
      landState = 3;
      playerX = 25;
      playerY = 700;
    } else if (playerX < 0) {
      landState = 1;
      playerX = 1300;
      playerY = 700;
    }
  }
  if (landState === 3) {
    if (playerX >= width) {
      landState = 4;
      playerX = 25;
      playerY = 700;
    } else if (playerX < 0) {
      landState = 2;
      playerX = 1300;
      playerY = 700;
    }
  }
  if (landState === 4) {
    if (playerX >= width) {
      landState = 5;
      playerX = 25;
      playerY = 700;
    } else if (playerX < 0) {
      landState = 3;
      playerX = 1300;
      playerY = 700;
    }
  }
  if (landState === 5) {
    if (playerY >= width) {
      landState = 0;
      playerX = 500;
      playerY = 700;
    } else if (playerX < 0) {
      landState = 4;
      playerX = 500;
      playerY = 700;
    }
    if (playerY < 0) {
      landState = 6;
      playerX = 500;
      playerY = 700;
    }
  }
  if (landState === 6) {
    if (playerY >= height) {
      landState = 5;
      playerX = 500;
      playerY = 20;
    } else if (playerY < 0) {
      landState = 7;
      playerX = 500;
      playerY = 700;
    }
  }
  if (landState === 7) {
    if (playerY >= height) {
      landState = 6;
      playerX = 500;
      playerY = 20;
    } else if (playerY < 0) {
      landState = 8;
      playerX = 300;
      playerY = 700;
    }
  }
  if (landState === 8) {
    if (playerY >= height) {
      landState = 7;
      playerX = 500;
      playerY = 700;
    }

  }
  //Some landStates are limited horizontally, some vertically
  if (landState === 0 || landState == 1 || landState == 2 || landState == 3 || landState == 4) {
    playerY = constrain(playerY, 0, height - 100);
  }
  if (landState == 6 || landState == 7 || landState == 8) {
    playerX = constrain(playerX, 0, width - 75);
    if (landState == 8) {
      playerY = constrain(playerY, -70, height);
    }
  }
}
//landState0Display
//
//This displays game objects in the first landstate that arent loaded through Planet class
function landState0Display() {}

//landState1Display
//
//This displays game objects in the second landstate that arent loaded through Planet class
function landState1Display() {
  //Set dog coordinate
  dogX = 1000;
  dogY = 500;
  // Dog is present if this condition, which is true by default, is true. ie. Dog is present
  if (firstDogAppear === true) {
    image(dogImage, dogX, dogY);
  }
  // Check player to dog
  checkDistanceDog();
}

//landState2Display
//
//This displays game objects in the third landstate that arent loaded through Planet class
function landState2Display() {}
//Display 4th landstate
function landState3Display() {

}
//Display 5th landstate
function landState4Display() {

}
//Display 6th landstate
function landState5Display() {
  //Map volume increase to player's vertical movement
  let volume = map(playerY, height, 0, 0, 1);
  volume = constrain(volume, 0, 0.3);
  tropicalSound.amp(volume);
  //Display flamingo legs
  image(flamingoMidImage, 500, 0, flamingoMidImage.width, flamingoMidImage.height);
}
//Display 7th landstate
function landState6Display() {

  //Map volume increase to player's vertical movement
  let volume1 = map(playerY, height, 0, 0, 1);
  volume1 = constrain(volume1, 0.3, 0.6);
  tropicalSound.amp(volume1);
  //Display flamingo legs
  image(flamingoMidImage, 500, 0, flamingoMidImage.width, flamingoMidImage.height);
}

function landState7Display() {

  //Map volume increase to player's vertical movement
  let volume2 = map(playerY, height, 0, 0, 1);
  volume2 = constrain(volume2, 0.6, 0.9);
  tropicalSound.amp(volume2);
  //Display flamingo legs
  image(flamingoMidImage, 500, 0, flamingoMidImage.width, flamingoMidImage.height);
}

function landState8Display() {
  //Display sound at its maximum
  tropicalSound.amp(1);
}
//callClassObjects
//
//Create planet objects using constructor of Planet class and push them into an array
function callClassObjects() {

  let planetObject1 = new Planet(850, 50, planet2Array, 0, eatSound);
  let planetObject2 = new Planet(850, 50, planet1Array, 1, eatSound);
  let planetObject4 = new Planet(500, 200, planet3Array, 3, eatSound);
  let planetObject5 = new Planet(600, 200, planet3Array, 3, eatSound);
  let planetObject6 = new Planet(600, 200, planet2Array, 4, eatSound);
  let planetObject7 = new Planet(400, 500, planet2Array, 4, eatSound);
  planetsArray.push(planetObject1);
  planetsArray.push(planetObject2);
  planetsArray.push(planetObject4);
  planetsArray.push(planetObject5);
  planetsArray.push(planetObject6);
  planetsArray.push(planetObject7);

  flamingoObject = new Flamingo(300, 100, flamingoArray, 8, eatSound);

  characterObject1 = new Character(200, 300, menArray, 0, messageSound, 1, "i have a family");
  characterObject2 = new Character(300, 300, menArray, 0, messageSound, 2, "I ALSO HAVE A FAMILY");
  characterObject3 = new Character(350, 300, menArray, 0, messageSound, 0.2, "NONONON");
  characterObject4 = new Character(350, 300, menArray, 0, messageSound, 0.2, "NONONONONONONOONO");
  characterObject5 = new Character(600, 350, menArray, 2, messageSound, 0.2, "do you have a family");
  characterObject6 = new Character(750, 300, menArray, 2, messageSound, 0.2, "do you have a family?");
  characterObject7 = new Character(760, 305, menArray, 2, messageSound, 0.2, "have pity?");
  characterObject8 = new Character(700, 350, menArray, 2, messageSound, 0.3, "sweet prince good night");
  characterObject9 = new Character(650, 320, menArray, 2, messageSound, 0.2, "good night swee prince");
  characterObject10 = new Character(620, 310, menArray, 2, messageSound, 0.2, "nooooooo");

  charactersArray.push(characterObject1);
  charactersArray.push(characterObject2);
  charactersArray.push(characterObject3);
  charactersArray.push(characterObject4);
  charactersArray.push(characterObject5);
  charactersArray.push(characterObject6);
  charactersArray.push(characterObject7);
  charactersArray.push(characterObject8);
  charactersArray.push(characterObject9);
  charactersArray.push(characterObject10);

  subflamingoObject1 = new Subflamingo(300, 300, subFlamingoImageLeft, 5, 1);
  subflamingoObject2 = new Subflamingo(400, 230, subFlamingoImageLeft, 5, 1);
  subflamingoObject3 = new Subflamingo(500, 450, subFlamingoImageLeft, 5, 1);
  subflamingoObject4 = new Subflamingo(600, 350, subFlamingoImageRight, 5, 4);
  subflamingoObject5 = new Subflamingo(700, 320, subFlamingoImageRight, 5, 4);
  subflamingoObject6 = new Subflamingo(300, 300, subFlamingoImageLeft, 5, 4);
  subflamingoObject7 = new Subflamingo(400, 230, subFlamingoImageLeft, 6, 4);
  subflamingoObject8 = new Subflamingo(500, 450, subFlamingoImageLeft, 6, 4);
  subflamingoObject9 = new Subflamingo(600, 350, subFlamingoImageRight, 6, 4);
  subflamingoObject10 = new Subflamingo(700, 320, subFlamingoImageRight, 6, 4);
  subflamingoObject11 = new Subflamingo(300, 300, subFlamingoImageLeft, 6, 4);
  subflamingoObject12 = new Subflamingo(400, 230, subFlamingoImageLeft, 6, 4);
  subflamingoObject13 = new Subflamingo(500, 450, subFlamingoImageLeft, 7, 4);
  subflamingoObject14 = new Subflamingo(600, 350, subFlamingoImageRight, 6, 4);
  subflamingoObject15 = new Subflamingo(700, 320, subFlamingoImageRight, 7, 4);
  subflamingoObject16 = new Subflamingo(300, 300, subFlamingoImageLeft, 6, 4);
  subflamingoObject17 = new Subflamingo(400, 230, subFlamingoImageLeft, 7, 4);
  subflamingoObject18 = new Subflamingo(500, 450, subFlamingoImageLeft, 7, 4);
  subflamingoObject19 = new Subflamingo(600, 350, subFlamingoImageRight, 7, 4);
  subflamingoObject20 = new Subflamingo(700, 320, subFlamingoImageRight, 7, 4);
  subflamingoArray.push(subflamingoObject1);
  subflamingoArray.push(subflamingoObject2);
  subflamingoArray.push(subflamingoObject3);
  subflamingoArray.push(subflamingoObject4);
  subflamingoArray.push(subflamingoObject5);
  subflamingoArray.push(subflamingoObject6);
  subflamingoArray.push(subflamingoObject7);
  subflamingoArray.push(subflamingoObject8);
  subflamingoArray.push(subflamingoObject9);
  subflamingoArray.push(subflamingoObject10);
  subflamingoArray.push(subflamingoObject11);
  subflamingoArray.push(subflamingoObject12);
  subflamingoArray.push(subflamingoObject13);
  subflamingoArray.push(subflamingoObject14);
  subflamingoArray.push(subflamingoObject15);

}
//displayPlayer
//
//Create oscillation formula, update every frame, display oscillating player image
function displayPlayer() {
  let growth = sin(angle) * (radius / 8);
  image(playerImage, playerX, playerY, playerWidth + growth, playerHeight);
  angle += 0.05;

  //Also, display player 'trail' by displaying images of player based on former position
  for (let i = 0; i < history.length; i++) {
    push();
    fill(255, 255, 255, 50);
    image(playerImage, history[i].x, history[i].y);
    pop();

  }
}
//checkDistanceDog
//
//Check player distance to dog and if close enough display relevant text
function checkDistanceDog() {
  let d = dist(playerX, playerY, dogX, dogY);
  if (d < playerWidth + planetWidth + 10) {
    textSpeech = "DOG: PICK ME UP! I MEAN WOOF, WOOF.";
    if (keyIsDown(SHIFT)) {
      textSpeech = "SHUT UP, DOG";
      //The first, still image of the dog disappears while the second, which is loaded in relation to the player's location, appears.
      firstDogAppear = false;
      secondDogAppear = true;
      return;
    }
  }
}
//mousePressed
//
// If the player clicks, depending on gamestate, different things can happen
function mousePressed() {
  //If game hasn't started, music starts, and clicking cycles through the menu image array
  if (gameState === 0) {
    backgroundSound.loop();
    backgroundSound.setVolume(0.1);
    menuArrayIndex += 1;
    if (menuArrayIndex >= menuImageArray.length) {
      gameState = 1;
    }
  }
  // If game has started, player can basically 'print'  a star by clicking mouse
  if (gameState === 1) {
    starObject = new Star(mouseX, mouseY);
  }
  //If game has ended, restart game so reload some values.
  if (gameState === 2) {
    menuImageIndex = 0;
    menuArrayIndex = 0;
    planet1ArrayIndex = 0;
    //Create canvas
    createCanvas(1300, 750);
    callClassObjects();
    starGif_createImg0.position(-500, -500);
    tropicalSound.loop();
    tropicalSound.amp(0);
    gameState = 0;
    landState = 0;
    textSpeech = "YOU ARE VERY, VERY hungry";
  }
}
