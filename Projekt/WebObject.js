function WebObject(objFile, shaderFile)
{
  this.objFile = objFile;
  this.shaderFile = shaderFile;
  GetFileAsString();
};

async function GetFileAsString()
{
  fetch("/teapot.obj");
}

function DrawObject()
{

}
