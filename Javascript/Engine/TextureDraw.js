import ShaderContainer from "shaderContainer.js";
import createAndGetProgram from "glUtility.js";

export function TextureDraw(vertexShaderLocation, fragmentShaderLocation){
  this.inputTextures = [];
  this.outputTexture = null;
  this.shaderContainer = new ShaderContainer(vertexShaderLocation, fragmentShaderLocation);
  this.program = null;
  this.draw = function() {};

  shaderContainer.onDataLoaded.addEventListener(setProgramAndAllowDrawing.bind(this));
  shaderContainer.loadShader();
}

function setProgramAndAllowDrawing()
{
  this.program = createAndGetProgram(this.shaderContainer.loadedVertexShader, this.shaderContainer.loadedFragmentShader);
  this.draw = draw.bind(this);
}

function draw(gl, program)
{
  
}
