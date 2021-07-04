import { WebObject } from "./Engine/webObject.js";
import { RenderPath } from "./Engine/renderPath.js";
import { update, deltaTime } from "./Engine/updateLoop.js";
import { horizontalAxis, verticalAxis, verticalMouseSpeed, horizontalMouseSpeed, isMouseDown, setDragField } from "./Engine/inputManager.js";

var renderPath;
var emperorPath;
var ufoPortal;
var earth;
var runnerUniformf;

window.addEventListener('DOMContentLoaded', (event) => {
    InitDemo();
});

var InitDemo = async function()
{
  var canvas = document.getElementById("game-surface");
  var defaultRenderPath = new RenderPath(canvas, true);
  renderPath = new RenderPath(canvas, false);
  emperorPath = new RenderPath(canvas, false);
  emperorPath.camera.translateCamera([0,-0.8,0]);
  emperorPath.camera.rotateCamera(1.5*Math.PI,[0,1,0]);
  renderPath.camera.rotateCamera(0.5*Math.PI,[0,1,0]);

  var screenObject = new WebObject();
  screenObject.addUIRendererAndRectTransform(canvas);
  screenObject.getComponent("MeshRenderer").textureHolder.glTextures.push(renderPath.camera.frameBuffer.frameBufferTextureDefault);

  defaultRenderPath.canvas2D.addObject(screenObject);

  update.addEventListener(move);

  var ufo = new WebObject();
  ufo.addMeshRendererAndTransform("OBJ/ufo_unterteller.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var ufoRenderer1 = ufo.getComponent("MeshRenderer");
  ufo.getComponent("Transform").translate([0,0,-10]);
  ufo.getComponent("Transform").scale([0.1,0.1,0.1]);
  ufoRenderer1.textureHolder.setTextureByImageLocation("Textures/ufo_diffuse.png");
  renderPath.environment3D.addObject(ufo);
  ufoRenderer1.shaderContainer.uniformPool.createAndSetUniform1f("specularPower", 0.5);
  ufoRenderer1.shaderContainer.uniformPool.createAndSetUniform3f("materialAmbient", 0.2,0.2,0.2);
  ufoRenderer1.shaderContainer.uniformPool.createAndSetUniform3f("materialDiffuse", 1,1,1);
  ufoRenderer1.shaderContainer.uniformPool.createAndSetUniform3f("materialSpecular", 0.3,0.3,0.3);


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

  ufo.addMeshRendererAndTransform("OBJ/ufo.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderLight.glsl");
  var ufoRenderer2 = ufo.getComponent("MeshRenderer");
  ufo.getComponent("Transform").translate([0,0,-0]);
  ufoRenderer2.textureHolder.setTextureByImageLocation("Textures/jj_ufo.jpg");
  renderPath.environment3D.addObject(ufo);
  ufoRenderer2.shaderContainer.uniformPool.createAndSetUniform1f("specularPower", 0.2);
  ufoRenderer2.shaderContainer.uniformPool.createAndSetUniform3f("materialAmbient", 0.1,0.1,0.1);
  ufoRenderer2.shaderContainer.uniformPool.createAndSetUniform3f("materialDiffuse", 0.1,0.21,0.1);
  ufoRenderer2.shaderContainer.uniformPool.createAndSetUniform3f("materialSpecular", 0.3,0.3,0.3);

  var ufoGlass = new WebObject();
  ufoGlass.addMeshRendererAndTransform("OBJ/ufoGlass.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var ufoGlassRenderer = ufoGlass.getComponent("MeshRenderer");
  ufoGlass.getComponent("Transform").translate([0,0,-0]);
  ufoGlassRenderer.textureHolder.setTextureByImageLocation("Textures/jojo.jfif");
  renderPath.transparencyLayer.addObject(ufoGlass);
  ufoGlassRenderer.shaderContainer.uniformPool.createAndSetUniform1f("alpha", 0.15);

  ufoPortal = new WebObject();
  ufoPortal.addMeshRendererAndTransform("OBJ/ufoPortal.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  ufoPortal.getComponent("MeshRenderer").textureHolder.glTextures.push(emperorPath.camera.frameBuffer.frameBufferTextureDefault);
  renderPath.environment3D.addObject(ufoPortal);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[1].ambient", 0.3,0.3,0.3);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[1].lightBrightness", 0.1,0.1,0.1);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[1].lightDirection", 5.5,0,0);


  var video = new WebObject();
  video.addMeshRendererAndTransform("OBJ/ufoScreen1.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  video.getComponent("MeshRenderer").textureHolder.setTextureByVideoLocation("mystery");
  renderPath.environment3D.addObject(video);

  var video2 = new WebObject();
  video2.addMeshRendererAndTransform("OBJ/ufoScreen2.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  video2.getComponent("MeshRenderer").textureHolder.setTextureByVideoLocation("maze");
  renderPath.environment3D.addObject(video2);

  earth = new WebObject();
  earth.addMeshRendererAndTransform("OBJ/earth.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderEarth.glsl");
  earth.getComponent("Transform").translate([190,0,190]);
  earth.getComponent("Transform").scale([100,100,100]);
  earth.getComponent("MeshRenderer").textureHolder.setTextureByImageLocation("Textures/earth_day.png");
  earth.getComponent("MeshRenderer").textureHolder.setTextureByImageLocation("Textures/earth_night.png");
  renderPath.environment3D.addObject(earth);
  earth.getComponent("MeshRenderer").shaderContainer.uniformPool.createAndSetUniform1f("specularPower", 0.1);
  earth.getComponent("MeshRenderer").shaderContainer.uniformPool.createAndSetUniform3f("materialAmbient", 0,0,0);
  earth.getComponent("MeshRenderer").shaderContainer.uniformPool.createAndSetUniform3f("materialDiffuse", 1,1,1);
  earth.getComponent("MeshRenderer").shaderContainer.uniformPool.createAndSetUniform3f("materialSpecular", 0.001,0.001,0.001);
  runnerUniformf = earth.getComponent("MeshRenderer").shaderContainer.uniformPool.createAndSetUniform1f("runner", 0);


  var sun = new WebObject();
  sun.addMeshRendererAndTransform("OBJ/earth.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  sun.getComponent("Transform").translate([-450,0,400]);
  sun.getComponent("Transform").scale([10,10,10]);
  sun.getComponent("MeshRenderer").textureHolder.setTextureByImageLocation("Textures/2k_sun.jpg");
  renderPath.environment3D.addObject(sun);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].ambient", 1,1,1);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].lightBrightness", 0.4,0.4,0.4);
  renderPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].lightDirection", -450,0,400);

  //----------------------------------

  emperorPath.environment3D.addObject(sun);
  emperorPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].ambient", 1,1,1);
  emperorPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].lightBrightness", 0.4,0.4,0.4);
  emperorPath.camera.uniformPool.createAndSetUniform3f("lightInformation[0].lightDirection", 0,10,0);

  var roofGround = new WebObject();
  roofGround.addMeshRendererAndTransform("OBJ/throne_roof_ground.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var roofGroundRenderer = roofGround.getComponent("MeshRenderer");
  roofGround.getComponent("Transform").translate([0,-1,0]);
  roofGround.getComponent("Transform").scale([0.1,0.1,0.1]);
  roofGroundRenderer.textureHolder.setTextureByImageLocation("Textures/ground_roof.jpg");
  emperorPath.environment3D.addObject(roofGround);

  var walls = new WebObject();
  walls.addMeshRendererAndTransform("OBJ/throne_walls.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var wallsRenderer = walls.getComponent("MeshRenderer");
  walls.getComponent("Transform").translate([0,-1,0]);
  walls.getComponent("Transform").scale([0.1,0.1,0.1]);
  wallsRenderer.textureHolder.setTextureByImageLocation("Textures/brick_wall.jpg");
  emperorPath.environment3D.addObject(walls);

  var throne = new WebObject();
  throne.addMeshRendererAndTransform("OBJ/throne_throne.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var throneRenderer = throne.getComponent("MeshRenderer");
  throne.getComponent("Transform").translate([0,-1,0]);
  throne.getComponent("Transform").scale([0.1,0.1,0.1]);
  throneRenderer.textureHolder.setTextureByImageLocation("Textures/throne.jpg");
  emperorPath.environment3D.addObject(throne);

  var carpet = new WebObject();
  carpet.addMeshRendererAndTransform("OBJ/throne_carpet.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var carpetRenderer = carpet.getComponent("MeshRenderer");
  carpet.getComponent("Transform").translate([0,-1,0]);
  carpet.getComponent("Transform").scale([0.1,0.1,0.1]);
  carpetRenderer.textureHolder.setTextureByImageLocation("Textures/carpet.jpg");
  emperorPath.environment3D.addObject(carpet);

  var pillars = new WebObject();
  pillars.addMeshRendererAndTransform("OBJ/throne_pillars.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var pillerRenderer = pillars.getComponent("MeshRenderer");
  pillars.getComponent("Transform").translate([0,-1,0]);
  pillars.getComponent("Transform").scale([0.1,0.1,0.1]);
  pillerRenderer.textureHolder.setTextureByImageLocation("Textures/marble.jpg");
  emperorPath.environment3D.addObject(pillars);

  var windows = new WebObject();
  windows.addMeshRendererAndTransform("OBJ/throne_window.obj", "Shader/vertexShaderDefault.glsl", "Shader/fragmentShaderDefault.glsl");
  var windowsRenderer = windows.getComponent("MeshRenderer");
  windows.getComponent("Transform").translate([0,-1,0]);
  windows.getComponent("Transform").scale([0.1,0.1,0.1]);
  windowsRenderer.textureHolder.setTextureByImageLocation("Textures/mosaic.jpeg");
  windowsRenderer.shaderContainer.uniformPool.createAndSetUniform1f("alpha", 0.2);
  emperorPath.transparencyLayer.addObject(windows);

  var cubeEmperor = new WebObject();
  cubeEmperor.addMeshRendererAndTransform("OBJ/box.obj", "Shader/vertexShaderSkyBox.glsl", "Shader/fragmentShaderSkyBox.glsl");

  cubeEmperor.getComponent("Transform").scale([8,8,8]);

  var natureCubeMap = new WebObject();
  natureCubeMap.addMeshRendererAndTransform("OBJ/box.obj", "Shader/vertexShaderSkyBox.glsl", "Shader/fragmentShaderSkyBox.glsl");
  var natureCubeMapRenderer = natureCubeMap.getComponent("MeshRenderer");
  natureCubeMapRenderer.textureHolder.setBindingTypeAndParameteris("TEXTURE_CUBE_MAP",
    [["TEXTURE_WRAP_S",      "CLAMP_TO_EDGE"],
    ["TEXTURE_WRAP_T",      "CLAMP_TO_EDGE"],
    ["TEXTURE_WRAP_R",      "CLAMP_TO_EDGE"],
    ["TEXTURE_MIN_FILTER",        "NEAREST"],
    ["TEXTURE_MAG_FILTER",        "NEAREST"]]
  );





  update.addEventListener(function()
  {
    var angle = 6 * 2 * Math.PI/1000000 * deltaTime;
    runnerUniformf.value += angle;
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
  emperorPath.camera.translateCamera([horizontalAxis*speed,0,verticalAxis*speed]);
  if (isMouseDown)
  {
    var vec3= [0, -horizontalMouseSpeed, 0];
    renderPath.camera.rotateCamera(angle,vec3);
    emperorPath.camera.rotateCamera(angle,vec3);
  }
  var matrix1 = renderPath.camera.worldMatrix.matrix;
  var triggerCoord = [0,0,-5];



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
