import "./gl-matrix.js";

export function Transform()
{
  this.matrix = new Float32Array(16);

  this.identity = identity.bind(this);
  this.translate = translate.bind(this);
  this.rotate = rotate.bind(this);
  this.scale = scale.bind(this);
  this.getTranslation = getTranslation.bind(this);
  this.resetTranslation = resetTranslation.bind(this);

  this.identity();
}

function identity(){
  this.matrix = new Float32Array(16);
  this.matrix[0] = 1;
  this.matrix[5] = 1;
  this.matrix[10] = 1;
  this.matrix[15] = 1;
}

function getTranslation()
{
  return [this.matrix[12], this.matrix[13], this.matrix[14]];
}

function resetTranslation(){
  this.matrix[12] = 0;
  this.matrix[13] = 0;
  this.matrix[14] = 0;
}

function translate(vector3Transform)
{
  this.matrix[12] += vector3Transform[0];
  this.matrix[13] += vector3Transform[1];
  this.matrix[14] += vector3Transform[2];
}

function rotate(angle, vec3)
{
  glMatrix.mat4.rotate(this.matrix, this.matrix, angle, vec3)
  /*
  var copyMatrix=new Float32Array(16);
  this.matrix.forEach((item, i) => {
    copyMatrix[i] = item;
  });


  if (angle[0]!=0)
  {
    var xCos = Math.cos(angle[0]);
    var xSin = Math.sin(angle[0]);
    this.matrix[4] = (copyMatrix[4]*xCos)+(copyMatrix[8]*xSin);
    this.matrix[5] = (copyMatrix[5]*xCos)+(copyMatrix[9]*xSin);
    this.matrix[6] = (copyMatrix[6]*xCos)+(copyMatrix[10]*xSin);
    this.matrix[7] = (copyMatrix[7]*xCos)+(copyMatrix[11]*xSin);
    this.matrix[8] = (copyMatrix[8]*xCos)-(copyMatrix[4]*xSin);
    this.matrix[9] = (copyMatrix[9]*xCos)-(copyMatrix[5]*xSin);
    this.matrix[10] = (copyMatrix[10]*xCos)-(copyMatrix[6]*xSin);
    this.matrix[11] = (copyMatrix[11]*xCos)-(copyMatrix[7]*xSin);
  }
  if(angle[1]!=0)
  {
    var yCos = Math.cos(angle[1]);
    var ySin = Math.sin(angle[1]);
    this.matrix[0] = copyMatrix[0] * yCos - copyMatrix[8] * ySin;
    this.matrix[1] = copyMatrix[1] * yCos - copyMatrix[9] * ySin;
    this.matrix[2] = copyMatrix[2] * yCos - copyMatrix[10] * ySin;
    this.matrix[3] = copyMatrix[3] * yCos - copyMatrix[11] * ySin;
    this.matrix[8] = copyMatrix[0] * ySin + copyMatrix[8] * yCos;
    this.matrix[9] = copyMatrix[1] * ySin + copyMatrix[9] * yCos;
    this.matrix[10] = copyMatrix[2] * ySin + copyMatrix[10] * yCos;
    this.matrix[11] = copyMatrix[3] * ySin + copyMatrix[11] * yCos;
  }
  if(angle[2]!=0){
    var zCos = Math.cos(angle[2]);
    var zSin = Math.sin(angle[2]);
    this.matrix[0] = copyMatrix[0] * zCos + copyMatrix[4] * zSin;
    this.matrix[1] = copyMatrix[1] * zCos + copyMatrix[5] * zSin;
    this.matrix[2] = copyMatrix[2] * zCos + copyMatrix[6] * zSin;
    this.matrix[3] = copyMatrix[3] * zCos + copyMatrix[7] * zSin;
    this.matrix[4] = copyMatrix[4] * zCos - copyMatrix[0] * zSin;
    this.matrix[5] = copyMatrix[5] * zCos - copyMatrix[1] * zSin;
    this.matrix[6] = copyMatrix[6] * zCos - copyMatrix[2] * zSin;
    this.matrix[7] = copyMatrix[7] * zCos - copyMatrix[3] * zSin;
  }
  */
}

function scale(vector3Scale)
{
  var translation = this.getTranslation();
  this.resetTranslation();
  this.translate[this.matrix[12]]
  this.matrix[0] *= vector3Scale[0];
  this.matrix[5] *= vector3Scale[1];
  this.matrix[10] *= vector3Scale[2];
  this.translate(translation);
}
