document.addEventListener("DOMContentLoaded",function(){
    InitDemo();
});

import { WebObject } from "./Engine/webObject.js";
import { RenderPath } from "./Engine/renderPath.js";
import { update, deltaTime } from "./Engine/updateLoop.js";
import { horizontalAxis, verticalAxis, verticalMouseSpeed, horizontalMouseSpeed, isMouseDown, setDragField } from "./Engine/inputManager.js";

var renderPath;

var InitDemo = async function()
{
  var canvas = document.getElementById("game-surface");
  var defaultRenderPath = new RenderPath(canvas, false);
  renderPath = new RenderPath(canvas, true);

  var screenObject = new WebObject();
  screenObject.addUIRendererAndRectTransform(canvas);
  screenObject.getComponent("MeshRenderer").textureHolder.glTexture = renderPath.camera.frameBuffer.frameBufferTextureDefault;
  defaultRenderPath.canvas2D.addObject(screenObject);

  update.addEventListener(move);


  var box2 = new WebObject();
  box2.addMeshRendererAndTransform("OBJ/box.obj", "Shader/vertexShaderSkyBox.glsl", "Shader/fragmentShaderSkyBox.glsl");

  box2.getComponent("Transform").scale([8,8,8]);
  var boxMeshRenderer2 = box2.getComponent("MeshRenderer");
  boxMeshRenderer2.textureHolder.setBindingTypeAndParameteris("TEXTURE_CUBE_MAP",
    [["TEXTURE_WRAP_S",      "CLAMP_TO_EDGE"],
    ["TEXTURE_WRAP_T",      "CLAMP_TO_EDGE"],
    ["TEXTURE_WRAP_R",      "CLAMP_TO_EDGE"],
    ["TEXTURE_MIN_FILTER",        "NEAREST"],
    ["TEXTURE_MAG_FILTER",        "NEAREST"]]
  );
  boxMeshRenderer2.textureHolder.setTextureByImageLocations(
  [["Skybox/right.jpg", ["TEXTURE_CUBE_MAP_POSITIVE_X", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/left.jpg", ["TEXTURE_CUBE_MAP_NEGATIVE_X", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/top.jpg", ["TEXTURE_CUBE_MAP_POSITIVE_Y", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/bottom.jpg", ["TEXTURE_CUBE_MAP_NEGATIVE_Y", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/front.jpg", ["TEXTURE_CUBE_MAP_POSITIVE_Z", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/back.jpg", ["TEXTURE_CUBE_MAP_NEGATIVE_Z", "RGBA", "RGBA", "UNSIGNED_BYTE"]]]);
  renderPath.environment3D.addObject(box2);

  var suzanne = new WebObject();

  suzanne.addMeshRendererAndTransform("OBJ/suzanne.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");

  var suzanneMeshRenderer = suzanne.getComponent("MeshRenderer");
  suzanneMeshRenderer.textureHolder.setTextureByImageLocation("Textures/boot.png");
  suzanne.getComponent("Transform").translate([0,-3,-3]);
  renderPath.environment3D.addObject(suzanne);

  var teapot1 = new WebObject();
  teapot1.addMeshRendererAndTransform("OBJ/teapot.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");

  var teapotMeshRenderer1 = teapot1.getComponent("MeshRenderer");
  teapotMeshRenderer1.textureHolder.setTextureByImageLocation("Textures/boot.png");
  teapot1.getComponent("Transform").translate([3,0,0]);
  renderPath.transparencyLayer.addObject(teapot1);

  var teapot = new WebObject();
  teapot.addMeshRendererAndTransform("OBJ/teapot.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");

  var teapotMeshRenderer = teapot.getComponent("MeshRenderer");
  teapotMeshRenderer.textureHolder.setTextureByImageLocation("Textures/blattmuster.jpg");
  teapot.getComponent("Transform").translate([6,0,0]);
  renderPath.transparencyLayer.addObject(teapot);





  var girl = new WebObject();
  girl.addMeshRendererAndTransform("OBJ/amelia.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  girl.getComponent("Transform").translate([0,-4,0])
  girl.getComponent("Transform").scale([0.04,0.04,0.04])
  girl.getComponent("MeshRenderer").textureHolder.setTextureByImageLocation("Textures/crate.png");
  girl.getComponent("Transform").translate([0,-9,0]);
  girl.getComponent("Transform").scale([8,8,8]);
  renderPath.environment3D.addObject(girl);

  setDragField(document.getElementById("game-surface"));


  //var myFirstUI = new WebObject();
  //myFirstUI.addUIRendererAndRectTransform(canvas, "Textures/jojo.jfif", 0.3, "Shader/vertexShaderUI.glsl", "Shader/fragmentShaderUI.glsl");
  //renderPath.canvas2D.addObject(myFirstUI);
  //var uiRect = myFirstUI.getComponent("RectTransform");

  //uiRect.scale([0.4,0.4]);
  //uiRect.setPosition([0,0.79]);





  update.addEventListener(function()
  {
    var angle = 6 * 2 * Math.PI/1000;
    //girl.transform.rotate(angle, [1,0,0]);
    //suzanne.getComponent("Transform").rotate(angle, [0,1,0]);
  })

}






var dragLength;
var lastMousePosX=-1;
var lastMousePosY=-1;


function move()
{
  var speed = deltaTime / 100;
  var angle = 0.4*speed / 6 * 2 * Math.PI;
  renderPath.camera.translateCamera([horizontalAxis*speed,0,verticalAxis*speed]);
  if (isMouseDown)
  {
    var vec3= [verticalMouseSpeed, -horizontalMouseSpeed, 0];
    renderPath.camera.rotateCamera(angle,vec3);
  }

}


update.addEventListener(printFPS);

var fpsCounter = 0;
var nextSecond = 1;
function printFPS(){
  fpsCounter++;
  if ((performance.now()/1000)>nextSecond)
  {
    nextSecond++;
    document.getElementById("FPS").innerHTML = fpsCounter + " FPS"
    fpsCounter = 0;
  }
}
