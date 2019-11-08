//Bat
//
// Bat class draws from the basic Prey class. While the game is technically a side scroller, the
// Bat preys' vertical movement provide an additional challenge for the player
class Bat extends Prey {
  //Leech off of Prey constructor
  constructor(x, y, speed, preyImage) {
    super(x, y, speed, preyImage)
    // Create condition that checks whether MegaPrey needs to be created
    this.createMegaPrey = false;
  }
  // display
  //
  // Draw the bat  on the canvas
  // To simulate breathing, use a sin wave oscillation movement.
  display() {
    push();
    noStroke();
    // Terrible at maths but basically something happens with circles, those values affect the size of a circle (?)
    // Then we apply those varying values to our image to have them change ~rhythmically.
    this.growth = sin(this.angle) * (this.radius / 2);
    // Aha, display bat image but take changing values based on the circle changes into consideration
    image(this.preyImage, this.x, this.y, this.radius * 2 + this.growth);
    // increment value that allows whole equation to change
    this.angle += 0.05;
    pop();

  }
  //handleMerging()
  //
  //This function handles the overlap of the Bat and FirstAid classes. A new object from MegaPrey class is
  // created if that happens.
  handleMerging(firstAid) {
    // Calculate distance from bat object to firstAid object.
    let d = dist(this.x, this.y, firstAid.x, firstAid.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.preyImage.width + firstAid.preyImage.width) {
      // if they are, trigger the condition and create ~Frankenstein-esqe MegaPrey
      this.createMegaPrey = true;
      // reset the bat and firstAid objects
      firstAid.reset();
      this.reset();
    }
  }
}
