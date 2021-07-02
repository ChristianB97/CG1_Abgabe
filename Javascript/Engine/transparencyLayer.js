import { SortingGroup } from "./sortingGroup.js";

export function TransparencyLayer()
{
  this.sortingGroup = new SortingGroup();
  this.addObject = addObject.bind(this);
  this.draw = draw.bind(this);
  this.currentProgram = null;
}

function draw(gl, cameraUniformPool)
{
  enableServerSideCapabilities(gl);
  this.sortingGroup.distanceObjects.forEach((distanceObject) => {
    setProgram.call(this, gl, distanceObject);
    distanceObject.draw(gl, cameraUniformPool);
  });
  disableServerSideCapabilities(gl);
  this.currentProgram=null;
}

function setProgram(gl, currentDistanceObject){
  if (this.currentProgram!=currentDistanceObject.programContainer.program){
    this.currentProgram = currentDistanceObject.programContainer.program;
    gl.useProgram(this.currentProgram);
  }
}

function addObject(webObject)
{
  this.sortingGroup.addRenderer(webObject.getComponent("MeshRenderer"));
}

function enableServerSideCapabilities(gl)
{
  gl.disable(gl.DEPTH_TEST);
  gl.depthMask(gl.FALSE);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function disableServerSideCapabilities(gl)
{
  gl.disable(gl.BLEND);
  gl.depthMask(gl.DEPTH_WRITEMASK);
  gl.enable(gl.DEPTH_TEST);

}
