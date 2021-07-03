export function RectTransform(canvasWidth, canvasHeight)
{
  this.obj = null;
  this.position = [0,0];
  this.scaleValue = [1,1];
  this.canvasHeight = canvasHeight;
  this.canvasWidth = canvasWidth;
  this.imageWidth = null;
  this.imageHeight = null;;

  this.scale = scale.bind(this);
  this.setPosition = setPosition.bind(this);
  this.setPropertiesCallback = setPropertiesFromMeshRenderer.bind(this);
}

function setPropertiesFromMeshRenderer(meshRenderer)
{
  this.imageWidth = meshRenderer.textureHolder.sizeOfLastTexture[1];
  this.imageHeight = meshRenderer.textureHolder.sizeOfLastTexture[0];
  this.obj = meshRenderer.objectData;
  initRectTransform.call(this);
}

export async function initRectTransform()
{
  var scaleRightAfterFetch = [this.scaleValue[0], this.scaleValue[1]];
  scaleToCorrectRatio.call(this);
  this.scale([1,[-1]]);
  recreateOperationsWhileFetching.call(this, scaleRightAfterFetch);
}

function recreateOperationsWhileFetching(scaleRightAfterFetch)
{
  scaleVBO(this.obj, scaleRightAfterFetch)
  var translation = calculateTranslation([0,0], this.position);
  translateVBO(this.obj, translation);
}

function scaleToCorrectRatio()
{
  var xRatioImageToCancas = this.imageWidth / this.canvasWidth;
  var yRatioImageToCancas = this.imageHeight / this.canvasHeight;
  var xScale = 1;
  var yScale = 1;
  if (!(xRatioImageToCancas==yRatioImageToCancas)){
    if (xRatioImageToCancas>yRatioImageToCancas){
      yScale = this.canvasHeight / this.canvasWidth;
    }
    else{
      xScale = this.canvasWidth / this.canvasHeight;
    }
  }
  this.scale([xScale, yScale]);
}

function setPosition(newPosition)
{
  var translation = calculateTranslation(this.position, newPosition);
  translateVBO(this.obj, translation);
  this.position = newPosition;
}

function calculateTranslation(currentPosition, newPosition)
{
  var translation = [0,0];
  translation[0] = newPosition[0] - currentPosition[0];
  translation[1] = newPosition[1] - currentPosition[1];
  return translation;
}

function translateVBO(obj, translation)
{
  if (obj!=null){
    for (var i=0; i<obj.length; i=i+8)
    {
      obj[i]+= translation[0];
      obj[i+1]+= translation[1];
    }
  }
}

function scale(scaleVec2)
{
  var currPosition = [this.position[0], this.position[1]];
  this.setPosition([0,0]);
  var scaleX = this.scaleValue[0] * (scaleVec2[0]/this.scaleValue[0]);
  var scaleY = this.scaleValue[1] * (scaleVec2[1]/this.scaleValue[1]);
  this.setPosition(currPosition);
  scaleVBO(this.obj, [scaleX, scaleY]);
  this.scaleValue[0]*=scaleVec2[0];
  this.scaleValue[1]*=scaleVec2[1];
}

function scaleVBO(obj, scaleVec2)
{
  if(obj!=null)
  {
    for (var i=0; i<obj.length; i=i+8)
    {
      obj[i]*= scaleVec2[0];
      obj[i+1]*= scaleVec2[1];
    }
  }
}
