import { WebObject } from "./WebObject.js";
import { drawPostProcessing } from "./glFactory.js";
import { createAndGetProgram } from "./glUtility.js";
import { postProcessingUpdate } from "./UpdateLoop.js";

export var frameBuffer;
export var frameBufferTexture;
var brightColorTexture;
export var postProcessingScreen;
var brightColorFilterProg;
var bloomProg;

export function PostProcessing()
{
  this.postProcessingEffects = [];
  this.addBloom = addBloom.bind(this);
}

function addBloom(value)
{

}

export async function initPostProcessing(gl)
{
  frameBuffer = gl.createFramebuffer();
  frameBufferTexture = gl.createTexture();
  brightColorTexture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, frameBufferTexture);
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 672, 378, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, frameBufferTexture, 0);

  gl.bindTexture(gl.TEXTURE_2D, brightColorTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 672, 378, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, brightColorTexture, 0);

  const depthBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);

// make a depth buffer and the same size as the targetTexture
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 672, 378);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

  //gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);

  var postProcessingScreen = new WebObject();
  postProcessingScreen.addMeshRendererAndTransform("OBJ/mirror.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  postProcessingScreen.getComponent("MeshRenderer").textureHolder.glTexture = frameBufferTexture;
  postProcessingScreen.getComponent("Transform").translate([0,0,5]);

  brightColorFilterProg = await createAndGetProgram("Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderBrightColorFilter.glsl");

  postProcessingUpdate.addEventListener(
    function()
    {
      var textures = [];
      textures.push(frameBufferTexture);
      //drawPostProcessing(textures, brightColorFilterProg);
    }
  )

}
