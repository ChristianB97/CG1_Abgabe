import { ImageProperties } from "./imageProperties.js";
import { convertStringToGLEnumID, getGLEnumArraysFromStringArrays, getGLEnumArrayFromStringArray } from "./glStringToEnumID.js";
import { createAndGetTexture } from "./glUtility.js";
import { ActionEvent } from "./actionEvent.js";

var defaultBindingType = "TEXTURE_2D";


export function TextureHolder()
{
  this.glTexture = null;
  this.imageProperties = [];
  this.unloadedImageProperties = [];
  this.glTexParameteris = [];
  this.glBindingType = null;
  this.setBindingTypeAndParameteris = setBindingTypeAndParameteris.bind(this);
  this.isEverythingLoaded = isEverythingLoaded.bind(this);
  this.addImage = addImage.bind(this);
  this.setBindingTypeAndParameteris(defaultBindingType, getDefaultParameteris());
  this.onTextureCreated = new ActionEvent();
  this.setTextureAsActive = setTextureAsActive.bind(this);
}

function setTextureAsActive(gl)
{
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(this.glBindingType, this.glTexture);
}

function addImage(imageLocation, texImage2DParameters)
{
  var imageProperty = new ImageProperties(imageLocation, texImage2DParameters);
  imageProperty.onImageLoaded.addEventListener(onImagePropertyLoaded.bind(this));
  this.unloadedImageProperties.push(imageProperty);
}

function onImagePropertyLoaded(loadedProperty)
{
  var isFound = false;
  var i = 0;
  var size = this.unloadedImageProperties.length;
  while(i<=size&&!isFound)
  {
    if (loadedProperty==this.unloadedImageProperties[i])
    {
      this.imageProperties.push(this.unloadedImageProperties[i]);
      this.unloadedImageProperties.splice(i,1);
      isFound = true;
    }
    i++;
  }
  tryCreatingTexture.bind(this).call();
}

function tryCreatingTexture()
{

  var size = this.unloadedImageProperties.length;
  if(size==0)
  {
    console.log(this.imageProperties);
    this.glTexture = createAndGetTexture(this);
    this.onTextureCreated.invoke();
  }
}

function isEverythingLoaded()
{
  var areImagesLoaded = this.unloadedImageProperties.length==0;
  var isTextureCreated = this.glTexture!=null;
  if (this.imageProperties.length>0||this.unloadedImageProperties.length>0)
  {
    return areImagesLoaded&&isTextureCreated;
  }
  else
  {
    return true;
  }
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
