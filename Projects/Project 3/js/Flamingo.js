class Flamingo{
  constructor (x, y, array, landState, eatSound){
    this.x = x;
    this.y = y;
    this.flamingoArray = array;
    this.currentArrayIndex = 0;
    this.currentArrayImage = this.flamingoArray[this.currentArrayIndex];
    this.width = this.currentArrayImage.width;
    this.landState = landState;
    this.eatSound = eatSound;
  }
triggerAnimation(){
  if(this.currentArrayIndex <this.array.length-1){
    this.currentArrayIndex +=1;
  }
}

draw(landState){
  if (landState != this.landState) {
     return;
   }
   this.currentArrayImage = this.flamingoArray[this.currentArrayIndex];
   image(this.currentArrayImage, this.x, this.y);
}

checkDistance(playerX, playerY, playerWidth) {
  if (landState != this.landState) {
    return;
  }
  this.d = dist(playerX, playerY, this.x, this.y);
  if (this.d < playerWidth + this.width) {
    textSpeech = "ok flamingo";
    if (keyIsDown(SHIFT)) {
      this.triggerAnimation();
    }
  }
}

}
