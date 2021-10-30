import './style.css'
import * as THREE from 'three'
import {getSphere} from './molds'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

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

const light1 = gui.addFolder('Light 1')
addGuiLight(light1, pointLight)

//Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity = 1
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')
addGuiLight(light2, pointLight2)

const pointLioghtHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLioghtHelper)

//Light 3
const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.set(-1.86,1,-1.65)
pointLight3.intensity = 1
scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')
addGuiLight(light3, pointLight3)

const light3Color = {
    color: 0xff0000
}

light3.addColor(light3Color, 'color')
    .onChange(()=>{
        pointLight3.color.set(light3Color.color)
    })

const pointLioghtHelper2 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLioghtHelper2)

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
camera.position.z = 2
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update object
    sphere.rotation.y = .5 * elapsedTime
    //sphere.rotation.x = .5 * elapsedTime
    //sphere.rotation.z = .5 * elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()