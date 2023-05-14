let canvasSize = 1000;
let deformationIntensity = 15;

class PLGNSHP {
  constructor(vertices) {
    this.vertices = vertices;
    this.newVertices = [];
    this.squareColor = color(255, 204, 0);
    this.squareColor.setAlpha(1);
    this.probability = random(.0,1.0)
  }

  deform(){
    var middlePointX = 0;
    var middlePointY = 0;
    
    for(let i = 0; i<this.vertices.length-1; i++){
      middlePointX = (this.vertices[i][0] + this.vertices[i+1][0])/2.0 + random(-deformationIntensity, deformationIntensity)
      middlePointY = (this.vertices[i][1] + this.vertices[i+1][1])/2.0 + random(-deformationIntensity, deformationIntensity)
      
      this.newVertices.push([middlePointX, middlePointY])
    }
    
    middlePointX = (this.vertices[0][0] + this.vertices[this.vertices.length-1][0])/2.0 + random(-deformationIntensity, deformationIntensity)
    middlePointY = (this.vertices[0][1] + this.vertices[this.vertices.length-1][1])/2.0 + random(-deformationIntensity, deformationIntensity)
    
    this.newVertices.push([middlePointX, middlePointY])
    
    var j = 1;
    for(let i = 0; i<this.newVertices.length; i++){
        this.vertices.splice(j,0,this.newVertices[i]);
    }
    this.newVertices=[];
  }
  
  display() {

    
    fill(this.squareColor);
    noStroke();
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      vertex(this.vertices[i][0], this.vertices[i][1]);
    }
    endShape(CLOSE);
  }
}

class PLGNHNDLR{
  constructor(){
    this.layers = 1000;
    this.polygons = [];
    
    for (let i = 0; i < this.layers; i++) {
    this.polygons.push(new PLGNSHP([
      [random(canvasSize), random(canvasSize)],
      [random(canvasSize), random(canvasSize)],
      [random(canvasSize), random(canvasSize)]
    ]))
  }
    
  }
  
  deform(){
    for (let i = 0; i < this.layers; i++) {
    this.polygons[i].deform();
  }
  }
  
  display(){
    for (let i = 0; i < this.layers; i++) {
      if (this.polygons[i].probability+random(0.2)>0.5){
        this.polygons[i].display();
      }
  }
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  plgnHndlr = new PLGNHNDLR();
  plgnHndlr.deform();
  plgnHndlr.deform();
  plgnHndlr.deform();
  plgnHndlr.deform();
  plgnHndlr.deform();
}

function draw() {
  background('#000000');
  plgnHndlr.display();
}