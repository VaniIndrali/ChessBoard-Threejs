import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})

const basicCube = new THREE.Mesh(geometry, material)
scene.add(basicCube);

function animate() {
    requestAnimationFrame(animate);
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()