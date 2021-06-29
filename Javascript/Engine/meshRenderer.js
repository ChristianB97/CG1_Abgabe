import { convertOBJToVerticesData } from "./objFileLoader.js";
import { TextureHolder } from "./textureHolder.js";
import { ActionEvent } from "./actionEvent.js";
import { ShaderContainer } from "./shaderContainer.js";
import { MeshDraw } from "./meshDraw.js";

export function MeshRenderer(objFileName, transform, vertexShaderName, fragmentShaderName)
{
  this.objectData = null;
  this.transform = transform;
  this.textureHolder = new TextureHolder();
  this.shaderContainer = new ShaderContainer(vertexShaderName, fragmentShaderName);
  this.meshDraw = new MeshDraw(this.textureHolder.setTextureAsActive, this.shaderContainer);

  this.onDataLoaded = new ActionEvent();
  this.onDataLoaded.addEventListener(this.meshDraw.setDrawingActive);
  this.isDataLoaded = isDataLoaded.bind(this);
  this.textureHolder.onTextureCreated.addEventListener(onTextureCreatedCallback.bind(this));

  convertOBJToVerticesData(objFileName, onVBOLoadedCallback.bind(this));
  setDefaultUniforms.call(this);
}

function setDefaultUniforms()
{
  if (this.transform!=null){
    this.shaderContainer.uniformPool.createAndSetMatrix4fv("mLokal", this.transform.matrix);
  }
}

function isDataLoaded(){
  var isOBJLoaded = this.objectData!=null;
  var isTextureCreatedIfPossible = this.textureHolder.isEverythingLoaded();
  return isOBJLoaded&&isTextureCreatedIfPossible;
}

function onVBOLoadedCallback(loadedData)
{
  this.objectData = loadedData;
  this.meshDraw.vbo = loadedData;
  if (this.isDataLoaded()){
    this.onDataLoaded.invoke(this);
  }
}

function onTextureCreatedCallback()
{
  if (this.isDataLoaded()){
    this.onDataLoaded.invoke(this);
  }
}
