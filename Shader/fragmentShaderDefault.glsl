precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
uniform sampler2D sampler;
uniform float alpha;

void main()
{
  vec2 flippedTexCoord = vec2(fragTexCoord.x, 1.0-fragTexCoord.y);
  vec4 texel = texture2D(sampler, flippedTexCoord);

  gl_FragColor = vec4(texel.rgb, alpha);
}
