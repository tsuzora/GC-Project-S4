export const objects = {
    Floor: {
        name: 'Floor',
        position: { x: 10, y: 0, z: 5 },
        objects: [
            {
                name: 'floor',
                geometry: new THREE.BoxGeometry(100, 0, 65),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                position: { x: 0, y: 0, z: 0 }
            },
        ]
    }
}