import { initStringToGLEnum } from "./glStringToEnumID.js"

var canvas;
export var gl;

var vertexBufferObject;

export function tryInitiatingGL(canvas)
{
  if (gl==null)
  {
    gl = canvas.getContext("webgl2", { alpha: false });

    if (!gl)
    {
      gl = canvas.getContext("experimental-webgl");
    }
    if (!gl)
    {
      alert("Dein Browser unterstützt kein Web");
    }
    initStringToGLEnum(gl);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
  }
  return gl;
}

export function createAndGetProgram(vertexShaderText, fragmentShaderText)
{
  var prog = gl.createProgram();
  setShader(prog, vertexShaderText, gl.VERTEX_SHADER);
  setShader(prog, fragmentShaderText, gl.FRAGMENT_SHADER);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
  {
    console.error('ERROR linking program!', gl.getProgramInfoLog(prog));
    return;
  }
  gl.validateProgram(prog);
  return prog;
}

function setShader(prog, shaderText, glShaderIdentifier)
{
  var shader = gl.createShader(glShaderIdentifier);
  gl.shaderSource(shader, shaderText);

  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    console.error(glShaderIdentifier + ": Error compiling vertex Shader!", gl.getShaderInfoLog(shader));
    return;
  }
  gl.attachShader(prog, shader);
}

export function createAndGetTexture(imageProperties, glBindingType, glParameters, slot)
{
  let glTexture = gl.createTexture();
  if (slot<0){
    slot=0;
  }
  gl.activeTexture(gl.TEXTURE0+slot);
  gl.bindTexture(glBindingType, glTexture);
  glParameters.forEach((set, i) => {
    gl.texParameteri(set[0], set[1], set[2]);
  });


  for(var i = 0; i < imageProperties.length; i++) {
    if (imageProperties[i].glTexture==null){
      gl.bindTexture(glBindingType, glTexture);
      var glTexImage2DParameters = imageProperties[i].texImage2DParameters;
      gl.texImage2D(glTexImage2DParameters[0], 0, glTexImage2DParameters[1], glTexImage2DParameters[2], glTexImage2DParameters[3], imageProperties[i].image);
    }
  }
  return glTexture;
}

export function createAndGetEmptyTexture(textureHeight, textureWidth)
{

}
