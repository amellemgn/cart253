/*sounds:
https://freesound.org/people/Tristan_Lohengrin/sounds/340485/
https://freesound.org/people/Jagadamba/sounds/254282/
https://freesound.org/people/HaraldDeLuca/sounds/170220/
https://freesound.org/people/reznik_Krkovicka/sounds/324277/
https://freesound.org/people/Lutana/sounds/347749/
https://freesound.org/people/gellski/sounds/288878/
https://freesound.org/people/kwahmah_02/sounds/254250
https://freesound.org/people/breo2012/sounds/269099/
https://freesound.org/people/bareform/sounds/218721/
https://freesound.org/people/metamorphmuses/sounds/38709/

https://leafla.co.vu/post/76140860039/totallytransparent-transparent-space-gif-made
https://gfycat.com/fr/quarterlyterrificannashummingbird
https://giphy.com/stickers/galaxy-space-gif-j5QUSpXVuwtr2
https://freesound.org/people/imasoundingboard/sounds/263166/
*/
//Declare game variables
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
let textBoxImage;
let testImage;
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
let playerY = 130;
let playerVX = 0;
let playerVY = 0;
let playerSpeed = 10;
let planet1;
let planet1Image;
let planet1Array = [];
let planet1ArrayIndex = 0;
let currentP1ArrayImage;
let planet2Array = [];
let planet3Array = [];
let planet1Appear = true;
let planet1Event = false;
let planet2;
let planet2Image;
let planet2Appear = true;
let planet2Event = false;
let planet3;
let planet3Image;
let planet3Appear = true;
let planet3Event = false;
//Declare game states and land states to transition between landscapes or menus/game
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

let spaceGif;
let crumbsImage;
let flamingoTopImage;
let flamingoMidImage;
let tropicalSound;
let starObject;
let flamingoObject;

let charactersArray = [];

let characterObject1;
let characterObject2;
let characterObject3;
//preload
//
//Loads linked resources.
function preload() {
  resourceSetup();
  // Call .playmode function which prevents this sound from being played until before it's playtime has elapsed
  // ie. my sound was really slowing down my project and this prevents calling my sound 5million times/minute
  walkSound.playMode('untilDone');
}
//setup
//
// Make canvas, create game objects
function setup() {
  createCanvas(1300, 750);
  callPlanets();
  starGif_createImg0.position(-500, -500);
  starGif_createImg1.position(-500, -500);
  starGif_createImg2.position(-500, -500);
  starGif_createImg3.position(-500, -500);
  starGif_createImg4.position(-500, -500);

  tropicalSound.loop();
  tropicalSound.amp(0);
}
//resourceSetup
//
// Load all linkd resources and load them into arrays if needed
// There are so many images and it is terrible and I need to figure out how to load them through the form of GIFS
function resourceSetup() {
  //  starGif_loadImg = loadImage("assets/images/starGif.gif");
  starGif_createImg0 = createImg("assets/images/star.gif");
  starGif_createImg1 = createImg("assets/images/star.gif");
  starGif_createImg2 = createImg("assets/images/star.gif");
  starGif_createImg3 = createImg("assets/images/star.gif");
  starGif_createImg4 = createImg("assets/images/star.gif");

  spaceGif = loadImage("assets/images/spacegif.gif");

  // for (let i = 0; i < 5; i++){
  //console.log("starGif_createImg"+i)
  gifArray.push(starGif_createImg0);
  gifArray.push(starGif_createImg1);
  gifArray.push(starGif_createImg2);
  gifArray.push(starGif_createImg3);
  gifArray.push(starGif_createImg4);

  //console.log(gifArray[0])
  //console.log("ok");
  //  }
  // array that holds animated gifs.... create image variables and push to array
  myGif = loadImage("assets/images/galaxygif.gif");

  playerRight1 = loadImage("assets/images/rightman.png");
  playerLeft1 = loadImage("assets/images/leftman.png");
  playerImage = playerRight1;

  backgroundImage = loadImage("assets/images/newbackground.png");

  pixelFont = loadFont("assets/fonts/vt323.ttf");

  menuImage1 = loadImage("assets/images/newmenu1.png");
  menuImage2 = loadImage("assets/images/newmenu2.png");
  menuImageArray.push(menuImage1);
  menuImageArray.push(menuImage2);

  endscreenImage = loadImage("assets/images/endscreen.png");

  let planet1Image = loadImage("assets/images/saturn/saturn1.png");
  let planet1ImageFrame2 = loadImage("assets/images/saturn/saturn2.png");
  let planet1ImageFrame3 = loadImage("assets/images/saturn/saturn3.png");
  let planet1ImageFrame4 = loadImage("assets/images/saturn/saturn4.png");
  let planet1ImageFrame5 = loadImage("assets/images/saturn/saturn5.png");
  let planet1ImageFrame6 = loadImage("assets/images/saturn/saturn6.png");
  let planet1ImageFrame7 = loadImage("assets/images/saturn/saturn7.png");
  let planet1ImageFrame8 = loadImage("assets/images/saturn/saturn8.png");
  let planet1ImageFrame9 = loadImage("assets/images/saturn/saturn9.png");
  let planet1ImageFrame10 = loadImage("assets/images/saturn/saturn10.png");
  let planet1ImageFrame11 = loadImage("assets/images/saturn/saturn11.png");
  let planet1ImageFrame12 = loadImage("assets/images/saturn/saturn12.png");
  let planet1ImageFrame13 = loadImage("assets/images/saturn/saturn13.png");
  let planet1ImageFrame14 = loadImage("assets/images/saturn/saturn14.png");
  let planet1ImageFrame15 = loadImage("assets/images/saturn/saturn15.png");
  let planet1ImageFrame16 = loadImage("assets/images/saturn/saturn16.png");
  planet1Array.push(planet1Image);
  planet1Array.push(planet1ImageFrame2);
  planet1Array.push(planet1ImageFrame3);
  planet1Array.push(planet1ImageFrame4);
  planet1Array.push(planet1ImageFrame5);
  planet1Array.push(planet1ImageFrame6);
  planet1Array.push(planet1ImageFrame7);
  planet1Array.push(planet1ImageFrame8);
  planet1Array.push(planet1ImageFrame9);
  planet1Array.push(planet1ImageFrame10);
  planet1Array.push(planet1ImageFrame11);
  planet1Array.push(planet1ImageFrame12);
  planet1Array.push(planet1ImageFrame13);
  planet1Array.push(planet1ImageFrame14);
  planet1Array.push(planet1ImageFrame15);
  planet1Array.push(planet1ImageFrame16);
  let planet2Image1 = loadImage("assets/images/eyeball/eyeball.png");
  let planet2Image2 = loadImage("assets/images/eyeball/eyeball2.png");
  let planet2Image3 = loadImage("assets/images/eyeball/eyeball3.png");
  let planet2Image4 = loadImage("assets/images/eyeball/eyeball4.png");
  let planet2Image5 = loadImage("assets/images/eyeball/eyeball5.png");
  let planet2Image8 = loadImage("assets/images/eyeball/eyeball8.png");
  let planet2Image9 = loadImage("assets/images/eyeball/eyeball9.png");
  let planet2Image10 = loadImage("assets/images/eyeball/eyeball10.png");
  let planet2Image11 = loadImage("assets/images/eyeball/eyeball11.png");
  let planet2Image12 = loadImage("assets/images/eyeball/eyeball12.png");
  let planet2Image13 = loadImage("assets/images/eyeball/eyeball13.png");
  let planet2Image14 = loadImage("assets/images/eyeball/eyeball14.png");
  let planet2Image15 = loadImage("assets/images/eyeball/eyeball15.png");
  let planet2Image16 = loadImage("assets/images/eyeball/eyeball16.png");
  let planet2Image17 = loadImage("assets/images/eyeball/eyeball17.png");
  let planet2Image18 = loadImage("assets/images/eyeball/eyeball18.png");
  planet2Array.push(planet2Image1);
  planet2Array.push(planet2Image2);
  planet2Array.push(planet2Image3);
  planet2Array.push(planet2Image4);
  planet2Array.push(planet2Image5);
  planet2Array.push(planet2Image8);
  planet2Array.push(planet2Image9);
  planet2Array.push(planet2Image10);
  planet2Array.push(planet2Image11);
  planet2Array.push(planet2Image12);
  planet2Array.push(planet2Image13);
  planet2Array.push(planet2Image14);
  planet2Array.push(planet2Image15);
  planet2Array.push(planet2Image16);
  planet2Array.push(planet2Image17);
  planet2Array.push(planet2Image18);
  let planet3Image1 = loadImage("assets/images/many/many1.png");
  let planet3Image2 = loadImage("assets/images/many/many2.png");
  let planet3Image3 = loadImage("assets/images/many/many3.png");
  let planet3Image4 = loadImage("assets/images/many/many4.png");
  let planet3Image5 = loadImage("assets/images/many/many5.png");
  let planet3Image6 = loadImage("assets/images/many/many6.png");
  let planet3Image7 = loadImage("assets/images/many/many7.png");
  let planet3Image8 = loadImage("assets/images/many/many8.png");
  let planet3Image9 = loadImage("assets/images/many/many9.png");
  let planet3Image10 = loadImage("assets/images/many/many10.png");
  let planet3Image11 = loadImage("assets/images/many/many11.png");
  let planet3Image12 = loadImage("assets/images/many/many12.png");
  let planet3Image13 = loadImage("assets/images/many/many13.png");
  planet3Array.push(planet3Image1);
  planet3Array.push(planet3Image2);
  planet3Array.push(planet3Image3);
  planet3Array.push(planet3Image4);
  planet3Array.push(planet3Image5);
  planet3Array.push(planet3Image6);
  planet3Array.push(planet3Image7);
  planet3Array.push(planet3Image8);
  planet3Array.push(planet3Image9);
  planet3Array.push(planet3Image10);
  planet3Array.push(planet3Image11);
  planet3Array.push(planet3Image12);
  planet3Array.push(planet3Image13);

  planet2Image = loadImage("assets/images/eyeball/eyeball.png");
  planet3Image = loadImage("assets/images/eyeball/eyeball.png");
  dogImage = loadImage("assets/images/littledog.png");
  menImage = loadImage("assets/images/dudes.png");
  flamingoImage = loadImage("assets/images/flamingo.png");
  backgroundSound = loadSound("assets/sounds/shortAmbiance.wav");
  eatSound = loadSound("assets/sounds/applecrunch.wav");
  walkSound = loadSound("assets/sounds/applecrunch.wav");
  textSound = loadSound("assets/sounds/electrobass.wav");
  crumbs = loadImage("assets/images/crumbs.png");
  flamingoTopImage = loadImage("assets/images/flamingotop.png");
  flamingoMidImage = loadImage("assets/images/flamingomedium.png");

  tropicalSound = loadSound("assets/sounds/tropical.wav");
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

    //  imageMode(CENTER);

    //Set Gif to pause so it doesn't play on its own
    // myGif.pause();
    // imageMode(CENTER);
    // image(myGif, width / 2, height / 2);

  }
  //If game has started, create bckgroud, text box, call relevant functions which include moving player, handling player input
  if (gameState == 1) {
    background(backgroundImage);
    fill(255);
    textSize(15);
    fill(255);
    textAlign(LEFT, CENTER);
    textFont(pixelFont);
    text(textSpeech, 50, 650);
    handleInput();
    move();
    displayPlayer();
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
    movePlayerThroughLandscape();
    if (secondDogAppear == true) {
      image(dogImage, random(playerX - 60, playerX - 80), random(playerY + 60, playerY + 70));
    }

    for (let i = 0; i < planetsArray.length; i++) {
      planetsArray[i].checkDistance(playerX, playerY, playerWidth);
      planetsArray[i].draw(landState, flamingoObject);
      starObject.checkDistance(planetsArray[i]); // does this make sense??
    }
    for (let i = 0; i < charactersArray.length; i++) {
      charactersArray[i].move();
      charactersArray[i].draw(landState);
      charactersArray[i].checkDistance(playerX, playerY, playerWidth);
    }

    starObject.draw();
    flamingoObject.draw(landState);
    flamingoObject.checkDistance(playerX, playerY, playerWidth);

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
// Handle keyboard input from player
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
  playerX += playerVX;
  playerY += playerVY;
  // If the player has velocity, play a sound
  if (playerVX > 0 || playerVY > 0) {
    walkSound.play();
  }
  // declare variable that saves player location
  // create vector based on player X and Y, push into array

  let vector = createVector(playerX, playerY);
  history.unshift(vector);

  // if the history array has more than 25 items, start removing them so the trail disappears gradually
  if (history.length > 70) {
    history.pop(); // the alternative is push() and shift () but that means losing the oscillation
  }
}

//movePlayerThroughLandscape
//
//Check if player is in screen space. If they are not, move them to according next/previous screen space
function movePlayerThroughLandscape() {
  if (landState === 0) {
    if (playerX >= width) {
      landState = 1;
      // Setting coordinates to make it easier to see if this screen movement is working. may change in later prototype
      playerX = 50;
      playerY = 300;
    } else if (playerX < 0) {
      landState = 2;
      playerX = 50;
      playerY = 300;
    }
  }
  if (landState === 1) {
    if (playerX >= width) {
      landState = 2;
      playerX = 50;
      playerY = 300;
    } else if (playerX < 0) {
      landState = 0;
      playerX = 50;
      playerY = 300;
    }
  }
  if (landState === 2) {
    if (playerX >= width) {
      landState = 3;
      playerX = 50;
      playerY = 300;
    } else if (playerX < 0) {
      landState = 1;
      playerX = 50;
      playerY = 300;
    }
  }
  if (landState === 3) {
    if (playerX >= width) {
      landState = 0;
      playerX = 50;
      playerY = 300;
    } else if (playerX < 0) {
      landState = 2;
      playerX = 50;
      playerY = 300;
    }
    if (playerY < 0) {
      landState = 4;
      playerX = 50;
      playerY = 300;
    }
  }
  if (landState === 4) {
    if (playerY >= height) {
      landState = 3;
      playerX = 500;
      playerY = 20;
    }
  }
}

//landState0Display
//
//This displays game objects in the first landstate that arent loaded through Planet class
function landState0Display() {

}

//landState1Display
//
//This displays game objects in the second landstate that arent loaded through Planet class
function landState1Display() {
  //Set dog coordinate
  dogX = 300;
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
function landState2Display() {
  // Create formula for sin oscillation based on radius
  let growth2 = sin(angle) * (radius / 8);
  // Display relevant NPC images
  image(menImage, 600, 500, menWidth, 86 + growth2);
  image(menImage, 650, 450, menWidth, 86 + growth2);
  image(menImage, 550, 400, menWidth, 86 + growth2);
  // Update angle every frame to create oscillation
  angle += 0.05;
  //Check player distance to NPC and if close enough display text
  let d = dist(playerX, playerY, 550, 500);
  if (d < playerWidth + menWidth) {
    textSpeech = "SMALL CHORUS: nonononononoonononononono";
  }
}

function landState3Display() {
  let volume = map(playerY, height, 0, 0, 1); // map playerY's distance from top to a range from 5-10
  volume = constrain(volume, 0, 1); // (unnecessary but they showed this on the website)
  tropicalSound.amp(volume);
  image(flamingoMidImage, 500, 0, flamingoMidImage.width, flamingoMidImage.height);
}

function landState4Display() {
  //image(flamingoTopImage, 300, 100, flamingoTopImage.width, flamingoTopImage.height);
  tropicalSound.setVolume(5);
}
//callPlanets
//
//Create planet objects using constructor of Planet class and push them into an array
function callPlanets() {
  let planetObject1 = new Planet(850, 50, planet1Array, spaceGif, 0, eatSound, crumbsImage);
  let planetObject2 = new Planet(850, 50, planet2Array, 1, eatSound, crumbsImage);
  let planetObject3 = new Planet(1000, 50, planet3Array, 2, eatSound, crumbsImage);
  planetsArray.push(planetObject1);
  planetsArray.push(planetObject2);
  planetsArray.push(planetObject3);

  flamingoObject = new Flamingo(300, 100, planet1Array, 4, eatSound);

  characterObject1 = new Character(200, 300, planet1Array, 0, eatSound, 4);
  characterObject2 = new Character(300, 300, planet1Array, 0, eatSound, 6);
  characterObject3 = new Character(350, 300, planet1Array, 0, eatSound, 8);
  charactersArray.push(characterObject1);
  charactersArray.push(characterObject2);
  charactersArray.push(characterObject3);

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
    // image(playerImage, pos.playerX, pos.playerY, playerWidth + growth, playerHeight);
  }
}
//checkDistanceDog
//
//Check player distance to dog and if close enough display relevant text
function checkDistanceDog() {
  let d = dist(playerX, playerY, dogX, dogY);
  if (d < playerWidth + planetWidth + 10) {
    //play chime
    textSpeech = "DOG: HEY YOU! I'M SUPER BORED SO I'M GOING TO FOLLOW YOU!\n" + "DOG: I MEAN, BARK BARK, WOOF.";
    if (keyIsDown(SHIFT)) {
      textSpeech = "SHUT UP, DOG";
      //The first, still image of the dog disappears while the second, which is loaded in relation to the player's location, appears.
      firstDogAppear = false;
      secondDogAppear = true;
      return;
    }
    // This is irrelevant but i'm keeping it here for reference
    // if (keyIsDown(SHIFT)) {
    //   triggerAnimationPlanet1();
    // }
  }
}

// triggerAnimationPlanet1
//
// // trigger the animation of the planet objects by calling the function from the Planet class
// function triggerAnimationPlanet1() {
//   for (let i = 0; i < planetsArray.length; i++) {
//     planetsArray[i].triggerAnimation();
//   }
// }
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
  // If game has started, player can basically 'print'  stars by clicking mouse
  if (gameState === 1) {
    // if(gifArrayCount<4){
    //   gifArrayCount++;
    //
    // }
    // // else{
    // //     gifArrayCount=0;
    // // }
    // //all this stuff would just be 'create star object'
    // for (let i = 0; i < gifArrayCount; i++) {
    //    console.log(i)
    //     gifArray[i].position(mouseX, mouseY);
    // }

    starObject = new Star(mouseX, mouseY);
  }
  //If game has ended, restart game
  if (gameState === 2) {
    menuImageIndex = 0;
    menuArrayIndex = 0;
    planet1ArrayIndex = 0;
    gameState = 0;
  }
}
