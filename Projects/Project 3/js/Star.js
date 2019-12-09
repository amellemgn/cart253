//star
//
// The player commands Star objects by clicking. If the star connects with a planet object, it can revive a 'dead' planet.
class Star {
  constructor(x, y ) {
    this.x = x;
    this.y = y;
  }

  // draw
  //
  // check where the player is. if it's the correct landstate, display image
  draw() {
    // image(starGif_createImg0, this.x, this.y);
    starGif_createImg0.position(this.x, this.y);
  }
  // checkDistance
  //
  //
  //Checks the distance between the star (mouse)
  checkDistance(planet) {
    this.d = dist(planet.x, planet.y, this.x, this.y);
    if (this.d < planet.width + starGif_createImg0.width) { // planet class has a defined class
      planet.playGif = false;
      planet.currentArrayIndex = 0;
    }

  }
}
