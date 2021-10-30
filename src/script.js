import './style.css'
import * as THREE from 'three'
import {getSphere} from './molds'
import * as dat from 'dat.gui'

//const gui = new dat.GUI()

function addGuiLight(folderRef, light){
    folderRef.add(light.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    folderRef.add(light.position, 'x')
    .min(-6)
    .max(6)
    .step(0.01)
    folderRef.add(light.position, 'z')
    .min(-3)
    .max(3)
    .step(0.01)
    folderRef.add(light, 'intensity')
    .min(0)
    .max(10)
    .step(0.01)
}

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sphere = getSphere()
scene.add(sphere)

//Light 1
const pointLight = new THREE.PointLight(0xffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const light1 = gui.addFolder('Light 1')
// addGuiLight(light1, pointLight)

//Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity = 1
scene.add(pointLight2)

// const light2 = gui.addFolder('Light 2')
// addGuiLight(light2, pointLight2)

// const pointLioghtHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLioghtHelper)

//Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(2.13,-3, -1.98)
pointLight3.intensity = 6.8
scene.add(pointLight3)

// const light3 = gui.addFolder('Light 3')
// addGuiLight(light3, pointLight3)

// const light3Color = {
//     color: 0xe1ff
// }

// light3.addColor(light3Color, 'color')
//     .onChange(()=>{
//         pointLight3.color.set(light3Color.color)
//     })

// const pointLioghtHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLioghtHelper2)

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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2.5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

function onDocumentScroll(event){
    sphere.position.y = window.scrollY * .001
}


document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('scroll', onDocumentScroll)
const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001;
    targetY = mouseY * .001;
    
    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += 0.1 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.1 * (targetY - sphere.rotation.x)
    sphere.position.z += 0.1 * (targetY - sphere.rotation.x)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()