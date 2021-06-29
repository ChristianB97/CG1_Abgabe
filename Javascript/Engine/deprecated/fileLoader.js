export function convertOBJToVerticesData(objFileName)
{
  var promise = GetobjDataPromise(objFileName);
  var objData = new Object();
  objData.v = [];
  objData.vn = [];
  objData.vt = [];
  objData.f = [];
  objData.vIndices = [];
  objData.vnIndices = [];
  objData.vtIndices = []


  promise.then(function(text){
    var lines = text.split(/\r*\n/);
    lines.forEach((line, i) =>
    {
      var lineParts = line.trim().split(/\s+/);
      if (lineParts[0] == "v")
      {
        lineParts.shift();
        objData.v.push(parseFloat(lineParts[0]));
        objData.v.push(parseFloat(lineParts[1]));
        objData.v.push(parseFloat(lineParts[2]));
      }
      else if (lineParts[0] == "vn")
      {
        lineParts.shift();
        objData.vn.push(parseFloat(lineParts[0]));
        objData.vn.push(parseFloat(lineParts[1]));
        objData.vn.push(parseFloat(lineParts[2]));
      }
      else if (lineParts[0] == "vt")
      {
        lineParts.shift();
        objData.vt.push(parseFloat(lineParts[0]));
        objData.vt.push(parseFloat(lineParts[1]));
        objData.vt.push(parseFloat(lineParts[2]));
      }
      else if (lineParts[0] == "f")
      {
        lineParts.shift();
        lineParts.forEach((part, i) =>
        {
          var indices = part.split("/");
          objData.vIndices.push(parseInt(indices[0])-1);
          objData.vnIndices.push(parseInt(indices[1])-1);
          objData.vtIndices.push(parseInt(indices[2])-1);
        });
      }
    });
  });
  return objData;
}

async function GetobjDataPromise(fileName)
{
  return await fetch(fileName)
  .then(response => response.text());
}
