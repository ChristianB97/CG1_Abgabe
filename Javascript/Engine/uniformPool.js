import { UniformMatrix4fv } from "./UniformsAndAttributes/uniformMatrix4fv.js";
import { Uniform1f } from "./UniformsAndAttributes/Uniform1f.js";
import { Uniform3f } from "./UniformsAndAttributes/Uniform3f.js";

export function UniformPool()
{
  this.uniforms = [];
  this.addUniform = addUniform.bind(this);
  this.createAndSetMatrix4fv = createAndSetMatrix4fv.bind(this);
  this.sendAllUniforms = sendAllUniforms.bind(this);
  this.createAndSetUniform1f = createAndSetUniform1f.bind(this);
  this.createAndSetUniform3f = createAndSetUniform3f.bind(this);
}

function sendAllUniforms(gl, prog)
{
  this.uniforms.forEach((uniform) => {
    uniform.sendUniform(gl, prog);
  });
}

function addUniform(uniform)
{
  this.addUniform.push(uniform);
}

function createAndSetMatrix4fv(uniformLocation, matrix){
  var uniform = new UniformMatrix4fv(uniformLocation, matrix);
  this.uniforms.push(uniform);
  return uniform;
}

function createAndSetUniform1f(uniformName, floatNumber)
{
  var uniform = new Uniform1f(uniformName, floatNumber);
  this.uniforms.push(uniform);
  return uniform;
}

function createAndSetUniform3f(uniformName, floatNumber1, floatNumber2, floatNumber3)
{
  var uniform = new Uniform3f(uniformName, floatNumber1, floatNumber2, floatNumber3);
  this.uniforms.push(uniform);
  return uniform;
}
