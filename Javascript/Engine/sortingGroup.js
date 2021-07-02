import { ProgramContainer } from "./programContainer.js";
import { DistanceObject } from "./distanceObject.js";

export function SortingGroup()
{
  this.distanceObjects = [];
  this.unloadedRenderer = [];
  this.addRenderer = addRenderer.bind(this);
  this.programContainerList = [];
}

function addRenderer(renderer)
{
  var programContainer = findProgramContainer.call(this, renderer.shaderContainer.vertexShaderLocation, renderer.shaderContainer.fragmentShaderLocation);
  if (programContainer==null){
    programContainer = new ProgramContainer(renderer.shaderContainer.vertexShaderLocation, renderer.shaderContainer.fragmentShaderLocation);
    programContainer.loadProgram();
    this.programContainerList.push(programContainer);
  }
  var distanceObject = new DistanceObject(renderer, programContainer);
  this.distanceObjects.push(distanceObject);
}

function findProgramContainer(vertexShaderLocation, fragmentShaderLocation)
{
  this.programContainerList.forEach((programContainer) => {
    if (programContainer.areSameShadersUsed(vertexShaderLocation, fragmentShaderLocation)){
      return programContainer;
    }
  });
  return null;
}

function onRendererLoaded(loadedShaderContainer)
{
  this.unloadedRenderer.forEach((oneUnloadedRenderer, i) => {
    if (oneUnloadedRenderer.shaderContainer == loadedShaderContainer){
      this.renderer.push(oneUnloadedRenderer);
      this.unloadedRenderer.splice(i, 1);
      return;
    }
  });
}
