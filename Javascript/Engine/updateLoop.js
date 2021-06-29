import { ActionEvent } from "./actionEvent.js";
export const systemUpdate = new ActionEvent();
export const lastUpdate = new ActionEvent();
export const update = new ActionEvent();
export const renderUpdate = new ActionEvent();
export const lastRenderUpdate = new ActionEvent();
export const postProcessingUpdate = new ActionEvent();
export var deltaTime = 0;
var currentTime = 0;

document.addEventListener("DOMContentLoaded",function(){
    requestAnimationFrame(updateLoop);
});

var updateLoop = function ()
{
  deltaTime = performance.now()-currentTime;
  currentTime = performance.now();

  systemUpdate.invoke();
  update.invoke();
  lastUpdate.invoke();
  renderUpdate.invoke();
  lastRenderUpdate.invoke();
  postProcessingUpdate.invoke();

  requestAnimationFrame(updateLoop);
};
