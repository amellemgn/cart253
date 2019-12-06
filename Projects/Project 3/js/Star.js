//star
//
// star class
class Star {
  constructor(x, y /*something else */ ) {
    this.x = x;
    this.y = y;
  }

  // draw
  //
  // check where the player is. if it's the correct landstate, display image
  draw() {
    image(starGif_createImg, this.x, this.y);
  }
  // checkDistance
  //
  //
  //
  checkDistance(planet) {
    this.d = dist(planet.x, planet.y, this.x, this.y);
    if (this.d < planet.width + this.width) { // planet class has a defined class
      planet.playGif = false;
      planet.currentArrayIndex = 0;
    }
  }
}
