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
  triggerAnimation() {
    if (this.currentArrayIndex < this.flamingoArray.length - 1) {
      this.currentArrayIndex += 1;
      if (random() < 0.3) {
        textSpeech = "ok flamingo";
      }
      if (0.3 < random() < 0.6) {
        textSpeech = "no flamingo";
      }
      if (random() > 0.6) {
        textSpeech = "yes flmaingo";
      }
    }
    else{
      console.log("killswitch ok");
      this.killSwitch = true;
    }
    // if(this.currentArrayIndex = this.flamingoArray.length - 1){
    //   this.killSwitch = true;
    // }
  }

  draw(landState) {
    if (landState != this.landState) {

      return;
    }
    else{
    this.currentArrayImage = this.flamingoArray[this.currentArrayIndex];
    image(this.currentArrayImage, this.x, this.y);
    }
  }

  checkDistance(playerX, playerY, playerWidth) {
    if (landState != this.landState) {
      return;
    }
    this.d = dist(playerX, playerY, this.x, this.y);
    if (this.d < playerWidth + this.width) {

      if (keyIsDown(SHIFT)) {
        textSpeech = "END ME, YOU SMALL LITTLE FOOL";
        this.triggerAnimation();
      }
    }
  }

}
