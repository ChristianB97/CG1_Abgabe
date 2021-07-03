precision mediump float;

varying vec3 fragColor;
varying vec2 fragTexCoord;
varying vec3 fragNormal;
uniform sampler2D sampler;

vec3 getLight()
{
  vec3 ambient = vec3(0.13, 0.16, 0.256);

  vec3 lightIntensity = vec3(0.3, 0.3, 0.34);
  vec3 lightDirection = normalize(vec3(0, 100000, -100000));

  vec3 diffuse = lightIntensity * max(dot(fragNormal, lightDirection),0.0);

  float specularPower = 5.0;
  vec3 viewVector = vec3(0.0,0.0,1.0);
  vec3 reflectVec = reflect(-lightDirection, fragNormal);
  float specularFactor = max(dot(reflectVec, viewVector), 0.0);

  float specular = pow(specularFactor, specularPower);

  return(ambient+diffuse+specular);
}

void main()
{
  vec3 fragNormal = normalize(fragNormal);
  vec2 flippedTexCoord = vec2(fragTexCoord.x,1.0-fragTexCoord.y);
  vec4 texel = texture2D(sampler, flippedTexCoord);
  gl_FragColor = vec4(texel.rgb + getLight(), texel.a);
}
