import { createAndGetProgram, gl } from "./glUtility.js";
import { ShaderGroup } from "./shaderGroup.js";

export function ShaderGroupPool()
{
  this.shaderGroups = [];
  this.registerRenderer = function(renderer) { registerMeshRenderer(this. shaderGroups, renderer) }
}

function registerMeshRenderer(shaderGroups, renderer)
{
  var foundGroup = false;
  shaderGroups.forEach((shaderGroup, i) => {
    if (shaderGroup.areSameShadersUsed(renderer.shaderContainer.vertexShader, renderer.shaderContainer.fragmentShader))
    {
      shaderGroup.addRenderer(renderer);
      foundGroup=true;
      return;
    }
  });
  if (!foundGroup)
  {
    createShaderGroup(shaderGroups, renderer);
  }
}

function createShaderGroup(shaderGroups, renderer)
{
  var shaderGroup = new ShaderGroup(renderer.shaderContainer.vertexShader, renderer.shaderContainer.fragmentShader);
  shaderGroup.addRenderer(renderer);
  addProgramToShaderGroup(shaderGroup);
  shaderGroups.push(shaderGroup);
}

async function addProgramToShaderGroup(shaderGroup){
  var prog = await createAndGetProgram(shaderGroup.vertexShaderName, shaderGroup.fragmentShaderName);
  shaderGroup.program = prog;
}
