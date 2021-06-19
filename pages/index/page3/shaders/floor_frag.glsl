varying float vHeight;
varying vec3 vPosition;

vec3 calcColor() {

  vec3 diffuseColor;

  float mask;
  mask = mix(0.0, 1.0, gln_map(vPosition.z, -5.0, 5.0, 0.0, 1.0));
  mask = pow(mask, 6.0);

  diffuseColor =
      mix(vec3(0., 0.514, 1.), vec3(0.549, 0.871, 1.), vHeight * 2.3 * mask);
  diffuseColor *= mask * 0.65;

  return diffuseColor;
}
