// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, predatorImage, upKey, downKey, leftKey, rightKey, sprintKey, eatSound, screamSound) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.originalSpeed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.01;
    this.healthGainPerEat = 0.4;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;
    //Image of predator
    this.predatorImage = predatorImage;
    // Number of prey eaten
    this.preyEaten = 0;
    //Particular sounds attached to predator
    this.eatSound = eatSound;
    this.screamSound = screamSound;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    if(keyIsDown(this.sprintKey)){
      this.speed += 3;
    }
    else{
      this.speed = this.originalSpeed;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      console.log("got a prey");
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so. Also, in that case increase the prey eaten count, play a sound
      if (prey.health < 0) {
        console.log("ate one enemy");
        this.preyEaten +=1;
        this.eatSound.play();
        prey.reset();
      }
      //However if the predator eats a torch prey, they 'die' as their health goes to zero. An especially annoying sound plays.
      // Normally, this would end the game and so forth, but I've managed to mess that up somewhere along the way so I removed that bit from the game.
      if(prey.preyImage == torchImage){
        this.screamSound.play();
        this.health = 0;
      }
    }
  }
  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  //Display the number of prey eaten by each predator as it moves around onscreen. 
  display() {
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0.01, this.maxHealth);
    push();
    noStroke();
    this.radius = this.health;
    image(this.predatorImage,this.x, this.y, this.radius * 2);
    pop();
    push();
    textAlign(CENTER, CENTER);
    textSize(19);
    fill(255);
    text(this.preyEaten, this.x, this.y-height/20);
    pop();
  }
}
