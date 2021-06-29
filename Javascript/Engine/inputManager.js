export var horizontalAxis = 0;
export var verticalAxis = 0;
export var horizontalMouseSpeed = 0;
export var verticalMouseSpeed = 0;
export var isMouseDown = false;

document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === 'w') {
        verticalAxis = 1;
    }
    else if (event.key.toLowerCase() === 'a') {
        horizontalAxis = -1;
    }
    else if (event.key.toLowerCase() === 's') {
        verticalAxis = -1;
    }
    else if (event.key.toLowerCase() === 'd') {
        horizontalAxis = 1;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key.toLowerCase() === 'w') {
        verticalAxis = 0;
    }
    else if (event.key.toLowerCase() === 'a') {
        horizontalAxis = 0;
    }
    else if (event.key.toLowerCase() === 's') {
        verticalAxis = 0;
    }
    else if (event.key.toLowerCase() === 'd') {
        horizontalAxis = 0;
    }
});

export function setDragField(dragElement)
{
  dragElement.addEventListener("dragstart", function(event) {
  }, false);
}

var lastMousePos = [0,0];
var mouseStopTimer = setTimeout(nullifyMouseSpeed,300);;
document.addEventListener("mousemove", function(event) {
  horizontalMouseSpeed = event.pageX - lastMousePos[0];
  verticalMouseSpeed = event.pageY - lastMousePos[1];
  lastMousePos = [event.pageX, event.pageY];
  clearTimeout(mouseStopTimer);
  mouseStopTimer = setTimeout(nullifyMouseSpeed,6);
}, false);


function nullifyMouseSpeed()
{
  horizontalMouseSpeed = 0;
  verticalMouseSpeed = 0;
}

document.addEventListener("mousedown", function(event) {
  isMouseDown = true;
}, false);

document.addEventListener("mouseup", function(event) {
  isMouseDown = false;
}, false);
