//Bat
//
// Bat class is basically represents the basic prey. While the game is technically a side scroller, the
// Bat preys' vertical movement provide an additional challenge for the player.
class Bat extends Prey {
  constructor(x, y, speed, preyImage){
    super(x, y, speed, preyImage)
  }
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {

    push();
    noStroke();
    this.growth = sin(this.angle) * (this.radius/2);
    image(this.preyImage, this.x,this.y, this.radius*2 + this.growth);
    this.angle += 0.05;
    pop();

  }
}
