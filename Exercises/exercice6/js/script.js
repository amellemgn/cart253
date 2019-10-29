"use strict";

// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
//Fixed: antelop to antelope
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
//Fixed: added space between function and setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  //Fixed: got rid of extra comma in tiger paranthesis
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  //Fixed: added a y coordinate to zebra
  zebra = new Prey(100, 100, 18, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  //Fixed: spelled background right
  background(0);

  // Handle input for the tiger
  // Fixed: Call tiger.handleInput
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  //Fixed: added bee.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  //Fixed: spell antelope right
  antelope.display();
  //Fixed: spell display right 
  zebra.display();
  //Fixed: spell bee right
  bee.display();
}
