export const FJ_Model = {
    FJ: {
        name: 'FJ',
        children: ['Outerior'],
        position: {x: 0, y: 1, z: 0}
    },
    Outerior: {
        name: 'Pillar',
        parent: 'FJ',
        position: {x: 0, y: 0, z: 0},
        objects: [
            {
                name: 'Pillar 1',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: -112.5, y: 24, z: 70  }
            },
            {
                name: 'Pillar 2',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: -74, y: 24, z: 70  }
            },
            {
                name: 'Pillar 3',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: -36, y: 24, z: 70  }
            },
            {
                name: 'Pillar 4',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: -2.5, y: 24, z: 70  }
            },
            {
                name: 'Pillar 5',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: 60, y: 24, z: 70  }
            },
            {
                name: 'Pillar 6',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: -112.5, y: 24, z: 32  }
            },
            {
                name: 'Pillar 7',
                geometry: new THREE.BoxGeometry(8, 48, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: 60, y: 24, z: 32  }
            },
            
        ]
    }
}
