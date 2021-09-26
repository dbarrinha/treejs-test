import * as THREE from 'three'
import Texture from '../static/textures/NormalMap.png'

export const getSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(0.5, 32, 32 )
    const textureLoader = new THREE.TextureLoader()
    const normalTexture = textureLoader.load(Texture)
    const material = new THREE.MeshStandardMaterial( 
        { 
            color: "#e78", 
            metalness: 0.2,
            roughness: 0.3, 
            flatShading: 10,
            normalMap: normalTexture
        } 
    );
    return new THREE.Mesh( geometry, material );
}