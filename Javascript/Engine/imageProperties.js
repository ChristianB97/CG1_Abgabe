import { getGLEnumArrayFromStringArray } from "./glStringToEnumID.js";
import { getImage } from "./objFileLoader.js";
import { ActionEvent } from "./actionEvent.js";

var defaultTexImageParameters = ["TEXTURE_2D", "RGBA", "RGBA", "UNSIGNED_BYTE"]

export function ImageProperties(imageLocation, texImage2DParameters)
{
  if (texImage2DParameters==null){
    texImage2DParameters = defaultTexImageParameters;
  }
  this.texImage2DParameters = getGLEnumArrayFromStringArray(texImage2DParameters);
  this.setTexImage2DParameters = function(parameters) { this.texImage2DParameters = parameters; }
  this.getImage = null;
  this.onImageLoaded = new ActionEvent();
  this.imageLocation = imageLocation;
  getImage(imageLocation, setImage.bind(this));
}

function setImage(image){
  this.image = image;
  this.onImageLoaded.invoke(this);
}
