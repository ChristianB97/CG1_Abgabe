import { ShaderContainer } from "./shaderContainer.js";
import { createAndGetProgram } from "./glUtility.js";
import { TextureHolder } from "./textureHolder.js";

export function TextureDraw(inputTexture, outputTextures, vertexShaderLocation, fragmentShaderLocation){
  this.inputTextures = inputTexture;
  this.outputTextures = outputTextures;
  this.shaderContainer = new ShaderContainer(vertexShaderLocation, fragmentShaderLocation);
  this.textureHolder = new TextureHolder();
  this.draw = function() {};

  shaderContainer.onDataLoaded.addEventListener(setProgramAndAllowDrawing.bind(this));
  shaderContainer.loadShader();
}

function setUpTextureHolder(){
  this.textureHolder.glTextures.push(this.inputTexture);
  this.outputTextures.forEach((outputTexture) => {
    this.textureHolder.glTexture.push(outputTexture);
  });
}

function setProgramAndAllowDrawing()
{
  this.program = createAndGetProgram(this.shaderContainer.loadedVertexShader, this.shaderContainer.loadedFragmentShader);
  this.draw = draw.bind(this);
}

function draw(gl)
{
  gl.useProgram(this.program);
  this.glTexture.setTextureAsActive();
}
