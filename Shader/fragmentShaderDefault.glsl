precision mediump float;

varying vec3 fragColor;
varying vec2 fragTexCoord;
varying vec3 fragNormal;
uniform sampler2D sampler;

void main()
{
  vec3 fragNormal = normalize(fragNormal);
  gl_FragColor = texture2D(sampler, vec2(1.0-fragTexCoord.x, fragTexCoord.y));
}
