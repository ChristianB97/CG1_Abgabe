precision mediump float;
uniform sampler2D sampler;
varying vec2 fragTexCoord;

void main(void)
{
  float brightness = dot(texture2D(sampler, fragTexCoord).rgb, vec3(0.7, 0.7152, 0.0722));
  if(brightness > 1.0)
  {
    gl_FragColor = texture2D(sampler, fragTexCoord);
  }
  else
  {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
