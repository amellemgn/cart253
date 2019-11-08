// Predator-Prey Simulation
//Amelle Margaron
//
// Creates a predator and two prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive
// Inspired by Castlevania style stufff and creative process and ideas
// Definintey some stuff that doesn't work in here, I just don't know where.
// crash.wav sound effect: https://freesound.org/people/sandyrb/sounds/95078/
// horror.wav: https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270632/
// shrillBaby: https://freesound.org/people/Robinhood76/sounds/91294/
// backgroundMusic: https://freesound.org/people/zagi2/sounds/342931/

// Our predator
let woman;
// The prey/interactable items
let bat;
let rat;
let firstAidLeft;
let firstAidRight;
let megaPrey;
// All game images
let womanImageLeft;
let womanImageLeftSword;
let womanImageRightSword;
let womanImageRight;
let batImage;
let ratImage;
let centipedeImage;
let backgroundImage0;
let backgroundImage1;
let backgroundImage2;
let backgroundImage3;
let backgroundImage4;
let backgroundImage5;
let syringeImage;
let vialImage;
let menuImage1;
let menuImage2;
let menuImage3;
let endImage1;
let endImage2;
let medicalBoxImage;
let colorImage;
let megaPreyImage;
//All game sounds
let thunderSound;
let killSound;
let backgroundMusic;
let babyCryingSound;
let babyThudSound;
let sparkleSound;
//All game arrrays + related variables for counting though arrays
let backgroundImages = [];
let currentBackgroundImage;
let backgroundImagesIndex = 0;
//Material for menu array
let menuImages = [];
let currentMenuImage;
let menuImageIndex = 0;
//Count for game progress
let babyPercentage = 0;
//Material for a prey array
let preyArray = [];
let numberOfPrey = 6;
//Material to make an array for sparkle element
let numberOfSparkle = 3;
let sparkleArray = [];
//Game state initialized to 0
let gameState = 0;
//Extra font
let pixelFont;

//preload()
//
// Calls material that needs to be loaded before setUp()
function preload() {
  //Calls function to do so
  resourceSetup();
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  //Setting canvas height and width and deliberately choosing to sacrifice canvas responsiveness
  // because I've made my assets with fixed height/width.
  createCanvas(960, 540);
  // Set some nice background music
  backgroundMusic.loop();
  //Create prey, predators, and other interactive bits
  createGameObjects();

}

//resourceSetup()
//
// Loads all linked material clearly, and fills arrays of images for further use.
function resourceSetup() {
  //Load all background images, and then push them into my background image array
  backgroundImage0 = loadImage("assets/images/Background0.png");
  backgroundImage1 = loadImage("assets/images/Background1.png");
  backgroundImage2 = loadImage("assets/images/Background2.png");
  backgroundImage3 = loadImage("assets/images/Background3.png");
  backgroundImage4 = loadImage("assets/images/Background4.png");
  backgroundImage5 = loadImage("assets/images/Background5.png");
  backgroundImages.push(backgroundImage0);
  backgroundImages.push(backgroundImage1);
  backgroundImages.push(backgroundImage2);
  backgroundImages.push(backgroundImage3);
  backgroundImages.push(backgroundImage4);
  backgroundImages.push(backgroundImage5);
  //Set initial game background
  currentBackgroundImage = backgroundImage0;
  //Load player images
  womanImageLeft = loadImage("assets/images/womanleft.png");
  womanImageLeftSword = loadImage("assets/images/womankilleft.png");
  womanImageRightSword = loadImage("assets/images/womankillright.png");
  womanImageRight = loadImage("assets/images/womanright.png");
  //Load menu images
  menuImage1 = loadImage("assets/images/newmenu1.png");
  menuImage2 = loadImage("assets/images/menu2.png");
  menuImage3 = loadImage("assets/images/menu3.png");
  endImage1 = loadImage("assets/images/newnewgoodend.png");
  endImage2 = loadImage("assets/images/newbadend.png");
  //Push menu images into a menu array
  menuImages.push(menuImage1);
  menuImages.push(menuImage2);
  menuImages.push(menuImage3);
  // Set initial menu array value
  currentMenuImage = menuImage1;
  //Load other game images
  batImage = loadImage("assets/images/bat.png");
  ratImage = loadImage("assets/images/rat1.png");
  centipedeImage = loadImage("assets/images/centipede.png");
  colorImage = loadImage("assets/images/cutesyringe.png");
  medicalBoxImage = loadImage("assets/images/centipede.png");
  megaPreyImage = loadImage("assets/images/megaPrey.png");
  //Load sounds
  killSound = loadSound("assets/sounds/evisceratedFruit.wav");
  babyThudSound = loadSound("assets/sounds/horror.wav");
  babyCryingSound = loadSound("assets/sounds/shrillBaby.wav");
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.mp3");
  sparkleSound = loadSound("assets/sounds/chime.wav");
  //Load fonts
  pixelFont = loadFont("assets/fonts/vt323.regular.ttf");
}

//createGameObjects()
//
// Calls in object classes to create game objects
function createGameObjects() {
  //Create Predator by calling class constructor
  woman = new Predator(100, 390, 5, womanImageLeft, womanImageLeftSword, womanImageRight, womanImageRightSword, killSound);
  //Create two First Aid (give player health ) elements by calling their class constructors
  firstAidLeft = new FirstAid(50, 200, 3, medicalBoxImage);
  firstAidRight = new FirstAid(490, 200, 3, medicalBoxImage);
  //Create basic prey using a loop to generate them randomly and then push them into an array.
  //Loop is based on set amounts of prey we want to see.
  for (let i = 0; i < numberOfPrey; i++) {
    let r = random(0, 1);
    if (r > 0.5) {
      bat = new Bat(100, 540, 10, batImage);
      preyArray.push(bat);
    } else {
      rat = new Rat(100, 540, 7, ratImage);
      preyArray.push(rat);
    }
  }
  // Create loop to generate sparkle objects and push them into an array
  for (let i = 0; i < numberOfSparkle; i++) {
    sparkle = new Color(340, 250, 20, colorImage, sparkleSound);
    sparkleArray.push(sparkle);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // If the game has not yet started, display menu.
  //Depending on mousePressed(), users can click through the menu array to display different slides
  if (gameState == 0) {
    let menuImage = menuImages[menuImageIndex];
    //Display image
    image(menuImage, 0, 0, 960, 540);
  }
  //If the game has started, display a background and handle game object input, movement, display, etc.
  // Basically, handle all game object creation and information.
  if (gameState == 1) {
    // Clear the background to black
    background(currentBackgroundImage);
    // Handle input, move, display for the player character
    woman.handleInput();
    woman.move();
    woman.display();
    //Handle input, move, display for the player character
    firstAidLeft.move();
    firstAidRight.move();
    firstAidLeft.display();
    firstAidRight.display();
    woman.handleHealing(firstAidLeft);
    woman.handleHealing(firstAidRight);
    bat.handleMerging(firstAidLeft);
    bat.handleMerging(firstAidRight);

    // Feed array through loop to move, display, and handle eating all basic prey elements
    for (let i = 0; i < preyArray.length; i++) {
      preyArray[i].move();
      preyArray[i].display();
      woman.handleEating(preyArray[i]);
    }
    // Feed array through loop to move, display, and handle eating all sparkle elements
    for (let i = 0; i < sparkleArray.length; i++) {
      sparkleArray[i].move();
      sparkleArray[i].display();
      woman.handleColorChange(sparkleArray[i]);
    }

    //Check if bat and firstAid classes have touched, and if so create a new, unseen 'MegaPrey' class object
    checkMegaPrey();
    //Check whether the game has to end, depending on whether the player is alive and the amount of prey killed
    checkKillRateDeathRate();
  }

//If the game has ended, display end title cards.
  if (gameState == 2) {
// Remove any tint that has appeared during game
    noTint();
//If the player has killed enough prey, display a certain image anouncing their victory.
    if (woman.preyKilled > 99) {
      image(endImage1, 0, 0, width, height);
//If the player has not killed enough prey,  the image explains that they've failed and displays their number of kills and the game progress in %
    } else {
      image(endImage2, 0, 0, width, height);
      push();
      textFont(pixelFont);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text("You completed " + babyPercentage + "% of your baby. \n " + "You killed " + woman.preyKilled + " demons.", width / 2, height / 2);
      pop();
    }
  }
}

//checkMegaPrey()
//
// This checks a condition from the Bat class that verifies whether a Bat object and a FirstAid object have overlapped.
//If so, a new prey object  from the MegaPrey class is created.
function checkMegaPrey() {
  //Check condition.
  if (bat.createMegaPrey === true) {
    //Create new object.
    megaPrey = new MegaPrey(100, 300, 2, megaPreyImage);
    //Handle new objects' movement and data.
    megaPrey.move();
    megaPrey.display();
    woman.handleEating(megaPrey);
    //bat.createMegaPrey = false;
  }
}
//checkKillRateDeathRate()
//
// Checks a condition from the Predator class that verifies whether the player has killed a prey or not. If yes,
// this function checks against the required number of prey deaths (100, or 20/change of background) whether background
// and associated variables need to be updated.
//
// This function also checks whether the game is over by monitoring whether the player is alive and under the max number of prey kills.
function checkKillRateDeathRate(){
  // If the player has killed a prey
  if (woman.preyDeath == true) {
    //If the number of this kill is a multiple of 20, and isn't 0
    if (woman.preyKilled % 20 == 0 && woman.preyKilled != 0) {
    // Change background to show progress
      updateBackground();
    //This variable keeps track of this progress
      babyPercentage += 20;
    }
    //Reset condition
    woman.preyDeath = false;
  }
  // If the .isDead() function has been activated or the player has killed enough prey, end game
  if (woman.isDead() || woman.preyKilled > 99) {
    gameState = 2;
  }
}

//updateBackground
//
//This function updates the background to show game progress. As the player kills more prey, the summoning/birth ritual progresses
// and the baby wakes up (in 20 prey death increments).
function updateBackground() {
  //Increment the index of the background image array (so we can show the next image)
  backgroundImagesIndex += 1;
  // Select/ 'affirm'/confirm the background image from the array that we want to display. Don't know what the right term is, but in any case, this is the
  // value we'll feed to background() in draw() to set the background.
  currentBackgroundImage = backgroundImages[backgroundImagesIndex];
  //Play some cool sounds, because ambiance is near and dear to my heart and if nothing else in this game works these dumb sounds will.
  babyThudSound.play();
  babyCryingSound.play();
}

//reloadGame()
//
// Some values need to be reset when we reload the game.
function reloadGame() {
  //Reload background, array element variables, call back all our game objects (prey, predators, etc), and reset
  // our game progress
  background(currentBackgroundImage);
  currentBackgroundImage = backgroundImage0;
  currentMenuImage = menuImage1;
  createGameObjects();
  babypercentage = 0;
}

//mousePressed()
//
//Mainly used in this game to move through arrays, so menu and title screens.
function mousePressed() {
  console.log(gameState);
//If mouse is pressed while in menu state, move through array elements by increaing index of menu.
  if (gameState === 0) {
    menuImageIndex += 1;
// If we run out of menu images, time to start game.
    if (menuImageIndex >= menuImages.length) {
      gameState = 1;
    }
  }
// If mouse is pressed while in end credit state, reset variables.
  if (gameState === 2) {
    menuImageIndex = 0;
    reloadGame();
    gameState = 0;
  }
}
