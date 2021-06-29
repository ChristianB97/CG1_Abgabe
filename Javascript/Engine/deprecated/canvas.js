//import { draw, clear, setTexture, setProgram, drawUI } from "./glFactory.js";
//import { createAndGetProgram, createAndSetTexture, gl } from "./glUtility.js";
//import { ShaderGroupPool } from "./glShaderGroupPool.js";
//import { frameBuffer } from "./glPostProcessing.js";
//import { worldMatrix } from "./camera.js";


export function Canvas()
{
  this.shaderGroupPool = new ShaderGroupPool();
  this.addObject = function(object) {
    var meshRenderer = object.getComponent("MeshRenderer");
    this.shaderGroupPool.registerRenderer(meshRenderer);
  }
  this.draw = drawObjects.bind(this);
}

function drawObjects()
{
  this.shaderGroupPool.shaderGroups.forEach((shaderGroup) =>
  {
    drawObjectsInShaderGroup(gl, shaderGroup);
  });
}

function drawObjectsInShaderGroup(gl, shaderGroup){
  if (shaderGroup.isProgramReady())
  {
    setProgram(gl, shaderGroup.program);
    shaderGroup.renderers.forEach((renderer, i) => {
      setGLTexture(gl, renderer);
      drawUI(gl, renderer.objectData, renderer.transform.matrix);
    });
  }
}

function setGLTexture(gl, renderer){
  if (renderer.textureHolder.glTexture!=null)
  {
    setTexture(gl, renderer.textureHolder.glTexture, renderer.textureHolder.glBindingType);
  }
  else {
    setTexture(gl, null, gl.TEXTURE_2D);
  }
}
