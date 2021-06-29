precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 vertColor;
attribute vec3 vertNormal;
uniform float depth;


varying vec3 fragColor;
varying vec2 fragTexCoord;
varying vec3 fragNormal;

uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  fragTexCoord = vertTexCoord;
  fragColor = vertColor;
  fragNormal = vertNormal;
  gl_Position = vec4(vertPosition.xy, 0.0, 1.0);
}
