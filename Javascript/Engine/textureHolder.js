import { ImagePropertyPool } from "./imagePropertyPool.js";
import { convertStringToGLEnumID, getGLEnumArraysFromStringArrays, getGLEnumArrayFromStringArray } from "./glStringToEnumID.js";
import { createAndGetTexture } from "./glUtility.js";
import { ActionEvent } from "./actionEvent.js";
import { gl } from "./glUtility.js";

var defaultBindingType = "TEXTURE_2D";


export function TextureHolder()
{
  this.glTextures = [];
  this.video = null;
  this.videoTexture = null;
  this.sizeOfLastTexture = [0,0];
  this.glTexParameteris = [];
  this.glBindingType = null;
  this.setBindingTypeAndParameteris = setBindingTypeAndParameteris.bind(this);
  this.isCurrentlyLoading = false;
  this.setTextureByImageLocation = setTextureByImageLocation.bind(this);
  this.setTextureByImageLocations = setTextureByImageLocations.bind(this);
  this.setTextureByVideoLocation = setTextureByVideoLocation.bind(this);

  this.onTextureCreated = new ActionEvent();
  this.setTextureAsActive = setTextureAsActive.bind(this);

  this.setBindingTypeAndParameteris(defaultBindingType, getDefaultParameteris());
}

function setTextureAsActive(gl)
{
  gl.bindTexture(this.glBindingType, null);
  this.glTextures.forEach((glTexture, i) => {
    gl.activeTexture(gl.TEXTURE0+i);
    gl.bindTexture(this.glBindingType, this.glTextures[i]);
  });
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function setTextureAsActiveVideo(gl)
{
  gl.bindTexture(this.glBindingType, null);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(this.video));

  this.glTextures.forEach((glTexture, i) => {
    gl.activeTexture(gl.TEXTURE0+i+1);
    gl.bindTexture(this.glBindingType, glTexture);
    var location = gl.getUniformLocation(program, "sampler[" + i + "]");
    gl.uniform1i(location, i);
  });
}

async function setTextureByImageLocation(imageLocation, texImage2DParameters)
{
  this.glTextures.push(null);
  var imagePropertyPool = new ImagePropertyPool(this.glTextures.length-1);
  imagePropertyPool.setImageProperty(imageLocation, texImage2DParameters);
  imagePropertyPool.onImagePropertiesLoaded.addEventListener(createTexture.bind(this));
  this.isCurrentlyLoading = true;
}

async function setTextureByImageLocations(imageLocationsWithParameters)
{
  var imagePropertyPool = new ImagePropertyPool(this.glTextures.length-1);
  imagePropertyPool.setImageProperties(imageLocationsWithParameters);
  imagePropertyPool.onImagePropertiesLoaded.addEventListener(createTexture.bind(this));
  this.isCurrentlyLoading = true;
}

async function setTextureByVideoLocation(id)
{
  this.video = id;
  this.setTextureAsActive = setTextureAsActiveVideo.bind(this);
  this.videoTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(id));
}


function createTexture(imagePropertyPool)
{
  this.sizeOfLastTexture=imagePropertyPool.lastImageSize;
  this.isCurrentlyLoading = false;
  var texture = createAndGetTexture(imagePropertyPool.loadedImageProperties, this.glBindingType, this.glTexParameteris, imagePropertyPool.position);
  this.glTextures[imagePropertyPool.position] = texture;
  this.glTextures.push();
  this.onTextureCreated.invoke();
}

function setBindingTypeAndParameteris(stringBindingType, stringParameteris){
  this.glBindingType = convertStringToGLEnumID(stringBindingType);
  this.glTexParameteris = getGLEnumArraysFromStringArrays(stringParameteris);
  this.glTexParameteris = getTexParamterisWithBindingType(this.glBindingType, this.glTexParameteris);
}

function getDefaultParameteris(){
  return [
    ["TEXTURE_WRAP_S",      "REPEAT"],
    ["TEXTURE_WRAP_T",      "REPEAT"],
    ["TEXTURE_MIN_FILTER",  "LINEAR"],
    ["TEXTURE_MAG_FILTER",  "LINEAR"]
  ];
}

function getTexParamterisWithBindingType(stringBindingType, texParameteris)
{
  texParameteris.forEach((texParameteri, i) =>
  {
      texParameteri.unshift(stringBindingType);
  });
  return texParameteris;
}
