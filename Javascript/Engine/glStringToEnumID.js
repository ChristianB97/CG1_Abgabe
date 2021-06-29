var dictionaryMapper;

export function initStringToGLEnum(gl)
{
  mapDictionary(gl);
}

export function convertStringToGLEnumID(stringToConvert)
{
  return dictionaryMapper[stringToConvert];
}

export function getGLEnumArrayFromStringArray(stringEnumArray)
{
  var glEnumArray = [];
  for (var j = 0; j < stringEnumArray.length; j++)
  {
    glEnumArray.push(convertStringToGLEnumID(stringEnumArray[j]));
  }
  return glEnumArray;
}

export function getGLEnumArraysFromStringArrays(stringEnumArrays)
{
  var glEnumArrays = [];
  for(var i = 0; i < stringEnumArrays.length; i++)
  {
    var stringEnumArray = stringEnumArrays[i];
    var glEnumArray = getGLEnumArrayFromStringArray(stringEnumArray);
    glEnumArrays.push(glEnumArray);
  };
  return glEnumArrays;
}

function mapDictionary(gl)
{
  dictionaryMapper =
  {
    "TEXTURE_WRAP_S":               gl.TEXTURE_WRAP_S,
    "TEXTURE_WRAP_T":               gl.TEXTURE_WRAP_T,
    "TEXTURE_WRAP_R":               gl.TEXTURE_WRAP_R,
    "TEXTURE_MIN_FILTER":           gl.TEXTURE_MIN_FILTER,
    "TEXTURE_MAG_FILTER":           gl.TEXTURE_MAG_FILTER,
    "LINEAR":                       gl.LINEAR,
    "REPEAT":                       gl.REPEAT,
    "CLAMP_TO_EDGE":                gl.CLAMP_TO_EDGE,
    "NEAREST":                      gl.NEAREST,
    "TEXTURE_2D":                   gl.TEXTURE_2D,
    "TEXTURE_CUBE_MAP":             gl.TEXTURE_CUBE_MAP,
    "RGBA":                         gl.RGBA,
    "UNSIGNED_BYTE":                gl.UNSIGNED_BYTE,
    "TEXTURE_CUBE_MAP_NEGATIVE_X":  gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    "TEXTURE_CUBE_MAP_POSITIVE_X":  gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    "TEXTURE_CUBE_MAP_POSITIVE_Y":  gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    "TEXTURE_CUBE_MAP_NEGATIVE_Y":  gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    "TEXTURE_CUBE_MAP_NEGATIVE_Z":  gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
    "TEXTURE_CUBE_MAP_POSITIVE_Z":  gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    "TEXTURE_CUBE_MAP":             gl.TEXTURE_CUBE_MAP,
    "FALSE":                        gl.FALSE,
    "TRUE":                         gl.TRUE,
    "FLOAT":                        gl.FLOAT
  }
}
