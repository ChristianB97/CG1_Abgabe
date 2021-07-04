precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 vertColor;
attribute vec3 vertNormal;


varying vec3 fragPosition;
varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragViewNormal;

uniform mat4 mLokal;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  mat4 viewWorldLokal = mView * mWorld * mLokal;
  vec4 position = viewWorldLokal * vec4(vertPosition, 1.0);
  fragTexCoord = vertTexCoord;
  fragPosition = position.xyz / position.w;
  fragViewNormal = (mView * vec4(vertNormal, 0.0)).xyz;
  fragNormal = (mView * mWorld * mLokal * vec4(vertNormal, 0.0)).xyz;
  gl_Position = mProj *viewWorldLokal * vec4(vertPosition, 1.0);
}
