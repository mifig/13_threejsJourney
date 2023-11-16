import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

/**
 * Base
 */
// Controls
const gui = new GUI()
const materialControls = gui.addFolder("Material")

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const dooralphaTexture = textureLoader.load("./textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")

const matcapTexture = textureLoader.load("./textures/matcaps/3.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace

const gradientTexture = textureLoader.load("./textures/gradients/3.jpg")

// -----------
// OBJECTS
// -----------
// 1. Basic Material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color("green")
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = dooralphaTexture

// 2. Normal Material
// const material = new THREE.MeshNormalMaterial()

// 3. Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// 4. Depth Material (used internally by Threejs)
// const material = new THREE.MeshDepthMaterial()

// 5. Lambert Material (requires lighting)
// const material = new THREE.MeshLambertMaterial()

// 6. Phong Material (also lights - less performant than lambert, but better with more features)
// const material = new THREE.MeshPhongMaterial()
// material.side = THREE.DoubleSide  
// material.shininess = 100 /* Light reflection intensity */
// material.specular = new THREE.Color("purple") /* Light reflection color */

// 7. Toon Material (similar to lambert but cartoonish)
// const material = new THREE.MeshToonMaterial()
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture /* passing more gradients for shadows / lighting instead of only 2 */

// 8. Standard Material (physically based rendering, supports more realistic lighting, metalness, roughness, etc..)
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.metalnessMap = doorMetalnessTexture
// material.roughness = 1
// material.roughnessMap = doorRoughnessTexture
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 2
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = dooralphaTexture

// 8. Physical Material (same as standard but more properties)
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// // material.aoMapIntensity = 2
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = dooralphaTexture

  // CLEARCOAT (thin layer of glass on top, like varnish)
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// materialControls.add(material, "clearcoat")
//   .min(0)
//   .max(1)
//   .step(0.001)

// materialControls.add(material, "clearcoatRoughness")
//   .min(0)
//   .max(1)
//   .step(0.001)

  // SHEEN (for fluffy materials)
// material.sheen = 1
// material.sheenRoughness = 0
// material.sheenColor.set(new THREE.Color("purple"))

// materialControls.add(material, "sheen")
//   .min(0)
//   .max(1)
//   .step(0.001)

// materialControls.add(material, "sheenRoughness")
//   .min(0)
//   .max(1)
//   .step(0.001)

// materialControls.addColor(material, "sheenColor")


  // IRIDESCENCE (light reflection artifacts, like CD rainbow light)
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]

// materialControls.add(material, "iridescence")
//   .min(0)
//   .max(1)
//   .step(0.001)

// materialControls.add(material, "iridescenceIOR")
//   .min(1)
//   .max(2.333)
//   .step(0.001)

// materialControls.add(material.iridescenceThicknessRange, "0")
//   .min(1)
//   .max(100)
//   .step(0.001)
//   .name("IriThick Low Limit")
// materialControls.add(material.iridescenceThicknessRange, "1")
//   .min(800)
//   .max(1000)
//   .step(0.001)
//   .name("IriThick Up Limit")

  // TRANSMISSION (glass like effect)
material.transmission = 1
material.ior = 1.5 /* Index of Refraction */
material.thickness = 0.5

materialControls.add(material, "transmission")
  .min(0)
  .max(1)
  .step(0.001)

materialControls.add(material, "ior")
  .min(1)
  .max(10)
  .step(0.001)

materialControls.add(material, "thickness")
  .min(0)
  .max(1)
  .step(0.001)

materialControls.add(material, "wireframe")
materialControls.add(material, "metalness")
  .min(0)
  .max(1)
  .step(0.001)
materialControls.add(material, "roughness")
  .min(0)
  .max(1)
  .step(0.001)

material.side = THREE.DoubleSide

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material
)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
)
sphere.position.x = -1.5

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)

torus.position.x = 1.5

scene.add(plane, sphere, torus)

// Lights
// const ambientLight = new THREE.AmbientLight("white", 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight("white", 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

// Environment
const rgbeLoader = new RGBELoader()
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

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
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Rotate objects
    torus.rotation.y = Math.PI / 8 * elapsedTime
    sphere.rotation.y = Math.PI / 8 * elapsedTime
    plane.rotation.y = Math.PI / 8 * elapsedTime

    torus.rotation.x = Math.PI / 6 * elapsedTime
    sphere.rotation.x = Math.PI / 6 * elapsedTime
    plane.rotation.x = Math.PI / 6 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()