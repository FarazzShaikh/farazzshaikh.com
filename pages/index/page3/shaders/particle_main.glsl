
gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.2, 1.0, 1, true, false);

vec3 c = center;
c += (uTime * 0.05);
c += vec3(targetPos, 1.0);

vec3 f = curlNoise(c * 0.2);

vec3 viewOffset = position * 0.3 * f.g;

vnoise = f;

vec3 newPos = (center + f) + viewOffset;
vec3 newNormal = normal;