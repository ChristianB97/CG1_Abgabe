const CLEAR_COLOR = [1, 0.85, 0.8, 1];
var prog;

var test = 0;
export function setTexture(gl, glTexture, glBindingType)
{
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(glBindingType, glTexture);
}



export function clear(gl)
{
  gl.clearColor(CLEAR_COLOR[0], CLEAR_COLOR[1], CLEAR_COLOR[2], CLEAR_COLOR[3]);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export function setProgram(gl, _prog)
{
  prog = _prog;
  gl.useProgram(prog);
}

export async function draw3D(gl, vbo, objectUniformPool, attributeLocatorPool, cameraUniformPool)
{
  attributeLocatorPool.sendAllAttributeLocations(gl, prog);
  objectUniformPool.sendAllUniforms(gl, prog);
  cameraUniformPool.sendAllUniforms(gl, prog);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vbo), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, vbo.length/8);
}

export async function drawUI(gl, vbo, depth)
{

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vbo), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(prog, "vertPosition");
  var uvAttribLocation = gl.getAttribLocation(prog, "vertTexCoord");
  gl.vertexAttribPointer(positionAttribLocation,3,gl.FLOAT,gl.FALSE,8 * Float32Array.BYTES_PER_ELEMENT,0);
  gl.vertexAttribPointer(uvAttribLocation,2,gl.FLOAT,gl.TRUE,8 * Float32Array.BYTES_PER_ELEMENT,6 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(uvAttribLocation);


  gl.drawArrays(gl.TRIANGLES, 0, vbo.length/8);
}

export function drawPostProcessing(textures, prog)
{
  gl.useProgram(prog);
  textures.forEach((texture, i) => {
    gl.activeTexture(gl.TEXTURE0+i);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  });
  gl.drawArrays(gl.TRIANGLES, 0, 0);
}
