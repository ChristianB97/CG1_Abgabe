precision mediump float;

struct LightStruct
{
  vec3 ambient;
  vec3 lightBrightness;
  vec3 lightDirection;
};
uniform float specularPower;
uniform vec3 materialAmbient;
uniform vec3 materialDiffuse;
uniform vec3 materialSpecular;

varying vec3 fragPosition;
varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragViewNormal;
uniform sampler2D sampler[3];
uniform float runner;



uniform LightStruct lightInformation[2];
uniform int numberOfLightInformation;

//uniform vec3 ambient = vec3(0.13, 0.16, 0.256);
//uniform vec3 lightIntensity = vec3(0.3, 0.3, 0.34);
//uniform vec3 lightDirection = vec3(0, 100000, -100000);
//uniform float specularPower = 5.0;

vec3 getLight()
{
  vec3 lightColor = vec3(0,0,0);
  for(int i=0; i<2; i++)
  {
    if (lightInformation[i].lightDirection.xyz != vec3(0,0,0)){
      vec3 ambient = lightInformation[i].ambient * materialAmbient;
      lightColor += ambient;
      vec3 lightDirection = normalize(lightInformation[i].lightDirection-fragPosition);
      vec3 diffuse = materialDiffuse * lightInformation[i].lightBrightness * max(dot(fragViewNormal, lightDirection),0.0);
      lightColor += diffuse;
      vec3 viewVector = vec3(0.0,0.0,1.0);
      vec3 reflectVec = reflect(-lightDirection, fragNormal);
      float specularFactor = max(dot(reflectVec, fragNormal), 0.0);
      vec3 specular = materialSpecular * pow(specularFactor, specularPower);
      lightColor += specular;
    }
  }
  return(lightColor);
}

void main()
{
  vec3 fragNormal = normalize(fragNormal);
  vec2 flippedTexCoord = vec2(fragTexCoord.x + runner,1.0-fragTexCoord.y);
  vec3 light = getLight();
  float lightAverage = (light.x + light.y + light.z) / 3.0;
  vec4 earthNightColor  = texture2D(sampler[1], flippedTexCoord);
  vec4 earthDayColor    = texture2D(sampler[0], flippedTexCoord);

  //vec4 finalColor = mix(color1, color2, 0.0);
  gl_FragColor = earthNightColor;
}
