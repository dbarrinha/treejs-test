import * as THREE from 'three'

export const getSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(0.5, 32, 32 )
    const material = new THREE.MeshStandardMaterial( 
        { 
            color: "#e78", 
            metalness: 0.2,
            roughness: 0.3, 
            flatShading: 10
        } 
    );
    return new THREE.Mesh( geometry, material );
}