import { ActionEvent } from "./actionEvent.js";
import { ImageProperties } from "./imageProperties.js";

export function ImagePropertyPool()
{
  this.loadedImageProperties = [];
  this.unloadedImageProperties = [];
  this.setImageProperty = setImageProperty.bind(this);
  this.setImageProperties = setImageProperties.bind(this);

  this.onImagePropertiesLoaded = new ActionEvent();
}

async function setImageProperty(imageLocation, parameters)
{
  var imageProperty = new ImageProperties(imageLocation, parameters);
  this.unloadedImageProperties.push(imageProperty);
  imageProperty.onImageLoaded.addEventListener(addToLoadedProperties.bind(this));
}

async function setImageProperties(imageLocationsWithParameters)
{
  var currentImageProperties = [];
  console.log(imageLocationsWithParameters);
  for (var i = 0; i<imageLocationsWithParameters.length; i++) {

    var imageProperty = new ImageProperties(imageLocationsWithParameters[i][0], imageLocationsWithParameters[i][1]);
    this.unloadedImageProperties.push(imageProperty);
    currentImageProperties.push(imageProperty)
  }
  currentImageProperties.forEach((imageProperty) => {
    imageProperty.onImageLoaded.addEventListener(addToLoadedProperties.bind(this));
  });
}

function addToLoadedProperties(loadedImageProperty)
{
  this.loadedImageProperties.push(loadedImageProperty);
  this.unloadedImageProperties.forEach((unloadedImageProperty, i) => {
    if (loadedImageProperty==unloadedImageProperty){
      this.unloadedImageProperties.splice(i,1);
    }
  });
  tryInvokeOnImagePropertiesLoaded.call(this);
}

function tryInvokeOnImagePropertiesLoaded()
{
  if(this.unloadedImageProperties.length==0&&this.loadedImageProperties.length>0)
  {
    this.onImagePropertiesLoaded.invoke(this);
  }
}
