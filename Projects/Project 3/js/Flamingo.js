// flamingo
//
//Cool looking giant flamingo planet. Player moves through array through individual key presses instead of setting off the animation with one key press.
class Flamingo {
  constructor(x, y, array, landState, eatSound) {
    this.x = x;
    this.y = y;
    this.flamingoArray = array;
    this.currentArrayIndex = 0;
    this.currentArrayImage = this.flamingoArray[this.currentArrayIndex];
    this.width = this.currentArrayImage.width;
    this.landState = landState;
    this.eatSound = eatSound;
    this.killSwitch = false;
  }
  //triggerAnimation
  //
  // Every time this function is called, the array index changes by one. The text associated to it is randomly generated
  triggerAnimation() {
    if (this.currentArrayIndex < this.flamingoArray.length - 1) {
      this.currentArrayIndex += 1;
      if (random() < 0.3) {
        textSpeech = "You fool, I was just like you once";
      }
      if (0.3 < random() < 0.6) {
        textSpeech = "You dare drink my blood";
      }
      if (random() > 0.6) {
        textSpeech = "You dare feast from my flesh";
      }
    }
    //If we've reached the end of the array and the animation is over, this boolean is triggered. All the Subflamingo class objects disappear as they were
    // associated with the flamingo.
    else {
      console.log("killswitch ok");
      this.killSwitch = true;
    }
  }
  //draw
  //
  // Check to see if player is in the right landState. If they are, Display flaming.
  draw(landState) {
    if (landState != this.landState) {

      return;
    } else {
      this.currentArrayImage = this.flamingoArray[this.currentArrayIndex];
      image(this.currentArrayImage, this.x, this.y);
    }
  }
  //checkDistance
  //
  // Check to see if player is in right landstate and within reachable distance. If it is and player presses a certain key, trigger the animation
  checkDistance(playerX, playerY, playerWidth) {
    if (landState != this.landState) {
      return;
    }
    this.d = dist(playerX, playerY, this.x, this.y);
    if (this.d < playerWidth + this.width) {

      if (keyIsDown(SHIFT)) {
        textSpeech = "YOU SMALL LITTLE FOOL";
        this.triggerAnimation();
      }
    }
  }
}
