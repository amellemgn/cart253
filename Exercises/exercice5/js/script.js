// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let ostrich;
let flamingo;

// The three prey
let man1;
let man2;
let torch;

let backgroundImage;

let beachSound;
let eatSound;
let screamSound;
//preload()
//
// loads the resources that will then be passed on through the constructor

let predatorImage1;
let predatorImage2;
let preyImage1;
let preyImage2;
let torchImage;

function preload(){
backgroundImage = loadImage("assets/images/sand.jpeg");
 predatorImage1 = loadImage("assets/images/ostrich.png");
 predatorImage2 = loadImage("assets/images/flamingo.png");

 preyImage1 = loadImage("assets/images/man1.png");
 preyImage2 = loadImage("assets/images/man2.png");
 torchImage = loadImage("assets/images/torchman.png")

 beachSound = loadSound("assets/sounds/beach.mp3");
 eatSound = loadSound("assets/sounds/eat.wav");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  beachSound.loop();
  ostrich = new Predator(width/2-width/3, height/2, 5, 10, predatorImage1, 38, 40, 37, 39, 13, eatSound);
  flamingo = new Predator (width/2+width/3, height/2, 5, 10, predatorImage2, 87, 83, 65, 68, SHIFT, eatSound);
  man1 = new Prey(100, 100, 7,20,  preyImage1);
  man2 = new Prey(100, 100, 7, 30, preyImage2);
  torch = new Prey(100, 100, 7, 35, torchImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to white
  background(backgroundImage);

  // Handle input for the ostrich
  ostrich.handleInput();
  flamingo.handleInput();

  // Move all the "animals"
  ostrich.move();
  flamingo.move();
  man1.move();
  man2.move();
  torch.move();

  // Handle the ostrich eating any of the prey
  ostrich.handleEating(man1);
  ostrich.handleEating(man2);
  ostrich.handleEating(torch);

  flamingo.handleEating(man1);
  flamingo.handleEating(man2);
  flamingo.handleEating(torch);

  // Display all the "animals"
  ostrich.display();
  flamingo.display();
  man1.display();
  man2.display();
  torch.display();
}
