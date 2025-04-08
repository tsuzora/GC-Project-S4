export const objects = {
    CourtWall: {
        name: 'CourtWall',
        children: ['OuterWall', 'Floor'],
        position: { x: -0.5, y: 1, z: 0 }
    },
    OuterWall: {
        name: 'OuterWall',
        parent: 'CourtWall',
        position: { x: -5, y: 0, z: -3 },
        objects: [
            {
                name: 'gates',
                geometry: new THREE.BoxGeometry(0, 6, 90),
                material: new THREE.MeshStandardMaterial({ color: 0x00000000, transparent: true, opacity: 0.8 }),
                position: { x: -108.5, y: 3, z: -25 }
            },
            {
                name: 'glass wall 1',
                geometry: new THREE.BoxGeometry(0, 48, 35),
                material: new THREE.MeshStandardMaterial({ color: 0x4F959D, transparent: true, opacity: 0.7 }),
                position: { x: -108.5, y: 24, z: 55 }
            },
            {
                name: 'glass wall 2',
                geometry: new THREE.BoxGeometry(170, 48, 0),
                material: new THREE.MeshStandardMaterial({ color: 0x4F959D, transparent: true, opacity: 0.7 }),
                position: { x: -23, y: 24, z: 73 }
            },
            {
                name: 'glass wall 3',
                geometry: new THREE.BoxGeometry(0, 48, 35),
                material: new THREE.MeshStandardMaterial({ color: 0x4F959D, transparent: true, opacity: 0.7 }),
                position: { x: 65, y: 24, z: 55 }
            },
            
        ]
    },
    Floor: {
        name: 'Floor',
        parent: 'CourtWall',
        position: { x: -1, y: 0, z: 0 },
        objects: [
            {
                name: 'floor',
                geometry: new THREE.BoxGeometry(225, 0, 140),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                position: { x: 0, y: 0, z: 0 }
            },
            {
                name: 'court 1',
                geometry: new THREE.BoxGeometry(43, 0, 75),
                material: new THREE.MeshStandardMaterial({ color: 0xBF3131 }),
                position: { x: -75, y: 0.1, z: 10 }
            },
            {
                name: 'court 2',
                geometry: new THREE.BoxGeometry(43, 0, 75),
                material: new THREE.MeshStandardMaterial({ color: 0xBF3131 }),
                position: { x: -25, y: 0.1, z: 10 }
            },
            {
                name: 'court 2',
                geometry: new THREE.BoxGeometry(43, 0, 75),
                material: new THREE.MeshStandardMaterial({ color: 0xBF3131 }),
                position: { x: 25, y: 0.1, z: 10 }
            },
            {
                name: 'grass',
                geometry: new THREE.BoxGeometry(25, 0, 65),
                material: new THREE.MeshStandardMaterial({ color: 0x67AE6E }),
                position: { x: 73, y: 0.1, z: 37 }
            },
            {
                name: 'gym below floor1',
                geometry: new THREE.BoxGeometry(25, 2, 65),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                position: { x: 98, y: 1, z: 37 }
            },
            {
                name: 'gym below floor2',
                geometry: new THREE.BoxGeometry(50, 2, 65),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                position: { x: 86, y: 1, z: -28 }
            },
            
        ]
    }
}
