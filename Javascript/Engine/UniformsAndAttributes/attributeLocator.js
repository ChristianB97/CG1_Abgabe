import { convertStringToGLEnumID } from "../glStringToEnumID.js";

export function AttributeLocator(location, size, type, normalized, stride, offset)
{
  this.location = location;
  this.size = size;
  this.type = convertStringToGLEnumID(type);
  this.normalized = convertStringToGLEnumID(normalized);
  this.stride = stride;
  this.offset = offset;
  this.sendAttributeLocation = sendAttributeLocation.bind(this);
}

function sendAttributeLocation(gl, prog)
{
  var attributeLocation = gl.getAttribLocation(prog, this.location);
  gl.vertexAttribPointer(attributeLocation,this.size,this.type,this.normalized,this.stride,this.offset);
  gl.enableVertexAttribArray(attributeLocation);
}
