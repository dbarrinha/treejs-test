import './style.css'
import * as THREE from 'three'
import {getSphere} from './molds'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sphere = getSphere()
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffff, 0.6)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(1,1,1)
pointLight2.intensity = 1
scene.add(pointLight2)

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
    sphere.rotation.x = .5 * elapsedTime
    sphere.rotation.z = .5 * elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()