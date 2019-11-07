class MegaPrey extends Prey {
  constructor(x, y, speed, health) {
    super(x, y, speed)
    this.health = health;
  }

  display() {
    push();
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, 200, 400);
    pop();

  }

}
