import * as BABYLON from "@babylonjs/core/Legacy/legacy.js";
import Stats from "stats.js";

async function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const count = parseInt(urlParams.get("count")) || 10000;
  const differentMaterials = parseInt(urlParams.get("material")) === 1 || false;

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const engine = new BABYLON.WebGPUEngine(canvas, { antialias: true });
  await engine.initAsync();

  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1);

  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 200, 0),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());

  const ambientLight = new BABYLON.HemisphericLight(
    "ambientLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  ambientLight.intensity = 0.2;
  ambientLight.diffuse = new BABYLON.Color3(1, 1, 1);

  const directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(-3, -4, -5).normalize(),
    scene
  );
  directionalLight.intensity = 0.8;

  const material = new BABYLON.PBRMaterial("material", scene);
  material.roughness = 1;
  material.metallic = 0;

  const geometry = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);

  for (let i = 0; i < count; i++) {
    const box = geometry.clone("box" + i);
    box.material = differentMaterials ? material.clone() : material;
    if (differentMaterials) {
      box.material.diffuseColor = new BABYLON.Color3(
        Math.random(),
        Math.random(),
        Math.random()
      );
    }
    box.position = new BABYLON.Vector3(
      Math.random() * 100 - 50,
      Math.random() * 100 - 50,
      Math.random() * 100 - 50
    );
    box.rotation.x = Math.random() * 2 * Math.PI;
    box.rotation.y = Math.random() * 2 * Math.PI;
  }
  geometry.setEnabled(false); // Hide the original mesh

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  engine.runRenderLoop(() => {
    stats.begin();
    scene.render();
    stats.end();
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
  });
}

main().catch(console.error);
