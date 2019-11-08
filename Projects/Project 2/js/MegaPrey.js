// class MegaPrey
//
// This class is supposed to be a super tough ~Monster class~ whose objects are created
// when Bat and FirstAid objects overlap, hence the name of the class.
// Is this the case? No. Instead, this class ended up being a sort of 'looming threat' that it isn't very interactable.
class MegaPrey {
  //Programmer can determine sparkle position, speed, and visible image.
  constructor(x, y, speed, health, preyImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    //Health properties
    this.health = health;
    // Display properties
    this.preyImage = preyImage
    // Sin properties for oscillation 'animation'
    this.angle = 0;
    this.radius = this.preyImage.width/2;
  }

  // display
  //
  // Draw the MegaPrey on the canvas
  display() {
    push();
    noStroke();
    // This oscillation doesn't work but here it is I guess. 
    // Terrible at maths but basically something happens with circles, those values affect the size of a circle (?)
    // Then we apply those varying values to our image to have them change ~rhythmically.
    this.growth = sin(this.angle) * (this.radius / 2);
    // Aha, display bat image but take changing values based on the circle changes into consideration
    image(this.preyImage, this.x, this.y, this.radius * 2 + this.growth);
      // increment value that allows whole equation to change
    this.angle += 0.05;
    pop();
  }
}
