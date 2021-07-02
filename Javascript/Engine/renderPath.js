import { lastRenderUpdate } from "./updateLoop.js";
import { ObjectEnvironment } from "./objectEnvironment.js";
import { Camera } from "./camera.js";
import { tryInitiatingGL } from "./glUtility.js";
import { TransparencyLayer } from "./transparencyLayer.js";

const CLEAR_COLOR = [1, 0.85, 0.8, 1];

export function RenderPath(canvas, isDefaultFrameBuffer)
{
    this.environment3D = new ObjectEnvironment();
    this.canvas2D = new ObjectEnvironment();
    this.transparencyLayer = new TransparencyLayer;
    this.gl = tryInitiatingGL(canvas);
    this.camera = new Camera(this.gl, isDefaultFrameBuffer);

    this.postProcessing = null;
    this.renderPath = [];

    this.draw = draw.bind(this);

    lastRenderUpdate.addEventListener(this.draw);
}

function draw()
{
  this.camera.frameBuffer.setThisAsCurrentFrameBuffer(this.gl);
  clear(this.gl);
  this.environment3D.draw(this.gl, this.camera);
  this.transparencyLayer.draw(this.gl, this.camera.uniformPool);
  this.canvas2D.draw(this.gl, this.camera);
}

function clear(gl){
  gl.clearColor(CLEAR_COLOR[0], CLEAR_COLOR[1], CLEAR_COLOR[2], CLEAR_COLOR[3]);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
