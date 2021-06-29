import { AttributeLocator } from "./UniformsAndAttributes/attributeLocator.js";

export function AttributeLocatorPool()
{
  this.attributeLocators = [];

  this.sendAllAttributeLocations = sendAllAttributeLocations.bind(this);
  this.createAndAddAttribute = createAndAddAttribute.bind(this);
  this.createAndSetDefaultAttributeLocators = createAndSetDefaultAttributeLocators.bind(this);
  this.deleteAttributeLocator = deleteAttributeLocator.bind(this);

  //TO DO AUSLAGERN
  this.createAndSetDefaultAttributeLocators("vertPosition", "vertNormal", "vertTexCoord");
}

function sendAllAttributeLocations(gl, prog)
{
  this.attributeLocators.forEach((attributeLocator) => {
    attributeLocator.sendAttributeLocation(gl, prog);
  });
}

function createAndAddAttribute(location, size, type, normalized, stride, offset)
{
  var attribute = new AttributeLocator(location, size, type, normalized, stride, offset);
  this.attributeLocators.push(attribute);
}

function createAndSetDefaultAttributeLocators(vertPositionLocation, vertNormalLocation, vertTexCoord)
{
  this.createAndAddAttribute(vertPositionLocation, 3, "FLOAT", "FALSE", 8*Float32Array.BYTES_PER_ELEMENT, 0);
  this.createAndAddAttribute(vertNormalLocation, 3, "FLOAT", "TRUE", 8*Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
  this.createAndAddAttribute(vertTexCoord, 2, "FLOAT", "TRUE", 8*Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT);
}

function deleteAttributeLocator(location)
{
  this.attributeLocators.forEach((attributeLocator, i) => {
    if (this.attributeLocator.location==location)
    {
      this.attributeLocators.splice(i,1);
    }
  });
}
