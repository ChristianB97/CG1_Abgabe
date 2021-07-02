import { createAndGetProgram } from "./glUtility.js";
import { getTextByCallback } from "./objFileLoader.js";
import { ActionEvent } from "./actionEvent.js";

export function ProgramContainer(vertexShaderLocation, fragmentShaderLocation)
{
    this.program = null;
    this.vertexShader = null;
    this.fragmentShader = null;

    this.vertexShaderLocation = vertexShaderLocation;
    this.fragmentShaderLocation = fragmentShaderLocation;
    this.areSameShadersUsed = areSameShadersUsed.bind(this);
    this.isProgramReady = function() { return this.program!=null }
    this.onProgramCreated = new ActionEvent();
    this.loadProgram = loadProgram.bind(this);
}

function loadProgram(){
  getTextByCallback(this.vertexShaderLocation, setVertexShader.bind(this));
  getTextByCallback(this.fragmentShaderLocation, setFragmentShader.bind(this));
}

function areSameShadersUsed(vertexShaderLocation, fragmentShaderLocation)
{
  return vertexShaderLocation==this.vertexShaderLocation && fragmentShaderLocation==this.fragmentShaderLocation;
}

function setFragmentShader(fragmentShaderText){
  this.fragmentShader = fragmentShaderText;
  tryCreatingProgram.call(this);
}

function setVertexShader(vertexShaderText){
  this.vertexShader = vertexShaderText;
  tryCreatingProgram.call(this);
}

function tryCreatingProgram(){
  if (this.vertexShader!=null && this.fragmentShader!=null){
    this.program = createAndGetProgram(this.vertexShader, this.fragmentShader);
    this.onProgramCreated.invoke();
  }
}
