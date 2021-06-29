precision mediump float;

varying vec3 fragColor;
varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main()
{
  gl_FragColor = vec4(texture2D(sampler, fragTexCoord).xyz, 1.0);
}
