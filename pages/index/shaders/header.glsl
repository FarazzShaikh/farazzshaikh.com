
uniform float uTime;

varying float vHeight;
varying vec3 vPosition;

uniform bool isSub;

// the function which defines the displacement

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
  n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 0.5), fbmOpts));

  if (!isSub)
    n += gln_GerstnerWave(p, A, uTime).xzy;

  vHeight = n.z;
  vPosition = point;
  return point + n;
}
