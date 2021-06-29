import { Transform } from "./transform.js";
import { UniformPool } from "./uniformPool.js";
import { FrameBuffer } from "./frameBuffer.js";
import "./gl-matrix.js";

export function Camera(gl, isDefaultFrameBuffer)
{
  this.worldMatrix = new Transform();
  this.projectionMatrix = new Transform();
  this.viewMatrix = new Transform();
  this.uniformPool = new UniformPool();
  this.frameBuffer = new FrameBuffer(gl, isDefaultFrameBuffer);
  console.log(this.frameBuffer);

  this.translateCamera = translateCamera.bind(this);
  this.rotateCamera = rotateCamera.bind(this);

  initCamera.call(this, gl.canvas);
}

function initCamera(canvas){
  glMatrix.mat4.lookAt(this.viewMatrix.matrix, [0, 0, -15], [0, 0, 0], [0, 1, 0]);
  glMatrix.mat4.perspective(this.projectionMatrix.matrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000);

  this.uniformPool.createAndSetMatrix4fv("mWorld", this.worldMatrix.matrix);
  this.uniformPool.createAndSetMatrix4fv("mProj", this.projectionMatrix.matrix);
  this.uniformPool.createAndSetMatrix4fv("mView", this.viewMatrix.matrix);
}

function translateCamera(vec3Translate)
{
  vec3Translate = [vec3Translate[0],vec3Translate[1],vec3Translate[2]*(-1)]
  this.worldMatrix.translate(vec3Translate);
}

function rotateCamera(angle,vec3){
  this.worldMatrix.rotate(angle,vec3);
}
