class Flamingo extends Planet{
  constructor (x, y, image){
    super(x, y, image)
  }


  // draw is fine

  triggerAnimation(){
    if (this.currentArrayIndex < this.array.length - 1) {
      this.currentArrayIndex += 1;
    }
  }
}
