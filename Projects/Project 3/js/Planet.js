//planet
//
// Planet class creates planet objects that are defined by their array of images that can be triggered by player into an
//animation
class Planet {
  constructor(x, y, spaceArray, gif, landState, eatSound, crumbs) {
    this.x = x;
    this.y = y;
    this.spaceArray = spaceArray;
    this.currentArrayIndex = 0;
    this.currentArrayImage = spaceArray[this.currentArrayIndex];
    this.width = this.currentArrayImage.width;
    this.landState = landState;
    this.eatSound = eatSound;
    this.gif = gif;
    this.crumbs = crumbsImage;
    this.playGif = false;
  }
//triggerAnimation
//
//cycle through array images
  triggerAnimation() {
    this.playGif=true;

    // spaceGif.play();
  }

// draw
//
// check where the player is. if it's the correct landstate, display image
  draw(landState) {
    if (landState != this.landState) {
      return;
    }
    if(this.playGif ===true) // this needs to switch back eventually
    {
      if (this.currentArrayIndex < this.spaceArray.length - 1) {
        this.currentArrayIndex += 1;
      }

    }
    this.currentArrayImage = this.spaceArray[this.currentArrayIndex];
    image(this.currentArrayImage, this.x, this.y);
    // image(spaceGif, this.x-20, this.y-20);
    // this.gif.position(this.x -20, this.y -20);
  //  this.gif.pause();
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
