import { ObjectData } from "./objectData.js";

export async function convertOBJToVerticesData(objFileName, callback)
{
  var promise = getTextOfFile(objFileName);
  var v = [];
  var vn = [];
  var vt = [];
  var vIndices = [];
  var vnIndices = [];
  var vtIndices = []

  var vbo = [];

  await promise.then(function(text){
    var lines = text.split(/\r*\n/);
    lines.forEach((line) =>
    {
      var lineParts = line.trim().split(/\s+/);
      var type = lineParts.shift();
      if (type == "v")
      {
        v.push([parseFloat(lineParts[0]),parseFloat(lineParts[1]),parseFloat(lineParts[2])]);
      }
      else if (type == "vn")
      {
        vn.push([parseFloat(lineParts[0]),parseFloat(lineParts[1]),parseFloat(lineParts[2])]);
      }
      else if (type == "vt")
      {
        vt.push([parseFloat(lineParts[0]),parseFloat(lineParts[1])]);
      }
      else if (type == "f")
      {
        lineParts.forEach((part) => {
          part = part.split('/');
          v[part[0]-1].forEach( (x) => {parseInt(vbo.push(x))} );
          vn[part[2]-1].forEach( (x) => {parseInt(vbo.push(x))} );
          vt[part[1]-1].forEach( (x) => {parseInt(vbo.push(x))} );
        });
      }
    });
    callback(vbo);
  });
}

async function getResponse(fileLocation)
{
  return await fetch(fileLocation);
}

export async function getImage(fileLocation, callback)
{
  var promise = await getResponse(fileLocation);
  var image = await promise.blob().then();
  var bitmap = await createImageBitmap(image);
  callback(bitmap);
}

export async function getTextOfFile(fileLocation)
{
  var promise = await getResponse(fileLocation);
  return promise.text().then();
}
