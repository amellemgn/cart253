//star
//
// star class
class Star{
  constructor(x, y /*something else */){
    this.x = x;
    this.y = y;
  }

  // checkDistance
  //
  //
  //
  checkDistance(playerX, playerY, playerWidth) {
    this.d = dist(playerX, playerY, this.x, this.y);
    if (this.d < playerWidth + this.width) {
      if (keyIsDown(SHIFT) && this.eatSound.isPlaying() == false) {
        this.eatSound.play();
        this.triggerAnimation();
      }
    }
  }
}
