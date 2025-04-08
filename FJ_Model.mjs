import { objects } from "./objects.mjs";

export const FJ_Model = {
    FJ: {
        name: 'FJ',
        position: {x: 0, y: 5, z: 0},
        objects: [
            {
                name: 'fj-booth',
                geometry: new THREE.BoxGeometry(8, 10, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: 30, y: 0, z: 0 }
            },
        ]
    },
    Outerior: {
        name: 'Outerior',
        position: {x: 0, y: 1, z: 0},
        objects: [
            {
                name: 'myc-elev',
                geometry: new THREE.BoxGeometry(8, 38, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x923123 }),
                position: { x: 30, y: 18, z: 21 }
            },
            {
                name: 'myc-elev-glass',
                geometry: new THREE.BoxGeometry(7, 40, 6),
                material: new THREE.MeshStandardMaterial({ color: 0x9ffff }),
                position: { x: 30, y: 19, z: 26 }
            },
            {
                name: 'myc-elev-top',
                geometry: new THREE.BoxGeometry(6, 6, 8),
                material: new THREE.MeshStandardMaterial({ color: 0x9231ff }),
                position: { x: 30, y: 40, z: 20 }
            },
            {
                name: 'myc',
                geometry: new THREE.BoxGeometry(40, 32, 30),
                material: new THREE.MeshStandardMaterial({ color: 0x923163 }),
                position: { x: 22, y: 25, z: 4 }
            },
            {
                name: 'myc-lounge',
                geometry: new THREE.BoxGeometry(20, 11, 20),
                material: new THREE.MeshStandardMaterial({ color: 0x223463 }),
                position: { x: 40, y: 14.5, z: 9.2 }
            },
            {
                name: 'pool-top-fj',
                geometry: new THREE.BoxGeometry(26, 2, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x126123 }),
                position: { x: -9, y: 10, z: 6 }
            },
            {
                name: 'gedc-glass-top',
                geometry: new THREE.BoxGeometry(10, 0, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x1261ff }),
                position: { x: -25, y: 9, z: 6 }
            },
            {
                name: 'gedc-lib-gc',
                geometry: new THREE.BoxGeometry(26, 30, 16),
                material: new THREE.MeshStandardMaterial({ color: 0x1422920 }),
                position: { x: -15, y: 24, z: -6 }
            },
            {
                name: 'gedc-lib-gc-glass-corner',
                geometry: new THREE.BoxGeometry(6, 23, 14),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: -4.8, y: 22, z: -4.8 }
            },
            {
                name: 'gedc-lib-gc-glass-f0',
                geometry: new THREE.BoxGeometry(12, 3, 14),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: -12, y: 13, z: -4.8 }
            },
            {
                name: 'gedc-lib-gc-glass-f1',
                geometry: new THREE.BoxGeometry(12, 3, 14),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: -12, y: 22, z: -4.8 }
            },
            {
                name: 'gedc-lib-gc-glass-f2',
                geometry: new THREE.BoxGeometry(12, 3, 14),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: -12, y: 31, z: -4.8 }
            },
            {
                name: 'glass-gedc',
                geometry: new THREE.BoxGeometry(10, 48, 14),
                material: new THREE.MeshStandardMaterial({ color: 0x929123 }),
                position: { x: -27, y: 23, z: -8 }
            },
            {
                name: 'f1-g-bot',
                geometry: new THREE.BoxGeometry(10, 1.5, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 4.5, y: 19.5, z: 16 }
            },
            {
                name: 'f1-g-top',
                geometry: new THREE.BoxGeometry(9, 2.5, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 5, y: 25, z: 16 }
            },
            {
                name: 'glass-dorm-f1-l',
                geometry: new THREE.BoxGeometry(8, 4, 9),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 5, y: 22, z: 16 }
            },
            {
                name: 'f1-g-bot',
                geometry: new THREE.BoxGeometry(10, 1.5, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 26, y: 19.5, z: 16 }
            },
            {
                name: 'f1-g-top',
                geometry: new THREE.BoxGeometry(10, 2.5, 10),
                material: new THREE.MeshStandardMaterial({ color: 0x32673 }),
                position: { x: 26, y: 25, z: 16 }
            },
            {
                name: 'glass-dorm-f1-l',
                geometry: new THREE.BoxGeometry(8, 4, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 25.2, y: 22, z: 17.5 }
            },
            {
                name: 'glass-dorm-f1-l',
                geometry: new THREE.BoxGeometry(13, 4, 7),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 15, y: 22, z: 16 }
            },
            {
                name: 'glass-dorm-f1-r',
                geometry: new THREE.BoxGeometry(4, 5, 18),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 40.5, y: 23, z: 10.5 }
            },
            {
                name: 'glass-dorm-f2-r',
                geometry: new THREE.BoxGeometry(4, 5, 18),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 40.5, y: 31, z: 10.5 }
            },
            {
                name: 'glass-dorm-f2-l',
                geometry: new THREE.BoxGeometry(25, 5, 18),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 14, y: 31, z: 10.5 }
            },
            {
                name: 'glass-myc-lounge-l',
                geometry: new THREE.BoxGeometry(25, 8, 8),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 14.3, y: 14.5, z: 15.4 }
            },
            {
                name: 'glass-myc-lounge-r',
                geometry: new THREE.BoxGeometry(17, 8, 20.5),
                material: new THREE.MeshStandardMaterial({ color: 0xffff }),
                position: { x: 41.7, y: 14.5, z: 9.2 }
            },
            {
                name: 'glass-myc-lounge-r',
                geometry: new THREE.BoxGeometry(17, 2, 11),
                material: new THREE.MeshStandardMaterial({ color: 0xf00f0 }),
                position: { x: 41.3, y: 10, z: -5.5 }
            },
        ]
    }
}