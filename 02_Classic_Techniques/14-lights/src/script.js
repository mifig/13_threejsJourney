import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// 1. Ambient Light
// const ambientLight = new THREE.AmbientLight()
// ambientLight.color = new THREE.Color("white")
// ambientLight.intensity = 0.5
// gui.add(ambientLight, "intensity").min(0).max(3).step(0.001).name("AmbLight Intensity")
// scene.add(ambientLight)

// // // 2. Directional Light
// const directionalLight = new THREE.DirectionalLight()
// directionalLight.color = new THREE.Color(0x00fffc)
// directionalLight.intensity = 0.9
// directionalLight.position.set(-0.5, 0.3, 1)
// gui.add(directionalLight, "intensity").min(0).max(3).step(0.001).name("DirLight Intensity")
// scene.add(directionalLight)

// // 3. Hemisphere Light (similar to ambient, but one color for sky + one for ground)
// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
// scene.add(hemisphereLight)

// // 4. Point Light
// const pointLight = new THREE.PointLight(0xff9000, 1.5)
// pointLight.distance = 3
// pointLight.decay = 2
// pointLight.position.set(1, -0.5, 1)
// scene.add(pointLight)

// 5. RectArea Light (plane of light that ilumates only in one direction)
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 1.2, 1, 10)
scene.add(rectAreaLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.6
material.metalness = 0.3
gui.add(material, "roughness").min(0).max(1).step(0.001)
gui.add(material, "metalness").min(0).max(1).step(0.001)

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()