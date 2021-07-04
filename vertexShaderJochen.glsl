vertex shader
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 vertColor;
attribute vec3 vertNormal;

varying vec3 fragColor;
varying float fragDist;
varying vec3 fragNormal
varying vec3 fragTextCoord;

uniform mat4 mLokal;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
    fragTexCoord = vertTexCoord;
    fragColor = vertColor;
    vec4 viewPos = mView * mWorld * vec4(vertPosition, 1.0);
    fragDist = length(viewPos.xyz);
    gl_Position = mProj * viewPos;
}
