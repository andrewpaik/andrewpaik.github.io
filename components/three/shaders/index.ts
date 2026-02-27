// ─── Shared Noise Library ────────────────────────────────────────────
const NOISE_LIB = /* glsl */ `
float hash31(vec3 p) {
  p = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float noise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
        mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
        mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y),
    f.z
  );
}

float fbm3(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise3D(p); p *= 2.0; a *= 0.5; }
  return v;
}

// Analytical gradient noise (quintic C2 interpolation for smooth normals)
vec4 noise3D_grad(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec3 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);

  float n000 = hash31(i);
  float n100 = hash31(i + vec3(1,0,0));
  float n010 = hash31(i + vec3(0,1,0));
  float n110 = hash31(i + vec3(1,1,0));
  float n001 = hash31(i + vec3(0,0,1));
  float n101 = hash31(i + vec3(1,0,1));
  float n011 = hash31(i + vec3(0,1,1));
  float n111 = hash31(i + vec3(1,1,1));

  float v = n000
    + (n100 - n000) * u.x
    + (n010 - n000) * u.y
    + (n001 - n000) * u.z
    + (n000 - n100 - n010 + n110) * u.x * u.y
    + (n000 - n100 - n001 + n101) * u.x * u.z
    + (n000 - n010 - n001 + n011) * u.y * u.z
    + (-n000 + n100 + n010 - n110 + n001 - n101 - n011 + n111) * u.x * u.y * u.z;

  vec3 grad = du * vec3(
    (n100 - n000) + (n000 - n100 - n010 + n110) * u.y + (n000 - n100 - n001 + n101) * u.z + (-n000 + n100 + n010 - n110 + n001 - n101 - n011 + n111) * u.y * u.z,
    (n010 - n000) + (n000 - n100 - n010 + n110) * u.x + (n000 - n010 - n001 + n011) * u.z + (-n000 + n100 + n010 - n110 + n001 - n101 - n011 + n111) * u.x * u.z,
    (n001 - n000) + (n000 - n100 - n001 + n101) * u.x + (n000 - n010 - n001 + n011) * u.y + (-n000 + n100 + n010 - n110 + n001 - n101 - n011 + n111) * u.x * u.y
  );

  return vec4(grad, v);
}

// Configurable-octave FBM with gradient accumulation (max 5 for perf)
vec4 fbm_grad(vec3 p, int octaves) {
  float v = 0.0, a = 0.5;
  vec3 grad = vec3(0.0);
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    vec4 n = noise3D_grad(p);
    v += a * n.w;
    grad += a * n.xyz;
    p = mat3(0.0, 0.8, 0.6, -0.8, 0.36, -0.48, -0.6, -0.48, 0.64) * p * 2.0;
    a *= 0.5;
  }
  return vec4(grad, v);
}

// Ridged multifractal noise (sharp mountain ridges, lava cracks) (max 5 for perf)
float ridgedMF(vec3 p, int octaves) {
  float v = 0.0, a = 0.5, prev = 1.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    float n = abs(noise3D(p));
    n = 1.0 - n;
    n = n * n;
    v += a * n * prev;
    prev = n;
    p = mat3(0.0, 0.8, 0.6, -0.8, 0.36, -0.48, -0.6, -0.48, 0.64) * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// Curl noise for nebula filament structures
vec3 curlNoise(vec3 p) {
  float e = 0.01;
  float nx = noise3D(p + vec3(e,0,0)) - noise3D(p - vec3(e,0,0));
  float ny = noise3D(p + vec3(0,e,0)) - noise3D(p - vec3(0,e,0));
  float nz = noise3D(p + vec3(0,0,e)) - noise3D(p - vec3(0,0,e));
  return vec3(ny - nz, nz - nx, nx - ny) / (2.0 * e);
}
`;

// ─── Sun Glow Shaders ───────────────────────────────────────────────

export const sunGlowVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const sunGlowFrag = /* glsl */ `
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float dist = length(vUv - 0.5) * 2.0;
  float glow = exp(-dist * 2.0) * 0.8;
  glow += exp(-dist * 6.0) * 0.6;
  glow += exp(-dist * 20.0) * 1.0;
  gl_FragColor = vec4(uColor * glow, glow);
}
`;

// ─── Starfield Shaders ──────────────────────────────────────────────

export const starfieldVert = /* glsl */ `
attribute float size;
attribute vec3 color;
uniform float uTime;
varying vec3 vColor;
varying float vSize;

void main() {
  vColor = color;
  vSize = size;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  float phase = position.x * 12.0 + position.z * 7.0 + position.y * 3.0;
  float freq1 = 0.8 + size * 1.5;
  float freq2 = freq1 * 2.37;
  float freq3 = freq1 * 0.43;

  float twinkle = 0.5
    + 0.2 * sin(uTime * freq1 + phase)
    + 0.15 * sin(uTime * freq2 + phase * 1.7)
    + 0.15 * cos(uTime * freq3 + phase * 0.6);

  float flare = smoothstep(0.97, 1.0, sin(uTime * 0.1 + phase * 0.3)) * 2.0;
  twinkle += flare;

  gl_PointSize = size * twinkle * (180.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 0.5);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const starfieldFrag = /* glsl */ `
varying vec3 vColor;
varying float vSize;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float dist = length(p);
  float alpha = 1.0 - smoothstep(0.15, 0.5, dist);

  // Diffraction spikes on brighter stars
  float spike = max(
    exp(-abs(p.x) * 20.0) * exp(-abs(p.y) * 4.0),
    exp(-abs(p.y) * 20.0) * exp(-abs(p.x) * 4.0)
  ) * 0.3 * smoothstep(0.6, 1.2, vSize);
  alpha += spike;

  gl_FragColor = vec4(vColor, alpha * 0.9);
}
`;

// ─── Planet Surface Shaders (Texture-based PBR + glassy effects) ────

export const planetSurfaceVert = /* glsl */ `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;

void main() {
  vNormal = normal;
  vPosition = position;
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const planetSurfaceFrag = /* glsl */ `
uniform sampler2D uDiffuseMap;
uniform sampler2D uNightMap;
uniform float uHasNightMap;
uniform vec3 uSunDir;
uniform float uTime;
uniform float uGlassiness;
uniform vec3 uNightColor;
uniform float uRoughness;
uniform float uAtmDensity;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;

void main() {
  vec3 surfaceColor = texture2D(uDiffuseMap, vUv).rgb;
  vec3 worldN = normalize(vWorldNormal);

  // ─── PBR Lighting ───
  vec3 L = normalize(uSunDir);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 H = normalize(L + V);

  float NdotL = max(dot(worldN, L), 0.0);
  float NdotH = max(dot(worldN, H), 0.0);

  vec3 diffuse = surfaceColor * NdotL;

  // Glass-like dual-lobe specular
  float specSharp = pow(NdotH, 512.0) * NdotL * 1.5;
  float specSoft  = pow(NdotH, 32.0)  * NdotL * 0.15;
  float specBase  = pow(NdotH, mix(16.0, 256.0, 1.0 - uRoughness)) * NdotL;
  float spec = mix(specBase, specSharp + specSoft, uGlassiness);

  vec3 ambient = surfaceColor * 0.06;

  // Night-side emission
  float nightMask = smoothstep(0.0, -0.15, NdotL);
  vec3 nightEmission = uHasNightMap > 0.5
    ? texture2D(uNightMap, vUv).rgb
    : uNightColor;
  vec3 nightGlow = nightEmission * nightMask * 0.4;

  // Terminator glow
  float tGlow = exp(-abs(NdotL) * 8.0 / max(uAtmDensity, 0.1));
  vec3 terminator = mix(vec3(1.0, 0.4, 0.1), vec3(0.3, 0.5, 1.0),
                        smoothstep(-0.05, 0.05, NdotL)) * tGlow * 0.25;

  vec3 finalColor = ambient + diffuse + vec3(spec * 0.08) + nightGlow + terminator;

  // ─── Glassy Magical Effects ───
  float fresnel = pow(1.0 - max(dot(worldN, V), 0.0), 3.0);

  // Fresnel iridescence (thin-film interference)
  vec3 iridescence = vec3(
    0.5 + 0.5 * sin(fresnel * 12.0 + 0.0),
    0.5 + 0.5 * sin(fresnel * 12.0 + 2.094),
    0.5 + 0.5 * sin(fresnel * 12.0 + 4.189)
  );
  finalColor += iridescence * fresnel * 0.25 * uGlassiness;

  // Subsurface scattering at terminator
  float sss = pow(max(0.0, dot(-V, L)), 3.0) * pow(1.0 - abs(NdotL), 2.0);
  finalColor += mix(surfaceColor, vec3(1.0, 0.6, 0.3), 0.5) * sss * 0.3 * uGlassiness;

  // Animated caustic overlay
  vec3 cp = vPosition * 3.0 + uTime * 0.15;
  float caustic = pow(0.5 + 0.5 * sin(cp.x * 4.0 + sin(cp.z * 3.0 + uTime * 0.5)), 3.0);
  caustic *= pow(0.5 + 0.5 * sin(cp.y * 5.0 + sin(cp.x * 2.0 + uTime * 0.7)), 3.0);
  float causticMask = max(0.0, NdotL) * (1.0 - fresnel * 0.5);
  finalColor += vec3(caustic) * causticMask * 0.15 * uGlassiness;

  // Volumetric inner glow
  float innerGlow = pow(fresnel, 1.5) * 0.4;
  vec3 glowColor = mix(surfaceColor * 1.5, vec3(1.0), 0.3);
  finalColor += glowColor * innerGlow * uGlassiness;

  // Neon rim (Daft Punk touch — cyan/magenta edge glow)
  vec3 neonRim = mix(vec3(0.0, 0.83, 1.0), vec3(1.0, 0.0, 1.0), fresnel);
  finalColor += neonRim * pow(fresnel, 2.0) * 0.3 * uGlassiness;

  // Surface translucency
  float backLight = max(0.0, -dot(worldN, V)) * 0.1;
  finalColor += surfaceColor * backLight * uGlassiness;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

// ─── Atmosphere Shaders (Rayleigh scattering) ───────────────────────

export const atmosphereVert = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}
`;

export const atmosphereFrag = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uSunDir;
uniform float uDensity;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldNormal;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);
  vec3 L = normalize(uSunDir);

  // Fresnel rim
  float rim = 1.0 - max(0.0, dot(normalize(vNormal), V));

  // Rayleigh phase: 0.75 * (1 + cos^2)
  float VdotL = dot(V, L);
  float phase = 0.75 * (1.0 + VdotL * VdotL);

  // Sun-side vs night-side
  float NdotL = dot(N, L);
  float sunSide = smoothstep(-0.3, 0.3, NdotL);

  // Color: blue lit, orange terminator, dim night
  vec3 dayColor = uColor;
  vec3 terminatorColor = vec3(1.0, 0.5, 0.2);
  vec3 nightColor = uColor * 0.05;

  vec3 scatterColor = mix(nightColor, dayColor, sunSide);
  float terminatorBand = exp(-NdotL * NdotL * 20.0);
  scatterColor = mix(scatterColor, terminatorColor, terminatorBand * 0.6);

  // Atmosphere iridescence (subtle rainbow rim)
  vec3 atmIridescence = vec3(
    sin(rim * 8.0), sin(rim * 8.0 + 2.094), sin(rim * 8.0 + 4.189)
  ) * 0.1 * rim;
  scatterColor += atmIridescence;

  // Intensity: wider rim + scattering phase
  float intensity = pow(rim, 2.0) * (0.4 + phase * 0.3) * uDensity;

  // Forward scattering (bright halo when sun behind planet)
  float forwardScatter = pow(max(0.0, VdotL), 8.0) * rim * 0.5;
  intensity += forwardScatter * uDensity;

  gl_FragColor = vec4(scatterColor, intensity);
}
`;

// ─── Cloud Layer Shaders ────────────────────────────────────────────

export const cloudLayerVert = /* glsl */ `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldNormal;

void main() {
  vNormal = normal;
  vPosition = position;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const cloudLayerFrag = /* glsl */ `
uniform vec3 uSunDir;
uniform float uTime;
uniform float uCloudDensity;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldNormal;

${NOISE_LIB}

void main() {
  vec3 N = normalize(vWorldNormal);
  float NdotL = max(dot(N, normalize(uSunDir)), 0.0);

  vec3 p = vPosition * 2.0 + vec3(uTime * 0.01, 0.0, uTime * 0.008);
  float cloud = fbm3(p) * 0.6 + fbm3(p * 3.0 + 10.0) * 0.3;
  cloud = smoothstep(0.35, 0.65, cloud) * uCloudDensity;

  vec3 cloudColor = mix(vec3(0.15), vec3(1.0, 0.98, 0.95), NdotL * 0.7 + 0.3);

  // Translucency at terminator
  float terminator = exp(-abs(NdotL) * 6.0);
  cloudColor += vec3(1.0, 0.6, 0.3) * terminator * 0.2;

  gl_FragColor = vec4(cloudColor, cloud * 0.6);
}
`;

// ─── Ring System Shaders ────────────────────────────────────────────

export const ringVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ringFrag = /* glsl */ `
uniform vec3 uSunDir;
uniform vec3 uRingColor;
uniform vec3 uPlanetCenter;
uniform float uPlanetRadius;

varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

${NOISE_LIB}

void main() {
  // Radial distance normalized across ring width
  float r = length(vUv - 0.5) * 2.0;

  // Concentric band structure
  float bands = 0.0;
  bands += smoothstep(0.0, 0.05, sin(r * 40.0)) * 0.4;
  bands += smoothstep(0.0, 0.05, sin(r * 23.0 + 1.5)) * 0.3;
  bands += smoothstep(0.0, 0.05, sin(r * 67.0)) * 0.2;
  bands += noise3D(vec3(r * 100.0, 0.0, 0.0)) * 0.1;

  // Cassini-like gap
  float gap = smoothstep(0.48, 0.5, r) * (1.0 - smoothstep(0.52, 0.54, r));
  bands *= (1.0 - gap * 0.8);

  // Planet shadow on rings
  vec3 toSun = normalize(uSunDir);
  vec3 toPixel = vWorldPos - uPlanetCenter;
  float projDist = dot(toPixel, toSun);
  vec3 closestOnRay = toPixel - projDist * toSun;
  float shadowDist = length(closestOnRay);
  float shadow = smoothstep(uPlanetRadius * 0.95, uPlanetRadius * 1.05, shadowDist);

  // Lighting (both sides)
  float NdotL = abs(dot(normalize(vWorldNormal), toSun));
  vec3 color = uRingColor * (0.1 + NdotL * 0.9) * shadow;

  float alpha = bands * 0.7;
  gl_FragColor = vec4(color, alpha);
}
`;

// ─── Nebula Shaders (enhanced volumetric) ───────────────────────────

export const nebulaVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const nebulaFrag = /* glsl */ `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uOpacity;
uniform float uComplexity;

varying vec2 vUv;
varying vec3 vWorldPos;

${NOISE_LIB}

void main() {
  float dist = length(vUv - 0.5) * 2.0;
  float radial = 1.0 - smoothstep(0.0, 1.0, dist);

  vec3 p = vWorldPos * 0.03;

  // Curl noise distortion for filament structure (skip on low complexity)
  if (uComplexity > 0.1) {
    vec3 curl = curlNoise(p * 0.5 + uTime * 0.003);
    p += curl * 0.8 * uComplexity;
  }

  // Configurable octave FBM (max 5 for perf)
  int oct = 3 + int(uComplexity * 2.0);
  vec4 n1 = fbm_grad(p + vec3(uTime * 0.005), oct);

  float n2 = fbm3(p * 3.0 + vec3(uTime * 0.008, 0.0, uTime * 0.006)) * 0.3;

  // Pseudo-volumetric: single depth offset (reduced from 2 for perf)
  float depth1 = fbm_grad(p + vec3(0.0, 0.0, 0.3), max(oct - 1, 3)).w;
  float volumetric = (n1.w + depth1) / 2.0;

  float cloud = smoothstep(0.15, 0.6, volumetric + n2) * radial;

  // Filament highlights
  float filament = smoothstep(0.48, 0.52, n1.w) * smoothstep(0.52, 0.48, n1.w) * 3.0;

  // Three-tone color
  float t1 = smoothstep(0.2, 0.5, n1.w);
  float t2 = smoothstep(0.5, 0.8, n1.w);
  vec3 color = mix(uColor1, uColor2, t1);
  color = mix(color, uColor3, t2);
  color += color * filament * 0.5;
  color *= 1.4;

  gl_FragColor = vec4(color, cloud * uOpacity);
}
`;

// ─── Particle Stream Shaders ─────────────────────────────────────────

export const particleStreamVert = /* glsl */ `
uniform float uTime;
uniform float uCharacterProgress;
uniform float uSpeed;
uniform sampler2D uCurveData;

attribute float trackT;
attribute vec2 offset;
attribute float seed;

varying float vAlpha;
varying vec3 vColor;

void main() {
  // Multi-speed flow: center particles fast, edge particles lazy
  float edgeDist = length(offset) / 0.9;
  float flowSpeed = mix(0.06, 0.015, edgeDist) + seed * 0.02;
  float speedBoost = min(uSpeed * 2000.0, 1.0);
  flowSpeed += speedBoost * 0.08;
  float animT = fract(trackT + uTime * flowSpeed);

  // Sample curve data texture (row 0 = positions, row 1 = tangents)
  vec3 curvePos = texture2D(uCurveData, vec2(animT, 0.25)).xyz;
  vec3 rawTan = texture2D(uCurveData, vec2(animT, 0.75)).xyz;
  // Safety: prevent NaN from normalize(zero)
  vec3 tangent = normalize(rawTan + vec3(0.0, 0.0001, 0.0));

  // Perpendicular frame
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 bitangent = normalize(cross(tangent, up));
  vec3 normal = normalize(cross(bitangent, tangent));

  // Apply offset in tube cross-section
  vec3 worldPos = curvePos + bitangent * offset.x + normal * offset.y;

  // Organic drift — wispy sine displacement
  float drift = sin(animT * 12.0 + seed * 6.283 + uTime * 0.4) * 0.2 * (0.5 + seed);
  worldPos += bitangent * drift;
  float driftY = cos(animT * 8.0 + seed * 4.5 + uTime * 0.25) * 0.1;
  worldPos += normal * driftY;

  // Character proximity — DIM near character so it stands out
  float charDist = animT - uCharacterProgress;
  if (charDist > 0.5) charDist -= 1.0;
  if (charDist < -0.5) charDist += 1.0;
  float absDist = abs(charDist);

  // Clear zone around character
  float dimZone = 1.0 - exp(-absDist * 50.0) * 0.8;
  // Bow wave just ahead of character
  float bowWave = exp(-pow((charDist - 0.025) * 35.0, 2.0)) * 0.25;
  // Wake glow just behind
  float wake = exp(-pow((charDist + 0.025) * 30.0, 2.0)) * 0.15;

  // Speed-reactive tangent streak
  worldPos += tangent * speedBoost * seed * 0.4;

  vec4 mvPos = modelViewMatrix * vec4(worldPos, 1.0);

  // Size: high variation, smaller at edges
  float baseSize = mix(2.2, 0.5, pow(edgeDist, 0.5));
  baseSize *= (0.5 + seed * 1.0);
  gl_PointSize = baseSize * (100.0 / -mvPos.z);
  gl_PointSize = max(gl_PointSize, 0.4);

  // Edge fade at track endpoints — wider fade at start to avoid visible cloud
  float edgeFade = smoothstep(0.0, 0.10, animT) * smoothstep(1.0, 0.93, animT);

  // Alpha: subtle base + bow wave/wake, dimmed near character
  vAlpha = (0.1 + bowWave + wake) * dimZone * edgeFade;

  // Color: cool white/cyan center → muted violet edges, rare warm sparkles
  vec3 centerColor = vec3(0.65, 0.85, 1.0);
  vec3 edgeColor = vec3(0.4, 0.25, 0.7);
  vColor = mix(centerColor, edgeColor, pow(edgeDist, 0.7));
  // Rare warm sparkle particles (~15%)
  vColor += vec3(0.2, 0.08, 0.0) * step(0.85, seed);

  gl_Position = projectionMatrix * mvPos;
}
`;

export const particleStreamFrag = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;

void main() {
  float dist = length(gl_PointCoord - 0.5);

  // Soft circular falloff
  float alpha = smoothstep(0.5, 0.08, dist) * vAlpha;

  // Gentle center brightening
  vec3 color = vColor * (0.6 + 0.6 * smoothstep(0.4, 0.0, dist));

  gl_FragColor = vec4(color, alpha);
}
`;

// ─── Particle Character Shaders ─────────────────────────────────────

export const particleCharVert = /* glsl */ `
uniform sampler2D uBoneTexture;
uniform sampler2D uBoneTexturePrev;
uniform float uBoneCount;
uniform float uTime;
uniform float uSpeed;

attribute float boneIndex;
attribute vec3 localOffset;
attribute float particleSeed;

varying vec3 vColor;
varying float vAlpha;

mat4 getBoneMat(sampler2D tex, float idx) {
  float y = (idx + 0.5) / uBoneCount;
  vec4 c0 = texture2D(tex, vec2(0.125, y));
  vec4 c1 = texture2D(tex, vec2(0.375, y));
  vec4 c2 = texture2D(tex, vec2(0.625, y));
  vec4 c3 = texture2D(tex, vec2(0.875, y));
  return mat4(c0, c1, c2, c3);
}

vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

void main() {
  mat4 boneCurr = getBoneMat(uBoneTexture, boneIndex);
  mat4 bonePrev = getBoneMat(uBoneTexturePrev, boneIndex);

  vec4 posCurr = boneCurr * vec4(localOffset, 1.0);
  vec4 posPrev = bonePrev * vec4(localOffset, 1.0);

  float trailFactor = particleSeed > 0.7 ? (particleSeed - 0.7) / 0.3 : 0.0;
  float speedIntensity = min(uSpeed * 2000.0, 1.0);
  trailFactor *= speedIntensity;

  vec4 worldPos = mix(posCurr, posPrev, trailFactor * 0.6);

  float j1 = sin(uTime * 3.0 + particleSeed * 6.283) * 0.012;
  float j2 = cos(uTime * 1.7 + particleSeed * 4.0) * 0.008;
  vec3 jitterDir = normalize(localOffset + vec3(0.001));
  worldPos.xyz += jitterDir * (j1 + j2);

  vec4 mvPosition = viewMatrix * worldPos;

  float sizeScale = mix(1.0, 0.7, speedIntensity);
  float baseSize = (2.0 + particleSeed * 2.5) * sizeScale;
  gl_PointSize = baseSize * (100.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 0.8);

  float hue = fract(worldPos.y * 0.12 + particleSeed * 0.5 + uTime * 0.08);
  vColor = hsl2rgb(hue, 0.8, 0.65);

  float dist = length(localOffset);
  vColor += vec3(smoothstep(0.2, 0.0, dist) * 0.4);

  vAlpha = smoothstep(0.5, 0.0, dist) * 0.45 + 0.55;
  vAlpha *= 1.0 - trailFactor * 0.35;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleCharFrag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.12, dist) * vAlpha;
  float core = smoothstep(0.12, 0.0, dist) * 0.5;
  float outerGlow = smoothstep(0.5, 0.3, dist) * 0.15;
  vec3 color = vColor + vec3(core + outerGlow);
  gl_FragColor = vec4(color, alpha);
}
`;

// ─── Planet Atmosphere Glow (billboard sprite behind planet) ─────────

export const planetGlowVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const planetGlowFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  float dist = length(vUv - 0.5) * 2.0;
  // Soft atmospheric falloff — concentrated near the planet edge
  float glow = exp(-dist * 2.5) * 0.6;
  glow += exp(-dist * 5.0) * 0.3;
  // Fade to zero at edges for clean blending
  glow *= smoothstep(1.0, 0.3, dist);
  gl_FragColor = vec4(uColor * uIntensity, glow * uIntensity);
}
`;
