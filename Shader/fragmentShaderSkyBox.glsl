precision mediump float;

uniform samplerCube skybox;
varying vec3 fragTexCoord;

void main() {
  gl_FragColor = textureCube(skybox, fragTexCoord);
}
