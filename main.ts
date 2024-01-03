import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 30

//adding axes helper to the object
scene.add(new THREE.AxesHelper(15)); 

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement)

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
})

// for moving the objects
const orbitControl = new OrbitControls(camera,renderer.domElement);

// loading chessboard object using objectloader
const chessBoard = new OBJLoader();
chessBoard.load(
    './Model/chessboardModel.obj',
    (object) => {
        // console.log(object);
        // console.log(object.children);
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = material
            }
        })
        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

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