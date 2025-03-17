class SceneManager {
    constructor() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.objects = {}; // Store objects for easy access
        this.groups = {}; // Store Group references

        this.animate = this.animate.bind(this);
        // Initialize
        this.init();
    }

    init() {
        // Renderer settings
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xeeeeee);
        document.body.appendChild(this.renderer.domElement);

        // Camera position
        this.camera.position.set(100, 45, 75);
        this.camera.lookAt(new THREE.Vector3(10, 0, 30));

        // Lights (INCREASED INTENSITY)
        this.addAmbientLight(0xffffff, 0.88); // Increased from 0.8
        this.addDirectionalLight(0xffffff, 0.2, { x: 0, y: 5, z: 5 }); // Increased from 0.2

        // Camera control
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());

        // Initialize groups and objects
        this.initGroups(this.getGroups());
    }

    // Define groups and objects
    // Add Objects / groups here
    getGroups() {
        return {
            FJ: {
                name: 'FJ',
                children: ['OuterWall', 'Floor'],
                position: { x: -1, y: 5, z: 0 }
            },
            OuterWall: {
                name: 'OuterWall',
                parent: 'FJ',
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
                        geometry: new THREE.BoxGeometry(4, 30, 0),
                        material: new THREE.MeshStandardMaterial({ color: 0xc1c1b1 }),
                        position: { x: 27.5, y: 24, z: 22 }
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
                parent: 'FJ',
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
                        geometry: new THREE.BoxGeometry(50, 0, 29),
                        material: new THREE.MeshStandardMaterial({ color: 0xc8c8c8 }),
                        position: { x: 4.5, y: 9, z: 4.5 }
                    },
                ]
            }
        };
    }

    // Initialize Groups
    initGroups(groups) {
        for (const groupName in groups) {
            const groupData = groups[groupName];
            const group = this.addGroup(groupData.name, groupData.parent);

            // Set group position if specified
            if (groupData.position) {
                group.position.set(
                    groupData.position.x,
                    groupData.position.y,
                    groupData.position.z
                );
            }

            // Add objects to the group
            if (groupData.objects) {
                groupData.objects.forEach(obj => {
                    this.addObject(
                        obj.name,
                        obj.geometry,
                        obj.material,
                        obj.position,
                        groupData.name
                    );
                });
            }
        }
    }

    // Group container
    addGroup(name, parentGroup = null) {
        const group = new THREE.Group();
        this.groups[name] = group;
        
        if (parentGroup) {
            this.groups[parentGroup].add(group);
        } else {
            this.scene.add(group);
        }
        
        return group;
    }

    // Add a 3D object to the scene
    addObject(name, geometry, material, position = { x: 0, y: 0, z: 0 }, parent = null) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        
        if (parent && this.groups[parent]) {
            this.groups[parent].add(mesh);
        } else {
            this.scene.add(mesh);
        }
        
        this.objects[name] = mesh;
        return mesh;
    }

    // Get an object by name
    getObject(name) {
        return this.objects[name];
    }

    // Add ambient light
    addAmbientLight(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity);
        this.scene.add(light);
    }

    // Add directional light
    addDirectionalLight(color, intensity, position) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(position.x, position.y, position.z);
        this.scene.add(light);
    }

    // Handle window resize
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Start animation loop
    animate() {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize and run
const sceneManager = new SceneManager();
sceneManager.animate();