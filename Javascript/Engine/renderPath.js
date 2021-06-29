import { lastRenderUpdate } from "./updateLoop.js";
import { ObjectEnvironment } from "./objectEnvironment.js";
import { Camera } from "./camera.js";
import { tryInitiatingGL } from "./glUtility.js";

const CLEAR_COLOR = [1, 0.85, 0.8, 1];

export function RenderPath(canvas, isDefaultFrameBuffer)
{
    this.environment3D = new ObjectEnvironment();
    this.canvas2D = new ObjectEnvironment();
    this.gl = tryInitiatingGL(canvas);
    this.camera = new Camera(this.gl, isDefaultFrameBuffer);

    this.postProcessing = null;
    this.renderPath = [];

    this.setObjectEnvironment = setObjectEnvironment.bind(this);
    this.setCanvas = setCanvas.bind(this);
    this.setCamera = setCamera.bind(this);
    this.setPostProcessing = setPostProcessing.bind(this);
    this.draw = draw.bind(this);

    lastRenderUpdate.addEventListener(this.draw);
}

function draw()
{
  this.camera.frameBuffer.setThisAsCurrentFrameBuffer(this.gl);
  clear(this.gl);
  this.environment3D.draw(this.gl, this.camera);
  this.canvas2D.draw(this.gl, this.camera);
}

function clear(gl){
  gl.clearColor(CLEAR_COLOR[0], CLEAR_COLOR[1], CLEAR_COLOR[2], CLEAR_COLOR[3]);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function setObjectEnvironment(objectEnvironment)
{
  this.objectEnvironment = objectEnvironment;
  batchToRenderPath.bind(this).call();
}

function setCanvas(canvas)
{
  this.canvas = canvas;
  batchToRenderPath.bind(this).call();
}

function setCamera(camera){
  this.camera = camera;
}

function setPostProcessing(postProcessing)
{
  this.postProcessing = postProcessing
  batchToRenderPath.bind(this).call();
}
