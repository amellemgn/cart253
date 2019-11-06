// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
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

let gameOver = false;
let gameStarted = false;

//Extra fonts
let pixelFont;

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

  menuImage1 = loadImage("assets/images/menu1.png");
  menuImage2 = loadImage("assets/images/menu2.png");
  menuImage3 = loadImage("assets/images/menu3.png");
  endImage1 = loadImage("assets/images/goodend.png");
  endImage2 = loadImage("assets/images/badend.png");

  // Load menu images and push them into my menu image array
  menuImages.push(menuImage1);
  menuImages.push(menuImage2);
  menuImages.push(menuImage3);

  currentMenuImage = menuImage1;

  //Load sounds
  killSound = loadSound("assets/sounds/evisceratedFruit.wav");
  babyThudSound = loadSound("assets/sounds/horror.wav");
  babyCryingSound = loadSound("assets/sounds/shrillBaby.wav");
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.wav");

  //Load fonts
  pixelFont = loadFont("assets/fonts/vt323.regular.ttf");
}

function createGameObjects() {

  //Create Prey and Predators by calling constructors
  woman = new Predator(100, 390, 5, womanImageLeft, womanImageLeftSword, womanImageRight, womanImageRightSword, killSound);
  bat = new Prey(100, 540, 10, color(255, 100, 10), 50);
  rat = new Prey(100, 540, 8, color(255, 255, 255), 60);
  centipede = new Prey(100, 540, 20, color(255, 255, 0), 10);

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (gameStarted == false)

  if (gameOver == true || currentMenuImage < menuImageIndex && gameStarted == false) {
    let menuImage = menuImages[currentMenuImage];
    image(menuImage, 0,0, width, height);
  }

  else  if (){
    // Clear the background to black
    background(currentBackgroundImage);

    // Handle input for the woman
    woman.handleInput();

    // Move all the "animals"
    woman.move();
    bat.move();
    rat.move();
    centipede.move();

    // Handle the woman eating any of the prey
    woman.handleEating(bat);
    woman.handleEating(rat);
    woman.handleEating(centipede);

    // Display all the "animals"
    woman.display();
    bat.display();
    rat.display();
    centipede.display();

    if (woman.isDead){
      gameOver = true;
    }

    if (woman.preyDeath == true) {
      if (woman.preyKilled % 5 == 0 && woman.preyKilled != 0) { //Change background
        updateBackground();
      }
      woman.preyDeath = false;
    }
  }
}

function updateBackground() {
  backgroundImagesIndex += 1;
  currentBackgroundImage = backgroundImages[backgroundImagesIndex];
  babyThudSound.play();
  babyCryingSound.play();
}

function reloadGame(){
// Reload background + music
  background(currentBackgroundImage);
  backgroundMusic.loop();
}

function mousePressed(){
  currentMenuImage +=1;
  if (currentMenuImage >= menuImageIndex){
    gameOver = false;
    gameStarted = true;
  }
}
