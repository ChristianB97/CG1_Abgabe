import { getTextByCallback } from "./objFileLoader.js";
import { ActionEvent } from "./actionEvent.js";
import { createAndGetProgram } from "./glUtility.js";
import { ProgramContainer } from "./programContainer.js";

export function ShaderGroup(vertexShaderLocation, fragmentShaderLocation)
{
  this.programContainer = new ProgramContainer(vertexShaderLocation, fragmentShaderLocation);
  this.renderers = [];
  this.unfinishedRenderers = [];
  this.addRenderer = addRenderer.bind(this);

  this.programContainer.loadProgram();
  this.onShaderGroupReady = new ActionEvent();

  this.programContainer.onProgramCreated.addEventListener(invokeOnShaderGroupReady.bind(this));
}

function invokeOnShaderGroupReady(){
  this.onShaderGroupReady.invoke(this);
}

function addRenderer(renderer)
{
  if (renderer.isDataLoaded()){
    this.renderers.push(renderer);
    console.log(this.renderers);
  }
  else{
    renderer.onDataLoaded.addEventListener(addRenderer.bind(this));
  }
}
