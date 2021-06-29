import { UniformMatrix4fv } from "./UniformsAndAttributes/uniformMatrix4fv.js";

export function UniformPool()
{
  this.uniforms = [];
  this.addUniform = addUniform.bind(this);
  this.createAndSetMatrix4fv = createAndSetMatrix4fv.bind(this);
  this.sendAllUniforms = sendAllUniforms.bind(this);
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
}

function createAndSetUniform1f(uniformName, floatNumber)
{

}
