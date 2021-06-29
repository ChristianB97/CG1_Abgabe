export function UniformMatrix4fv(location, matrix)
{
  this.location = location;
  this.matrix = matrix;
  this.sendUniform = sendUnifromMatrix4fv.bind(this);
}

function sendUnifromMatrix4fv(gl, prog)
{
  var matUniformLocation = gl.getUniformLocation(prog, this.location);
  gl.uniformMatrix4fv(matUniformLocation, gl.FALSE, this.matrix);
}
