import * as t3d from "t3d";
import Stats from "stats.js";

const urlParams = new URLSearchParams(window.location.search);
const count = parseInt(urlParams.get("count")) || 10000;
const differentMaterials = parseInt(urlParams.get("material")) === 1 || false;

const width = window.innerWidth || 2;
const height = window.innerHeight || 2;

const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl2", {
  antialias: true,
  alpha: false,
});
const renderer = new t3d.WebGLRenderer(gl);
renderer.setClearColor(0.1, 0.1, 0.1, 1);
const backRenderTarget = new t3d.RenderTargetBack(canvas);

const scene = new t3d.Scene();

const camera = new t3d.Camera();
camera.outputEncoding = t3d.TEXEL_ENCODING_TYPE.SRGB;
camera.position.set(0, 200, 0);
camera.lookAt(new t3d.Vector3(0, 0, 0), new t3d.Vector3(0, 1, 0));
camera.setPerspective((45 / 180) * Math.PI, width / height, 1, 1000);
scene.add(camera);

const ambientLight = new t3d.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new t3d.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(new t3d.Vector3(), new t3d.Vector3(0, 1, 0));
scene.add(directionalLight);

const material = new t3d.PBRMaterial();
material.metalness = 0;
material.roughness = 1;
material.forceUpdateUniforms = differentMaterials; // Force update uniforms if materials are different
const geometry = new t3d.BoxGeometry(1, 1, 1);
for (let i = 0; i < count; i++) {
  const box = new t3d.Mesh(
    geometry,
    differentMaterials ? material.clone() : material
  );
  if (differentMaterials) {
    box.material.diffuse.setHSL(Math.random(), Math.random(), Math.random());
  }
  box.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  box.euler.x = Math.random() * 2 * Math.PI;
  box.euler.y = Math.random() * 2 * Math.PI;
  scene.add(box);
}

const stats = new Stats();
document.body.appendChild(stats.dom);

function loop() {
  requestAnimationFrame(loop);

  stats.begin();

  scene.updateMatrix();
  scene.updateRenderStates(camera);
  scene.updateRenderQueue(camera);

  renderer.setRenderTarget(backRenderTarget);
  renderer.clear(true, true, false);
  renderer.renderScene(scene, camera);

  stats.end();
}
requestAnimationFrame(loop);

function onWindowResize() {
  const width = window.innerWidth || 2;
  const height = window.innerHeight || 2;

  camera.setPerspective((45 / 180) * Math.PI, width / height, 1, 1000);

  backRenderTarget.resize(width, height);
}
window.addEventListener("resize", onWindowResize);
