import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 35

// adding light for the meshphongmaterial
const frontLight = new THREE.PointLight(0xffffff, 1000)
frontLight.position.set(0,2, 25)
scene.add(frontLight)

const backLight = new THREE.PointLight(0xffffff, 1000)
backLight.position.set(0, -2, -25)
scene.add(backLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement)

// for moving the objects
const orbitControl = new OrbitControls(camera,renderer.domElement);

var obj1;
var obj2;
var obj3;
var obj4;
var group;

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
            object.position.y = 8

            // naming the Meshes explicitly
            object.name= 'Group'
            object.children[0].name="Dark"
            object.children[1].name="Coordinates"
            object.children[2].name="Board"
            object.children[3].name="Light"

            scene.add(object);
            
            // accessing and storing the reference to the mesh by its assigned names
            obj1 = object.getObjectByName('Dark')
            obj2 = object.getObjectByName('Coordinates')
            obj3 = object.getObjectByName('Board')
            obj4 = object.getObjectByName('Light')
            group = object.getObjectByName("Group")

            // for accessing each mesh colors
            var data1 = {
                color: obj1.material.color.getHex(),
            }
            var data2 = {
                color: obj2.material.color.getHex(),
            }
            var data3 = {
                color: obj3.material.color.getHex(),
            }
            var data4 = {
                color: obj4.material.color.getHex(),
            }

            // user interaction panel
            const gui = new GUI();
            const uiPanel = gui.addFolder('UI Panel');
            const squares = uiPanel.addFolder('Set Squares Colors');

            // added color change options
            squares.addColor(data1, 'color').name("Dark Square").onChange(() => {
                obj1.material.color.setHex(data1.color)
            });;

            squares.addColor(data4, 'color').name("Light Square").onChange(() => {
                obj4.material.color.setHex(data4.color);
            });;

            const Others = uiPanel.addFolder('Set Other Colors');

            Others.addColor(data2, 'color').name("1-8 and A-Z").onChange(() => {
                obj2.material.color.setHex(data2.color);
            });;

            Others.addColor(data3, 'color').name("Board").onChange(() => {
                obj3.material.color.setHex(data3.color);
            });;

            const rotation = uiPanel.addFolder('Rotate the board in X,Y or Z axis');

            // added rotation options
            rotation.add(group?.rotation, 'x', 0, Math.PI * 2)
            rotation.add(group?.rotation, 'y', 0, Math.PI * 2)
            rotation.add(group?.rotation, 'z', 0, Math.PI * 2)

            //By default to keep the panel folders open
            uiPanel.open()
            Others.open()
            squares.open()
            rotation.open()

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