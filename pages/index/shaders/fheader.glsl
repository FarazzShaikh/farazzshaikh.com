varying float vHeight;
varying vec3 vPosition;

uniform bool isSub;

vec4 calcColor() {

  vec4 diffuseColor;

  float mask;

  if (isSub) {
    mask = mix(0.0, 1.0, gln_map(vPosition.z, -4.5, 2.5, 0.0, 1.0));
  } else {
    mask = mix(0.0, 1.0, gln_map(vPosition.z, -5.0, 5.0, 0.0, 1.0));
  }

  mask = pow(mask, 6.0);

  vec3 col;

  if (isSub) {
    diffuseColor = mix(vec4(0., 0.314, 0.612, 1.), vec4(0., 0.51, 0.71, 1.),
                       vHeight * 2.3 * mask);
  } else {
    diffuseColor = mix(vec4(0., 0.514, 1., 1.), vec4(0.549, 0.871, 1., 1.),
                       vHeight * 2.3 * mask);
  }

  diffuseColor.rgb *= mask * 0.65;
  diffuseColor.a *= mask;

  return diffuseColor;
}
