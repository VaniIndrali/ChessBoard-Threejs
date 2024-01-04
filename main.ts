import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 35

//adding axes helper to the object
scene.add(new THREE.AxesHelper(15)); 

// adding light for the meshphongmaterial
const frontLight = new THREE.PointLight(0xffffff, 1000)
frontLight.position.set(2.5, -7.5, 15)
scene.add(frontLight)

const backLight = new THREE.PointLight(0xffffff, 1000)
backLight.position.set(2.5, -7.5, -15)
scene.add(backLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement)

// for moving the objects
const orbitControl = new OrbitControls(camera,renderer.domElement);

// add materials to the object using MTLLoader & load object using OBJLoader
const chessBoardMaterial = new MTLLoader();
chessBoardMaterial.load(
    './Model/chessboardModel.mtl',
    (materials) => {
        materials.preload()

        // loading chessboard object using objectloader
        const chessBoard = new OBJLoader();

        // by default it is MeshPhongMaterial hence light is needed
        chessBoard.setMaterials(materials)
        chessBoard.load(
        './Model/chessboardModel.obj',
        (object) => {
            scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
    }
)

// this helps to update the renderer size and camera aspect
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function animate() {
    requestAnimationFrame(animate);
    // update orbit control
    orbitControl.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()