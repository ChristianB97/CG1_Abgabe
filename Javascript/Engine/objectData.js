export function ObjectData(vertices, verticeIndices, normals, normalsIndices, textureCoords, texutreCoordsIndices)
{
  this.vbo = createVBO(vertices, normals, textureCoords);
  this.verticeIndices = verticeIndices;
  this.normalsInices = normalsIndices;
  this.textureCoordsIndices = texutreCoordsIndices;
}

function createVBO(v, vn, vt)
{
  var vboLength = v.length + vn.length + vt.length;
  var vbo = [vboLength];
  for (var i = 0; i < v.length; i++)
  {
    var vboIndex = i*8;
    vbo[vboIndex] = v[i][0];;
    vbo[vboIndex+1] = v[i][1];
    vbo[vboIndex+2] = v[i][2];
    vbo[vboIndex+3] = vn[i][0];
    vbo[vboIndex+4] = vn[i][1];
    vbo[vboIndex+5] = vn[i][2];
    vbo[vboIndex+6] = vt[i][0];
    vbo[vboIndex+7] = vt[i][1];
  }
  return vbo;
}
