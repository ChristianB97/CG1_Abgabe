import { convertOBJToVerticesData } from "./objFileLoader.js";
import { TextureHolder } from "./textureHolder.js";

export function UIRenderer(image, depth, vertexShaderName, fragmentShaderName, obj)
{
  this.objectData = obj;
  this.vertexShaderName = vertexShaderName;
  this.depth = depth;
  this.fragmentShaderName = fragmentShaderName;
  console.log(this.vertexShaderName + " " + this.fragmentShaderName);
  this.textureHolder = new TextureHolder();
  this.textureHolder.addImage(image);
  GetDataAndAddToEnvironment(this, "OBJ/mirror.obj");
}

async function GetDataAndAddToEnvironment(uiRenderer, objFileName)
{
  addUIRenderer(uiRenderer);
}
