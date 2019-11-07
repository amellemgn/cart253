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
  constructor(x, y, speed, facingLeftImage, facingLeftSwordImage, facingRightImage, facingRightSwordImage, killSound) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    //  this.maxHealth = radius;
    this.maxHealth = 100;// Must be AFTER defining this.maxHealth
    this.health = this.maxHealth;



    //Display properties
    this.facingLeftImage = facingLeftImage;
    this.facingLeftSwordImage = facingLeftSwordImage;
    this.facingRightImage = facingRightImage;
    this.facingRightSwordImage = facingRightSwordImage;
    //Initial diplay image
    this.predatorImage = this.facingLeftImage;

    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
    this.shiftKey = SHIFT;

    //Count properties
    //Number of prey killed (this adds a kill count that can be displayed later)
    this.preyKilled = 0;

    //Sound properties
    this.killSound = killSound;
    this.preyDeath = false;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
      this.predatorImage = this.facingLeftImage;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
      this.predatorImage = this.facingRightImage;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }

    if (keyIsDown(this.shiftKey)) {
      if (this.predatorImage == this.facingLeftImage) {
        this.predatorImage = this.facingLeftSwordImage;
      } else {
        this.predatorImage = this.facingRightSwordImage;
      }
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    //Since I created a foreground that I want my playable character to interact with, I constrained its movement
    // to the dimensions of the foreground (minus width and height of player)
    this.x += this.vx;
    this.x = constrain(this.x, 0, 940);
    this.y += this.vy;
    this.y = constrain(this.y, 350, 490);
    // Update health
    //  this.health = this.health - this.healthLossPerMove;
    //
    // Handle wrapping
  //  this.handleWrapping();
  }

  /*// handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }
*/
  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
      let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap) + some time
    // in order to give player the time to strike
    if (d < this.predatorImage.width + prey.preyImage.width + 20 /*arbitrary amount*/) {
      if(keyIsDown(this.shiftKey)){
        this.killSound.play();
        //   Increase predator health and constrain it to its possible range
        this.health = constrain(this.health, 0, this.maxHealth);

        //   Decrease prey health by the same amount
        prey.health -= 100;
        // Check if the prey died and reset it if so
        if (prey.health < 0) {
          this.preyKilled +=1;
          this.preyDeath = true;
        //  prey.effect(this);
          prey.reset();
        }
      }
    }
    if (d < this.predatorImage.width + prey.preyImage.width){ // actual player prey overlap
      this.health -= 0.1;
      this.health = constrain(this.health, 0, this.maxHealth);
    }
  }
  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleHealing(firstAid){

    let d = dist(this.x, this.y, firstAid.x, firstAid.y);
    if(d < this.predatorImage.width + firstAid.preyImage.width){
      this.health += 20;
      this.health = constrain(this.health, 0, this.maxHealth);
    
      firstAid.reset();
    }
  }
  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleColorChange(sparkle){
    let d = dist(this.x, this.y, sparkle.x, sparkle.y);
    if(d < this.predatorImage.width + sparkle.sparkleImage.width){
      tint(random(0, 200), random(0, 200), random(0, 200));
      sparkle.reset();
    }
  }

  isDead(){
    return this.health <= 0;
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a predatorImage.width the same size as its current health.
  display() {
    push();
  //  noStroke();
    //this.predatorImage.width = this.health;
    image(this.predatorImage, this.x, this.y);
    pop();
    //Display player health
   push();
   textFont(pixelFont);
   textAlign(CENTER, CENTER);
   textSize(20);
   fill(255);
   text("KILL: " + this.preyKilled, this.x + 50, this.y - 45);
   text("HEALTH: " + round(this.health) + "%", this.x + 50, this.y - 65);
   pop();

  }
}
