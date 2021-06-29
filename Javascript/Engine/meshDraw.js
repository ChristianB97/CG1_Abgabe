export function MeshDraw(textureSetter, shaderContainer, vboTriangleCount)
{
  this.textureSetter = textureSetter;
  this.draw = function(){};
  this.setDrawingActive = setDrawingActive.bind(this);
  this.shaderContainer = shaderContainer;
  this.vbo = null;
}

function setDrawingActive()
{
  this.draw=draw.bind(this);
}

function draw(gl, prog, cameraUniformPool)
{
  this.textureSetter(gl);
  this.shaderContainer.attributeLocatorPool.sendAllAttributeLocations(gl, prog);
  this.shaderContainer.uniformPool.sendAllUniforms(gl, prog);
  cameraUniformPool.sendAllUniforms(gl, prog);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vbo), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, this.vbo.length/8);
}
