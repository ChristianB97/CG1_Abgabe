import { AttributeLocatorPool } from "./attributeLocatorPool.js";
import { UniformPool } from "./uniformPool.js";
import { ActionEvent } from "./actionEvent.js";
import { getTextByCallback } from "./objFileLoader.js";

export function ShaderContainer(vertexShaderLocation, fragmentShaderLocation)
{
  this.vertexShaderLocation = vertexShaderLocation;
  this.fragmentShaderLocation = fragmentShaderLocation;
  this.loadedFragmentShader = null;
  this.loadedVertexShader = null;
  this.attributeLocatorPool = new AttributeLocatorPool();
  this.uniformPool = new UniformPool();

  this.loadShader = loadShader.bind(this);
  this.onDataLoaded = new ActionEvent();
}

function loadShader(){
  getTextByCallback(this.vertexShaderLocation, setVertexShader.bind(this));
  getTextByCallback(this.fragmentShaderLocation, setFragmentShader.bind(this));
}

function setVertexShader(_loadedVertexShader){
  this.loadedVertexShader = _loadedVertexShader;
  tryInvokingOnDataLoaded.call(this);
}

function setFragmentShader(_loadedFragmentShader){
  this.loadedFragmentShader = _loadedFragmentShader;
  tryInvokingOnDataLoaded.call(this);
}

function tryInvokingOnDataLoaded(){
  if (this.loadedVertexShader!=null&&this.loadedFragmentShader!=null)
  {
    this.onDataLoaded.invoke(this);
  }
}
