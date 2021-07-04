precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 vertNormal;
varying vec3 fragTexCoord;
varying vec3 fragIchBinHierDamitDieseVerdammtenFehlerNichtMehrInDerKonsoleErscheinen;

void main() {
  fragIchBinHierDamitDieseVerdammtenFehlerNichtMehrInDerKonsoleErscheinen = vertNormal + vec3(vertTexCoord, 0);
  fragTexCoord = vertPosition;
  vec3 viewPos = (mWorld * vec4(vertPosition, 0.0)).xyz * vec3(1000);
  gl_Position = mProj * mView* vec4(viewPos, 1.0);
}
