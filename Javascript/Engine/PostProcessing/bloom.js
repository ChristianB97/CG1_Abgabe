import { TextureDraw } from "textureDraw.js";

export function Bloom(cameraTexture, canvasHeight, canvasWidth)
{
  this.brightColorFilterDraw = new TextureDraw("Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderBrightColorFilter.glsl");
  this.brightColorFilterDraw.inputTexture.push(cameraTexture);
}
