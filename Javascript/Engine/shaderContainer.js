import { AttributeLocatorPool } from "./attributeLocatorPool.js";
import { UniformPool } from "./uniformPool.js";

export function ShaderContainer(vertexShaderLocation, fragmentShaderLocation)
{
  this.vertexShader = vertexShaderLocation;
  this.fragmentShader = fragmentShaderLocation;
  this.attributeLocatorPool = new AttributeLocatorPool();
  this.uniformPool = new UniformPool();
}
