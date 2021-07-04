export function Uniform1f(location, value)
{
  this.location = location;
  this.value = value;
  this.sendUniform = sendUniform1f.bind(this);
}

function sendUniform1f(gl, prog)
{
  var uniformfLocation = gl.getUniformLocation(prog, this.location);
  gl.uniform1f(uniformfLocation, this.value);
}
