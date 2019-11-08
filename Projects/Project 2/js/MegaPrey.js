// class MegaPrey
//
// This class is supposed to be a super tough ~Monster class~ whose objects are created
// when Bat and FirstAid objects overlap, hence the name of the class.
// Is this the case? No.
class MegaPrey extends Prey {
  // Borrow constructor from Prey class
  constructor(x, y, speed, preyImage){
    super(x, y, speed, preyImage)
  }
//display()
//
// Display MegaPrey on canvas
  display() {
    push();
    noStroke();
    image(this.preyImage,this.x, this.y);
    pop();
  }
  //move()
  //
  //Move MegaPrey around on canvas. 
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x = constrain(this.x, 0, 940);
    this.x += this.vx;
    this.y = constrain(this.y, 390, 450);
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    //Borrow handleWrapping() from Prey class to reign MegaPrey back in if it escapes the canvas.
    super.handleWrapping();
  }

}
