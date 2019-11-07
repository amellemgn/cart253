//Bat
//
// Bat class is basically represents the basic prey. While the game is technically a side scroller, the
// Bat preys' vertical movement provide an additional challenge for the player.
class Bat extends Prey {
  constructor(x, y, speed, preyImage) {
    super(x, y, speed, preyImage)
    this.createMegaPrey = false;
  }
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {

    push();
    noStroke();
    this.growth = sin(this.angle) * (this.radius / 2);
    image(this.preyImage, this.x, this.y, this.radius * 2 + this.growth);
    this.angle += 0.05;
    pop();

  }

  handleMerging(firstAid) {

      // Calculate distance from this predator to the prey
      let d = dist(this.x, this.y, firstAid.x, firstAid.y);
      // Check if the distance is less than their two radii (an overlap) + some time
      // in order to give player the time to strike
    //  console.log(d + "distance");
      if (d < this.preyImage.width + firstAid.preyImage.width ) {
        console.log("ok??????");
          this.createMegaPrey = true;
          console.log("megaprey truth");
          firstAid.reset();
          this.reset();

        }
      }
    }
