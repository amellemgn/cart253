// Predator-Prey Simulation
//Amelle Margaron
//
// Creates a predator and two prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// crash.wav sound effect: https://freesound.org/people/sandyrb/sounds/95078/
// horror.wav: https://freesound.org/people/Hoerspielwerkstatt_HEF/sounds/270632/
// shrillBaby: https://freesound.org/people/Robinhood76/sounds/91294/
// backgroundMusic: https://freesound.org/people/zagi2/sounds/342931/

// Our predator
let woman;

// The three prey
let bat;
let rat;
let centipede;

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

//All game sounds
let thunderSound;
let killSound;
let backgroundMusic;
let babyCryingSound;
let babyThudSound;

//All game arrrays + related variables for counting though arrays
let backgroundImages = [];
let currentBackgroundImage;
let backgroundImagesIndex = 0;

let menuImages = [];
let currentMenuImage;
let menuImageIndex = 0;

let menuImage1;
let menuImage2;
let menuImage3;
let endImage1;
let endImage2;

let gameState = 0;

preyArray = [];
let numberOfPrey = 10;

let sparkle;

let sparkle2;

let sparkle3;

let sparkle4;
let colorImage;

let firstAid;
let medicalBoxImage;

let sparkleSound;

let babyPercentage = 0;
//Extra fonts
let pixelFont;

let megaPrey;


function preload() {
  //Calls function that sets up linked resources
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

  // Set some nice background backgroundMusic
  backgroundMusic.loop();
  //Create Prey and Predators
  createGameObjects();

}

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

  currentBackgroundImage = backgroundImage0;


  //Load other images
  womanImageLeft = loadImage("assets/images/womanleft.png");
  womanImageLeftSword = loadImage("assets/images/womankilleft.png");
  womanImageRightSword = loadImage("assets/images/womankillright.png");
  womanImageRight = loadImage("assets/images/womanright.png");

  menuImage1 = loadImage("assets/images/newmenu1.png");
  menuImage2 = loadImage("assets/images/menu2.png");
  menuImage3 = loadImage("assets/images/menu3.png");
  endImage1 = loadImage("assets/images/newnewgoodend.png");
  endImage2 = loadImage("assets/images/newbadend.png");

  // Load menu images and push them into my menu image array
  menuImages.push(menuImage1);
  menuImages.push(menuImage2);
  menuImages.push(menuImage3);

  currentMenuImage = menuImage1;

  batImage = loadImage("assets/images/bat.png");
  ratImage = loadImage("assets/images/rat1.png");
  centipedeImage = loadImage("assets/images/centipede.png");
  colorImage = loadImage("assets/images/cutesyringe.png");
  medicalBoxImage = loadImage("assets/images/centipede.png");

  //Load sounds
  killSound = loadSound("assets/sounds/evisceratedFruit.wav");
  babyThudSound = loadSound("assets/sounds/horror.wav");
  babyCryingSound = loadSound("assets/sounds/shrillBaby.wav");
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.mp3");
  sparkleSound = loadSound("assets/sounds/chime.wav");

  //Load fonts
  pixelFont = loadFont("assets/fonts/vt323.regular.ttf");
}

function createGameObjects() {

  //Create Predator and non-killable prey by calling constructors
  woman = new Predator(100, 390, 5, womanImageLeft, womanImageLeftSword, womanImageRight, womanImageRightSword, killSound);
  sparkle = new Color(340, 250, 20, colorImage, sparkleSound);
  firstAid = new FirstAid(100, 200, 6, medicalBoxImage);

  //Create killable Prey using a loop to generate randomly based on set values and prey amounts
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
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // If the game has not yet started
  if (gameState == 0) {
    let menuImage = menuImages[menuImageIndex];
    //console.log(menuImage);
    image(menuImage, 0, 0, 960, 540);
  }
  if (gameState == 1) {
    // Clear the background to black
    background(currentBackgroundImage);

    // Handle input for the woman
    woman.handleInput();

    // Move all the "animals"
    woman.move();
    sparkle.move();
    firstAid.move();
    //  bat.move();
    //  rat.move();
    //centipede.move();

    // Handle the woman eating any of the prey
    //  woman.handleEating(bat);
    //  woman.handleEating(rat);


    // Display all the "animals"
    woman.display();
    sparkle.display();
    firstAid.display();
    //  bat.display();
    //  rat.display();


    woman.handleColorChange(sparkle);
    woman.handleHealing(firstAid);

    bat.handleMerging(firstAid);

    //  Move, display, and handle eating for all prey part of the 'prey' array

    for (let i = 0; i < preyArray.length; i++) {
      preyArray[i].move();
      preyArray[i].display();
      woman.handleEating(preyArray[i]);
    }
    if (bat.createMegaPrey == true){
      megaPrey = new MegaPrey(100, 200, 10, 300);
      console.log("megaprey created");
      megaPrey.move();
      megaPrey.display();
      woman.handleEating(megaPrey);
      //bat.createMegaPrey = false;
    }

    if (woman.preyDeath == true) {
      if (woman.preyKilled % 20 == 0 && woman.preyKilled != 0) { //Change background
        updateBackground();
        babyPercentage += 20;
      }
      woman.preyDeath = false;
    }
    if (woman.isDead()|| woman.preyKilled > 99) {
      gameState = 2;
    }
  }

  if (gameState == 2) {
      noTint();
    if (woman.preyKilled > 99) {
      image(endImage1, 0, 0, width, height);

    } else {
      image(endImage2, 0, 0, width, height);
      push();
      textFont(pixelFont);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      noTint();
      text("You completed " + babyPercentage + "% of your baby. \n " + "You killed " + woman.preyKilled + " demons.", width/2, height/2);
      pop();
    }
  }
}

function updateBackground() {
  backgroundImagesIndex += 1;
  currentBackgroundImage = backgroundImages[backgroundImagesIndex];
  babyThudSound.play();
  babyCryingSound.play();
}

function reloadGame() {
  // Reload background + music
  background(currentBackgroundImage);
  currentBackgroundImage = backgroundImage0;
  currentMenuImage = menuImage1;
  createGameObjects();


}

function mousePressed() {
  console.log(gameState);
  if (gameState === 0) {
    menuImageIndex += 1;
    if (menuImageIndex >= menuImages.length) {
      gameState = 1;
    }
  }

  if (gameState === 2) {
    menuImageIndex = 0;
    reloadGame();
    gameState = 0;
  }
}
