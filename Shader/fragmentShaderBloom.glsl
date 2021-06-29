#version 300 es
precision mediump float;

uniform sampler2D sampler;
varying vec2 fragTexCoord;


layout(location = 0) out vec4 normalColors;
layout(location = 1) out vec4 brightColors;

void main(void)
{
  float width = 800.0;
  float height = 600.0;
  float weight = 0.01;
  vec4 frameColor = vec4(0.0, 0.0, 0.0, 0.0);
  for (int i = 0; i < 10; i++)
  {
    float xShift = float(i) * 1.0/width;
    for (int j = 0; j < 10; j++)
    {
      float yShift = float(j) * 1.0/height;
      frameColor += weight * texture2D(sampler, fragTexCoord + vec2(xShift, yShift));
      frameColor += weight * texture2D(sampler, fragTexCoord + vec2(xShift, -yShift));
      frameColor += weight * texture2D(sampler, fragTexCoord + vec2(-xShift, yShift));
      frameColor += weight * texture2D(sampler, fragTexCoord + vec2(-xShift, -yShift));
    }
  }
  gl_FragColor = frameColor;
}
