document.addEventListener("DOMContentLoaded",function(){
    InitDemo();
});

import { WebObject } from "./Engine/webObject.js";
import { RenderPath } from "./Engine/renderPath.js";
import { update, deltaTime } from "./Engine/updateLoop.js";
import { horizontalAxis, verticalAxis, verticalMouseSpeed, horizontalMouseSpeed, isMouseDown, setDragField } from "./Engine/inputManager.js";

var renderPath;
var emperorPath;

var InitDemo = async function()
{
  var canvas = document.getElementById("game-surface");
  var defaultRenderPath = new RenderPath(canvas, true);
  renderPath = new RenderPath(canvas, false);
  emperorPath = new RenderPath(canvas, false);
  emperorPath.camera.translateCamera([0,-0.6,0]);
  emperorPath.camera.rotateCamera(1*Math.PI,[0,1,0]);


  var screenObject = new WebObject();
  screenObject.addUIRendererAndRectTransform(canvas);
  screenObject.getComponent("MeshRenderer").textureHolder.glTextures.push(renderPath.camera.frameBuffer.frameBufferTextureDefault);
  defaultRenderPath.canvas2D.addObject(screenObject);

  update.addEventListener(move);

  var ufo = new WebObject();
  ufo.addMeshRendererAndTransform("OBJ/ufo_unterteller.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var ufoRenderer = ufo.getComponent("MeshRenderer");
  ufo.getComponent("Transform").translate([0,0,-20]);
  ufo.getComponent("Transform").scale([0.1,0.1,0.1]);
  ufoRenderer.textureHolder.setTextureByImageLocation("Textures/ufo_diffuse.png");
  renderPath.environment3D.addObject(ufo);

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
  [["Skybox/Nebula_light_left.png", ["TEXTURE_CUBE_MAP_POSITIVE_X", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/Nebula_light_right.png", ["TEXTURE_CUBE_MAP_NEGATIVE_X", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/Nebula_light_up.png", ["TEXTURE_CUBE_MAP_POSITIVE_Y", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/Nebula_light_down.png", ["TEXTURE_CUBE_MAP_NEGATIVE_Y", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/Nebula_light_front.png", ["TEXTURE_CUBE_MAP_POSITIVE_Z", "RGBA", "RGBA", "UNSIGNED_BYTE"]],
  ["Skybox/Nebula_light_back.png", ["TEXTURE_CUBE_MAP_NEGATIVE_Z", "RGBA", "RGBA", "UNSIGNED_BYTE"]]]);
  renderPath.environment3D.addObject(box2);

  var ufo = new WebObject();

  ufo.addMeshRendererAndTransform("OBJ/ufo.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var ufoRenderer = ufo.getComponent("MeshRenderer");
  ufo.getComponent("Transform").translate([0,0,-0]);
  ufoRenderer.textureHolder.setTextureByImageLocation("Textures/jj_ufo.jpg");
  renderPath.environment3D.addObject(ufo);

  var ufoGlass = new WebObject();
  ufoGlass.addMeshRendererAndTransform("OBJ/ufoGlass.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var ufoGlassRenderer = ufoGlass.getComponent("MeshRenderer");
  ufoGlass.getComponent("Transform").translate([0,0,-0]);
  ufoGlassRenderer.textureHolder.setTextureByImageLocation("Textures/jojo.jfif");
  renderPath.transparencyLayer.addObject(ufoGlass);

  var ufoPortal = new WebObject();
  ufoPortal.addMeshRendererAndTransform("OBJ/ufoPortal.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  ufoPortal.getComponent("MeshRenderer").textureHolder.glTextures.push(emperorPath.camera.frameBuffer.frameBufferTextureDefault);
  renderPath.environment3D.addObject(ufoPortal);

  var teapot1 = new WebObject();
  teapot1.addMeshRendererAndTransform("OBJ/teapot.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");





  var girl = new WebObject();
  girl.addMeshRendererAndTransform("OBJ/amelia.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  girl.getComponent("Transform").translate([0,-4,0])
  girl.getComponent("Transform").scale([0.04,0.04,0.04])
  girl.getComponent("MeshRenderer").textureHolder.setTextureByImageLocation("Textures/amelia.png");
  girl.getComponent("Transform").translate([0,-9,0]);
  girl.getComponent("Transform").scale([8,8,8]);
  renderPath.environment3D.addObject(girl);

  setDragField(document.getElementById("game-surface"));


  var myFirstUI = new WebObject();
  myFirstUI.addUIRendererAndRectTransform(canvas, "Textures/jojo.jfif", 0.3, "Shader/vertexShaderUI.glsl", "Shader/fragmentShaderUI.glsl");
  renderPath.canvas2D.addObject(myFirstUI);
  var uiRect = myFirstUI.getComponent("RectTransform");

  uiRect.scale([0.4,0.4]);
  uiRect.setPosition([0,0.79]);

  var roofGround = new WebObject();
  roofGround.addMeshRendererAndTransform("OBJ/throne_roof_ground.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var roofGroundRenderer = roofGround.getComponent("MeshRenderer");
  roofGround.getComponent("Transform").translate([0,-1,0]);
  roofGround.getComponent("Transform").scale([0.1,0.1,0.1]);
  roofGroundRenderer.textureHolder.setTextureByImageLocation("Textures/ground_roof.jpg");
  emperorPath.environment3D.addObject(roofGround);

  var walls = new WebObject();
  walls.addMeshRendererAndTransform("OBJ/throne_walls.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var wallsRenderer = walls.getComponent("MeshRenderer");
  walls.getComponent("Transform").translate([0,-1,0]);
  walls.getComponent("Transform").scale([0.1,0.1,0.1]);
  wallsRenderer.textureHolder.setTextureByImageLocation("Textures/ground_roof.jpg");
  emperorPath.environment3D.addObject(walls);

  var throne = new WebObject();
  throne.addMeshRendererAndTransform("OBJ/throne_throne.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var throneRenderer = throne.getComponent("MeshRenderer");
  throne.getComponent("Transform").translate([0,-1,0]);
  throne.getComponent("Transform").scale([0.1,0.1,0.1]);
  throneRenderer.textureHolder.setTextureByImageLocation("Textures/throne.jpg");
  emperorPath.environment3D.addObject(throne);





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
    var vec3= [0, -horizontalMouseSpeed, 0];
    renderPath.camera.rotateCamera(angle,vec3);
    emperorPath.camera.rotateCamera(angle,vec3);
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
