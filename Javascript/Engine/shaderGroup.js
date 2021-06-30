import { getTextByCallback } from "./objFileLoader.js";
import { ActionEvent } from "./actionEvent.js";
import { createAndGetProgram } from "./glUtility.js";
import { ShaderContainer } from "./shaderContainer.js";

export function ShaderGroup(vertexShaderLocation, fragmentShaderLocation)
{
  this.shaderContainer = new ShaderContainer(vertexShaderLocation, fragmentShaderLocation);
  this.areSameShadersUsed = areSameShadersUsed.bind(this);

  this.renderers = [];
  this.unfinishedRenderers = [];
  this.addRenderer = addRenderer.bind(this);

  this.program = null;
  this.loadProgram = loadProgram.bind(this);
  this.isProgramReady = function(){ return this.program != null; }
  this.onProgramReady = new ActionEvent();


}
function loadProgram()
{
  this.shaderContainer.onDataLoaded.addEventListener(tryCreatingProgram.bind(this));
  this.shaderContainer.loadShader();
}

function tryCreatingProgram(){
  if (this.program==null){
    this.program = createAndGetProgram(this.shaderContainer.loadedVertexShader, this.shaderContainer.loadedFragmentShader);
    this.onProgramReady.invoke(this);
  }
}

function addRenderer(renderer)
{
  if (renderer.isDataLoaded()){
    this.renderers.push(renderer);
  }
  else{
    renderer.onDataLoaded.addEventListener(addRenderer.bind(this));
  }
}

function areSameShadersUsed(vertexShaderName, fragmentShaderName)
{
  var isVertexShaderTheSame = this.shaderContainer.vertexShaderLocation == vertexShaderName;
  var isFragmentShaderTheSame = this.shaderContainer.fragmentShaderLocation == fragmentShaderName;
  return isVertexShaderTheSame&&isFragmentShaderTheSame;
}
