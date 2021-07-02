import { ImagePropertyPool } from "./imagePropertyPool.js";
import { convertStringToGLEnumID, getGLEnumArraysFromStringArrays, getGLEnumArrayFromStringArray } from "./glStringToEnumID.js";
import { createAndGetTexture } from "./glUtility.js";
import { ActionEvent } from "./actionEvent.js";

var defaultBindingType = "TEXTURE_2D";


export function TextureHolder()
{
  this.glTextures = [];
  this.glTexParameteris = [];
  this.glBindingType = null;
  this.setBindingTypeAndParameteris = setBindingTypeAndParameteris.bind(this);
  this.isCurrentlyLoading = false;
  this.setTextureByImageLocation = setTextureByImageLocation.bind(this);
  this.setTextureByImageLocations = setTextureByImageLocations.bind(this);

  this.onTextureCreated = new ActionEvent();
  this.setTextureAsActive = setTextureAsActive.bind(this);

  this.setBindingTypeAndParameteris(defaultBindingType, getDefaultParameteris());
}

function setTextureAsActive(gl)
{
  this.glTextures.forEach((glTexture, i) => {
    gl.activeTexture(gl.TEXTURE0+i);
    gl.bindTexture(this.glBindingType, glTexture);
  });
}

async function setTextureByImageLocation(imageLocation, texImage2DParameters)
{
  var imagePropertyPool = new ImagePropertyPool();
  imagePropertyPool.setImageProperty(imageLocation, texImage2DParameters);
  imagePropertyPool.onImagePropertiesLoaded.addEventListener(createTexture.bind(this));
  this.isCurrentlyLoading = true;
}

async function setTextureByImageLocations(imageLocationsWithParameters)
{
  var imagePropertyPool = new ImagePropertyPool();
  imagePropertyPool.setImageProperties(imageLocationsWithParameters);
  imagePropertyPool.onImagePropertiesLoaded.addEventListener(createTexture.bind(this));
  this.isCurrentlyLoading = true;
}

function createTexture(imagePropertyPool)
{
  this.isCurrentlyLoading = false;
  this.glTextures.push(createAndGetTexture(imagePropertyPool.loadedImageProperties, this.glBindingType, this.glTexParameteris));
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
    ["TEXTURE_MIN_FILTER",  "NEAREST"],
    ["TEXTURE_MAG_FILTER",  "NEAREST"]
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
