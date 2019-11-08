// Predator
//
// A class that represents the player character. This character can interact with
// other game objects, and is controlled by arrow keys.
// The character is overpowered because I suck at games and asking me to playtest without button mashing is ridiculous.
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
    this.maxHealth = 100;
    this.health = this.maxHealth;
    //Display properties
    // The character requires different images for different actions and directions its facing in.
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
    //Condition verifying whether prey has been killed.
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
    // If the player holds down the shift key, they attack the prey. We're representing
    // this with a change of image where the player holds a sword
    if (keyIsDown(this.shiftKey)) {
      // If the player was facing left so will their new pose
      if (this.predatorImage == this.facingLeftImage) {
        this.predatorImage = this.facingLeftSwordImage;
        // or otherwise they're facing right.
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
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, kills prey  and increases
  // the predator's kill count. If the prey dies, it gets reset.
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
        //   Kill prey by removing exorbitant amount of health
        prey.health -= 100;
        // Check if the prey died and reset it if so, increment prey death count, verify prey has been killed.
        if (prey.health < 0) {
          this.preyKilled +=1;
          this.preyDeath = true;
        //  prey.effect(this);
          prey.reset();
        }
      }
    }
    // However, if there is an actual overlap between player and prey, that means prey has gotten past
    //player defenses. Removes health from player until player can kill it
    if (d < this.predatorImage.width + prey.preyImage.width){ // actual player prey overlap
      this.health -= 0.1;
      this.health = constrain(this.health, 0, this.maxHealth);
    }
  }
  // handleHealing
  //
  // Takes a firstAid object as an argument and checks if the predator
  // overlaps it. If so, increases prey's health. If there's overlap, it gets reset.
  handleHealing(firstAid){
    // Measure distance.
    let d = dist(this.x, this.y, firstAid.x, firstAid.y);
    //Overlap? Add health in reason
    if(d < this.predatorImage.width + firstAid.preyImage.width){
      this.health += 20;
      this.health = constrain(this.health, 0, this.maxHealth);
    // Reset to different part of screen.
      firstAid.reset();
    }
  }
  // handleColorChange
  //
  // Takes a Color class object as an argument and checks if the predator
  // overlaps it. If so, tints the screen a random color.
  handleColorChange(sparkle){
    let d = dist(this.x, this.y, sparkle.x, sparkle.y);
    if(d < this.predatorImage.width + sparkle.sparkleImage.width){
      // Make sure tint isn't too dark.
      tint(random(100, 255), random(100, 255), random(100, 255));
      // resets object to another part of screen.
      sparkle.reset();
    }
  }

//isDead
//
//Returns that the player has died to script.js
  isDead(){
    return this.health <= 0;
  }

  // display
  //
  // Draw the predator on the canvas
  display() {
    push();
    image(this.predatorImage, this.x, this.y);
    pop();
    //Display player health and kill count with a floating display that follows player. 
   push();
   textFont(pixelFont);
   textAlign(CENTER, CENTER);
   textSize(20);
   fill(255);
   text("KILL: " + this.preyKilled, this.x + 50, this.y - 45);
   // round the kill count to avoid ugly decimals
   text("HEALTH: " + round(this.health) + "%", this.x + 50, this.y - 65);
   pop();

  }
}
