import * as THREE from "three/webgpu";
import Stats from "stats.js";

const urlParams = new URLSearchParams(window.location.search);
const count = parseInt(urlParams.get("count")) || 10000;
const differentMaterials = parseInt(urlParams.get("material")) === 1 || false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 200, 0);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log(renderer);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(3, 4, 5);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0 });

for (let i = 0; i < count; i++) {
  const mesh = new THREE.Mesh(
    geometry,
    differentMaterials ? material.clone() : material
  );
  if (differentMaterials) {
    mesh.material.color.setHSL(Math.random(), Math.random(), Math.random());
  }
  mesh.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  scene.add(mesh);
}

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  renderer.renderAsync(scene, camera);
  stats.end();
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
