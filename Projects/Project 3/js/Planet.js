//planet
//
// Planet class creates planet objects that are defined by their array of images that can be triggered by player into an
//animation
class Planet {
  constructor(x, y, array, gif, landState, eatSound, crumbs) {
    this.x = x;
    this.y = y;
    this.array = array;
    this.currentArrayIndex = 0;
    this.currentArrayImage = this.array[this.currentArrayIndex];
    this.width = this.currentArrayImage.width;
    this.landState = landState;
    this.eatSound = eatSound;
    this.gif = gif;
    this.crumbs = crumbsImage;
  }
//triggerAnimation
//
//cycle through array images
  triggerAnimation() {
    if (this.currentArrayIndex < this.array.length - 1) {
      this.currentArrayIndex += 1;
    }
  }

// draw
//
// check where the player is. if it's the correct landstate, display image
  draw(landState) {
    if (landState != this.landState) {
      return;
    }
    this.currentArrayImage = this.array[this.currentArrayIndex];
    image(this.currentArrayImage, this.x, this.y);
  }
  // checkDistance
  //
  //exit function if not in correct landstate. Otherwise, if player is close enough to planet, clicking the correct key will
  // trigger animation and play a sound
  checkDistance(playerX, playerY, playerWidth) {
    if (landState != this.landState) {
      return;
    }
    this.d = dist(playerX, playerY, this.x, this.y);
    if (this.d < playerWidth + this.width) {
      textSpeech = "EAT?";
      if (keyIsDown(SHIFT) && this.eatSound.isPlaying() == false) {
        this.eatSound.play();
        this.triggerAnimation();
      }
    }
  }

}
