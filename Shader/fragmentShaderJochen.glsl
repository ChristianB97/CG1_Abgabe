precision mediump float;

varying vec3 fragColor;
varying float fragDist;
varying vec2 fragTexCoord;
varying vec3 fragNormal;

uniform vec2 fogDist;
uniform vec3 fogColor;

void main()
{
    float mixValue = smoothstep(fogDist.x, fogDist.y, fragDist);
    vec3 color = mix(fragColor, fogColor, mixValue);
    gl_FragColor = vec4(color, 1.0);
}
