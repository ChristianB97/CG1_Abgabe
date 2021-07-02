import { createAndGetProgram, gl } from "./glUtility.js";
import { ShaderGroup } from "./shaderGroup.js";

export function ShaderGroupPool()
{
  this.loadedShaderGroups = [];
  this.unloadedShaderGroups = [];
  this.registerRenderer = registerMeshRenderer.bind(this);
}

function registerMeshRenderer(renderer)
{
  let foundGroup = false;
  let length = Math.max(this.loadedShaderGroups.length, this.unloadedShaderGroups.length);
  let i = 0;
  while (i<=length&&!foundGroup) {
    if (i<this.loadedShaderGroups.length)
    {
      let isSuccessful = addRendererIfShadersMatchingWithShaderGroup(this.loadedShaderGroups[i], renderer);
      foundGroup = isSuccessful;
    }
    if (i<this.unloadedShaderGroups.length){
      let isSuccessful = addRendererIfShadersMatchingWithShaderGroup(this.unloadedShaderGroups[i], renderer);
      foundGroup = isSuccessful;
    }
    i++;
  }
  if (!foundGroup)
  {
    createShaderGroup.call(this, renderer);
  }
}

function addRendererIfShadersMatchingWithShaderGroup(shaderGroup, renderer){
  if (shaderGroup.programContainer.areSameShadersUsed(renderer.shaderContainer.vertexShader, renderer.shaderContainer.fragmentShader))
  {
    shaderGroup.addRenderer(renderer);
    return true;
  }
  return false;
}

function createShaderGroup(renderer)
{
  var shaderGroup = new ShaderGroup(renderer.shaderContainer.vertexShaderLocation, renderer.shaderContainer.fragmentShaderLocation);
  this.unloadedShaderGroups.push(shaderGroup);
  shaderGroup.onShaderGroupReady.addEventListener(pushShaderGroupToLoadedList.bind(this));

  shaderGroup.addRenderer(renderer);
}

function pushShaderGroupToLoadedList(loadedShaderGroup){
  console.log(loadedShaderGroup);
  this.loadedShaderGroups.push(loadedShaderGroup);
  this.unloadedShaderGroups.forEach((unloadedShaderGroup, i) => {
    if (loadedShaderGroup==unloadedShaderGroup)
    {
      this.unloadedShaderGroups.splice(i, 1);
      return;
    }
  });
}
