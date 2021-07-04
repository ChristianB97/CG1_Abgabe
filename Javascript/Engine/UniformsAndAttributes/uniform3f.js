export function Uniform3f(location, value1, value2, value3)
{
  this.location = location;
  this.value1 = value1;
  this.value2 = value2;
  this.value3 = value3;
  this.sendUniform = sendUniform3f.bind(this);
}

function sendUniform3f(gl, prog)
{
  var uniformfLocation = gl.getUniformLocation(prog, this.location);
  gl.uniform3f(uniformfLocation, this.value1, this.value2, this.value3);
}
