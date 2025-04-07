export const objects = {
    FJWall: {
        name: 'FJWall',
        children: ['OuterWall', 'Floor'],
        position: { x: -0.5, y: 1, z: 0 }
    },
    OuterWall: {
        name: 'OuterWall',
        parent: 'FJWall',
        position: { x: -5, y: 0, z: -3 },
        objects: [
            //Front Wall
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(25, 10, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: -4, y: 4, z: 17 }
            },
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(11, 10, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: 14, y: 14, z: 22 }
            },
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(14, 10, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: 32.5, y: 14, z: 22 }
            },
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(6, 30, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: 28.5, y: 24, z: 22 }
            },
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(6, 50, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: 22.5, y: 24, z: 27 }
            },
            {
                name: 'wallFront',
                geometry: new THREE.BoxGeometry(10, 50, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                position: { x: -21.5, y: 24, z: 10 }
            },
            // Back Wall
            {
                name: 'wallBack',
                geometry: new THREE.BoxGeometry(66, 50, 0),
                material: new THREE.MeshStandardMaterial({ color: 0xc1a9a9 }),
                position: { x: 6.5, y: 24, z: -8 }
            },
            //Left Wall
            {
                name: 'wallLeft',
                geometry: new THREE.BoxGeometry(0, 10, 5),
                material: new THREE.MeshStandardMaterial({ color: 0xa1c1b1 }),
                position: { x: 8.5, y: 14, z: 19.5 }
            },
            {
                name: 'wallLeft',
                geometry: new THREE.BoxGeometry(0, 10, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xa1c1b1 }),
                position: { x: -16.5, y: 4, z: 13.5 }
            },
            {
                name: 'wallLeft',
                geometry: new THREE.BoxGeometry(0, 50, 5),
                material: new THREE.MeshStandardMaterial({ color: 0xa1c1b1 }),
                position: { x: 19.5, y: 24, z: 24.5 }
            },
            {
                name: 'wallLeft',
                geometry: new THREE.BoxGeometry(0, 50, 18),
                material: new THREE.MeshStandardMaterial({ color: 0xa1c1b1 }),
                position: { x: -26.5, y: 24, z: 1 }
            },
            // Right Wall
            {
                name: 'wallRight',
                geometry: new THREE.BoxGeometry(0, 50, 5),
                material: new THREE.MeshStandardMaterial({ color: 0x909090 }),
                position: { x: 25.5, y: 24, z: 24.5 }
            },
            {
                name: 'wallRight',
                geometry: new THREE.BoxGeometry(0, 10, 30),
                material: new THREE.MeshStandardMaterial({ color: 0x909090 }),
                position: { x: 39.5, y: 14, z: 7 }
            },
        ]
    },
    Floor: {
        name: 'Floor',
        parent: 'FJWall',
        position: { x: -1, y: 0, z: 0 },
        objects: [
            {
                name: 'floor',
                geometry: new THREE.BoxGeometry(75, 0, 50),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                position: { x: 0, y: -1, z: 0 }
            },
            {
                name: 'floor',
                geometry: new THREE.BoxGeometry(56, 0, 30),
                material: new THREE.MeshStandardMaterial({ color: 0xc8880c8 }),
                position: { x: 7.5, y: 9, z: 4 }
            },
            {
                name: 'floor',
                geometry: new THREE.BoxGeometry(8, 0, 29),
                material: new THREE.MeshStandardMaterial({ color: 0xc8c8880 }),
                position: { x: 31.5, y: 19, z: 4.5 }
            },
        ]
    }
}