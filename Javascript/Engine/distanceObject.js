export function DistanceObject(renderer, programContainer)
{
  this.renderer = renderer;
  this.distance = 0;
  this.programContainer = programContainer;
  this.draw = function() {};

  this.calculateDistance = calculateDistance.bind(this);
  initDistanceObject.call(this);
}

function initDistanceObject(){
  if (this.programContainer.isProgramReady()){
    console.log(this.programContainer.program);
    activateDraw.call(this);
  }
  else {
    this.programContainer.onProgramCreated.addEventListener(activateDraw.bind(this));
  }
}

function activateDraw(){
  this.draw = draw.bind(this);
}

function draw(gl, cameraUniformPool){
  this.renderer.meshDraw.draw(gl, this.programContainer.program, cameraUniformPool);
}

function calculateDistance(worldMatrix)
{
  vectorX = worldMatrix[12] - this.renderer.transform.matrix[12];
  vectorY = worldMatrix[13] - this.renderer.transform.matrix[13];
  vectorZ = worldMatrix[14] - this.renderer.transform.matrix[14];
  this.distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2) + Math.pow(vectorZ, 2));
}
