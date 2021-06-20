
uniform float uTime;

varying float vHeight;
varying vec3 vPosition;

uniform bool isSub;

float fbm(vec2 p, gln_tFBMOpts opts) {
  p += (opts.seed * 100.0);
  float persistance = opts.persistance;
  float lacunarity = opts.lacunarity;
  float redistribution = opts.redistribution;
  int octaves = opts.octaves;
  bool terbulance = opts.terbulance;
  bool ridge = opts.terbulance && opts.ridge;

  float result = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maximum = amplitude;

  for (int i = 0; i < MAX_FBM_ITERATIONS; i++) {
    if (i >= octaves)
      break;

    vec2 p = p * frequency * opts.scale;

    float noiseVal = gln_perlin(p);

    if (terbulance)
      noiseVal = abs(noiseVal);

    if (ridge)
      noiseVal = -1.0 * noiseVal;

    result += noiseVal * amplitude;

    frequency *= lacunarity;
    amplitude *= persistance;
    maximum += amplitude;
  }

  float redistributed = pow(result, redistribution);
  return redistributed / maximum;
}

vec3 displace(vec3 point) {

  vec3 p = point;

  if (isSub) {
    p.y -= uTime * 2.0;
  } else {
    p.y += uTime * 2.0;
  }

  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.4, 1.0, 5, false, false);

  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);

  vec3 n = vec3(0.0);
  n.z += gln_normalize(fbm(p.xy + (uTime * 0.5), fbmOpts));

  if (!isSub)
    n += gln_GerstnerWave(p, A, uTime).xzy;

  vHeight = n.z;
  vPosition = point;
  return point + n;
}
