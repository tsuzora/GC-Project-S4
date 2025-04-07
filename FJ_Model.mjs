export const FJ_Model = {
    FJ: {
        name: 'FJ',
        children: ['Outerior'],
        position: {x: 0, y: 1, z: 0}
    },
    Outerior: {
        name: 'Outerior',
        parent: 'FJ',
        position: {x: 0, y: 0, z: 0},
        objects: [
            {
                name: '',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: 30, y: 23, z: 21 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(24, 30, 30),
                material: new THREE.MeshStandardMaterial({ color: 0x923163 }),
                position: { x: 15, y: 24, z: 4 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(26, 2, 12),
                material: new THREE.MeshStandardMaterial({ color: 0x126123 }),
                position: { x: -9, y: 10, z: 13 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(26, 30, 22),
                material: new THREE.MeshStandardMaterial({ color: 0x1422920 }),
                position: { x: -15, y: 24, z: 0 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(10, 48, 18),
                material: new THREE.MeshStandardMaterial({ color: 0x929123 }),
                position: { x: -27, y: 23, z: -2 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(10, 1, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 4.5, y: 20, z: 16 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(9, 1, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 5, y: 26, z: 16 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(8, 5, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 5, y: 23, z: 16 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(10, 1, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 26, y: 20, z: 16 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(10, 1, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 26, y: 26, z: 16 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(8, 5, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 25, y: 23, z: 17.5 }
            },
            {
                name: '',
                geometry: new THREE.BoxGeometry(13, 5, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 15, y: 23, z: 15.6 }
            },
        ]
    }
}