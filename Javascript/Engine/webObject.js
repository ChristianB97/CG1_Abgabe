import { Transform } from "./transform.js";
import { MeshRenderer } from "./meshRenderer.js";
import { UIRenderer } from "./uiRenderer.js";
import { RectTransform } from "./rectTransform.js";
import { getImage } from "./objFileLoader.js";
import { convertOBJToVerticesData } from "./objFileLoader.js";

export function WebObject()
{
  this.components = {};
  this.addMeshRendererAndTransform = create3DObjectComponents.bind(this);
  this.addUIRendererAndRectTransform = create2DObjectComponents.bind(this);
  this.getComponent = getComponent.bind(this);
}

function getComponent(componentName){
  if (this.components.hasOwnProperty(componentName))
  {
    return this.components[componentName];
  }
  return null;
}

function create2DObjectComponents(canvas, image, drawingOrder, vertexShader, fragmentShader){
  if (!this.components.hasOwnProperty(MeshRenderer.name))
  {
    if (vertexShader==null){
      vertexShader = "Shader/vertexShaderUI.glsl";
      fragmentShader = "Shader/fragmentShaderUI.glsl";
    }
    var meshRenderer = this.components[MeshRenderer.name] = new MeshRenderer("OBJ/mirror.obj", null, vertexShader, fragmentShader);
    var rectTransform = this.components[RectTransform.name] = new RectTransform(canvas.width, canvas.height);
    if (image!=null){
      meshRenderer.textureHolder.setTextureByImageLocation(image);
      meshRenderer.onDataLoaded.addEventListener(rectTransform.setPropertiesCallback);
    }

  }
}

function create3DObjectComponents(objFileName, vertexShader, fragmentShader){
  if (!this.components.hasOwnProperty(MeshRenderer.name))
  {
    this.components[Transform.name] = new Transform();
    this.components[MeshRenderer.name] = new MeshRenderer(objFileName, this.components["Transform"], vertexShader, fragmentShader);
  }
}
