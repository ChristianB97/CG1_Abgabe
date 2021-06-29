import { initStringToGLEnum } from "./glStringToEnumID.js"

var canvas;
export var gl;

var vertexBufferObject;

export function tryInitiatingGL(canvas)
{
  if (gl==null)
  {
    console.log("gl");
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

export async function createAndGetProgram(vertexShaderPromiseText, fragmentShaderPromiseText)
{
  var prog = gl.createProgram();
  await setShader(prog, vertexShaderPromiseText, gl.VERTEX_SHADER);
  await setShader(prog, fragmentShaderPromiseText, gl.FRAGMENT_SHADER);

  gl.linkProgram(prog);



  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
  {
    console.error('ERROR linking program!', gl.getProgramInfoLog(prog));
    return;
  }
  gl.validateProgram(prog);

  return prog;
}

async function setShader(prog, shaderName, glShaderIdentifier)
{
  var shader = gl.createShader(glShaderIdentifier);
  var response = await fetch(shaderName);
  await response.text().then(function(text){
    gl.shaderSource(shader, text);
  });

  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    console.error(glShaderIdentifier + ": Error compiling vertex Shader!", gl.getShaderInfoLog(shader));
    return;
  }
  gl.attachShader(prog, shader);
}

export function createAndGetTexture(textureHolder)
{
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  let glTexture = gl.createTexture();
  let imageProperties = textureHolder.imageProperties;
  let glParameters = textureHolder.glTexParameteris;

  gl.bindTexture(textureHolder.glBindingType, glTexture);
  glParameters.forEach((set, i) => {
    gl.texParameteri(set[0], set[1], set[2]);
  });
  gl.activeTexture(gl.TEXTURE0);

  for(var i = 0; i < imageProperties.length; i++) {
    if (imageProperties[i].glTexture==null){
      gl.bindTexture(textureHolder.glBindingType, glTexture);
      var glTexImage2DParameters = imageProperties[i].texImage2DParameters;
      gl.texImage2D(glTexImage2DParameters[0], 0, glTexImage2DParameters[1], glTexImage2DParameters[2], glTexImage2DParameters[3], imageProperties[i].image);
    }
  }
  return glTexture;
}
