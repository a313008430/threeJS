import "./index.scss";

//TransformControls 可拖拽组件(有辅助线)  url => examples/#misc_controls_transform
//OrbitControls 自由相机

// url => misc_exporter_ply 这个视角不错

import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Stats from "three/examples/jsm/libs/stats.module";

import model1 from "./res/Soldier.glb";
import { OrbitControl } from "./lib/OrbitControls";

var camera: THREE.PerspectiveCamera,
	scene: THREE.Scene,
	renderer: THREE.WebGLRenderer,
	stats: Stats;
var geometry, material, mesh: THREE.Object3D;

init();
animate();

function init() {
	// camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 30000);
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
	camera.position.set(100, 50, 100);
	// camera.position.set(1000, 500, 1000);
	camera.lookAt(0, 200, 0);

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);

	//
	new OrbitControl(camera, render, renderer.domElement);

	//辅助线
	scene.add(new THREE.GridHelper(100, 10));

	var light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(1, 1, 1);
	scene.add(light);

	// var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
	// var material = new THREE.MeshLambertMaterial({ transparent: true });
	// var mesh = new THREE.Mesh(geometry, material);
	// scene.add(mesh);

	geometry = new THREE.BoxBufferGeometry(20, 20, 20);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	stats = Stats();
	document.body.appendChild(stats.dom);

	var loader = new GLTFLoader();
	loader.load(
		model1,
		function (gltf) {
			// gltf.scene.position.x = 0.2;
			// gltf.scene.
			scene.add(gltf.scene);
			gltf.scene.scale.set(10, 10, 10);
		},
		undefined,
		function (error: any) {
			console.error(error);
		}
	);
}

function animate() {
	requestAnimationFrame(animate);
	render();
	stats.update();
}

function render() {
	renderer.render(scene, camera);
}
