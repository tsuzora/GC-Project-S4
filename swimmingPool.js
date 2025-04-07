class SceneManager {
    constructor() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.textureLoader = new THREE.TextureLoader();
        this.sharedTexture = this.textureLoader.load('.png');
        this.objects = {}; // Store objects for easy access
        this.groups = {}; // Store Group references

        this.debugElement = document.getElementById('debug');

        // Movement controls
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };
        this.movementSpeed = 0.5; // Movement speed factor

        this.animate = this.animate.bind(this);
        // Initialize
        this.init();
    }
    
    // Position Info
    updateDebugInfo() {
        const pos = this.camera.position;
        const rot = this.camera.rotation;
        const target = this.controls.target;

        this.debugElement.innerHTML = `
            Camera Position:<br>
            X: ${pos.x.toFixed(2)}<br>
            Y: ${pos.y.toFixed(2)}<br>
            Z: ${pos.z.toFixed(2)}<br>
            <br>
            Camera Rotation:<br>
            X: ${rot.x.toFixed(2)}<br>
            Y: ${rot.y.toFixed(2)}<br>
            Z: ${rot.z.toFixed(2)}<br>
            <br>
            LookAt Target:<br>
            X: ${target.x.toFixed(2)}<br>
            Y: ${target.y.toFixed(2)}<br>
            Z: ${target.z.toFixed(2)}
        `;
    }

    // Initialize Canvas and Objects
    init() {
        // Renderer settings
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xeeeeee);
        document.body.appendChild(this.renderer.domElement);
        
        // Camera position - better view of the pool
        this.camera.position.set(0, 30, 50);
        
        // Lights (INCREASED INTENSITY)
        this.addAmbientLight(0xffffff, 0.9); // Increased for better visibility
        this.addDirectionalLight(0xffffff, 0.8, { x: -10, y: 20, z: 10 }); // Key light
        this.addDirectionalLight(0xffffff, 0.4, { x: 10, y: 10, z: -10 }); // Fill light

        // Camera control
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        this.setupKeyboardControls();

        // Initialize groups and objects
        this.initGroups(this.getGroups());
    }

    
    // Setup keyboard event listeners
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.key.toLowerCase()) {
                case 'w':
                    this.keys.w = true;
                    break;
                case 'a':
                    this.keys.a = true;
                    break;
                case 's':
                    this.keys.s = true;
                    break;
                case 'd':
                    this.keys.d = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.key.toLowerCase()) {
                case 'w':
                    this.keys.w = false;
                    break;
                case 'a':
                    this.keys.a = false;
                    break;
                case 's':
                    this.keys.s = false;
                    break;
                case 'd':
                    this.keys.d = false;
                    break;
            }
        });
    }

    // Handle keyboard movement
    handleKeyboardMovement() {
        // Get camera's right and forward direction (horizontal only)
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        this.camera.getWorldDirection(forward);
        forward.y = 0; // Keep movement horizontal
        forward.normalize();
        
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        
        // Calculate movement direction
        const moveDirection = new THREE.Vector3();
        if (this.keys.w) moveDirection.add(forward);
        if (this.keys.s) moveDirection.sub(forward);
        if (this.keys.a) moveDirection.sub(right);
        if (this.keys.d) moveDirection.add(right);
        
        if (moveDirection.lengthSq() > 0) {
            moveDirection.normalize().multiplyScalar(this.movementSpeed);
            this.camera.position.add(moveDirection);
            
            // Ensure the target of the controls follows the movement direction
            this.controls.target.add(moveDirection);
            this.controls.update();
        }
    }
    

    // Define groups and objects
    // Modified to create an Olympic swimming pool based on the UPH images
    getGroups() {
        return {
            SwimmingPool: {
                name: 'SwimmingPool',
                children: ['PoolStructure', 'WaterSurface', 'LaneDividers', 'JumpPlatforms', 'PoolStairs', 'SurroundingArea'],
                position: { x: 0, y: 0, z: 0 }
            },
            PoolStructure: {
                name: 'PoolStructure',
                parent: 'SwimmingPool',
                position: { x: 0, y: 0, z: 0 },
                objects: [
                    // Main pool structure
                    {
                        name: 'poolWall',
                        geometry: new THREE.BoxGeometry(50, 3, 25), // Olympic pool size
                        material: new THREE.MeshStandardMaterial({ 
                            color: 0x0066aa,
                            transparent:true,
                            opacity: 0.3   
                        }), // Blue color for pool walls
                        position: { x: 0, y: -1.5, z: 0 }
                    }
                ]
            },
            WaterSurface: {
                name: 'WaterSurface',
                parent: 'SwimmingPool',
                position: { x: 0, y: 0, z: 0 },
                objects: [
                    // Water surface with blue color
                    {
                        name: 'water',
                        geometry: new THREE.BoxGeometry(50, 0.1, 25),
                        material: new THREE.MeshStandardMaterial({ 
                            color: 0x0099ff, 
                            transparent: true, 
                            opacity: 0.5,
                        }),
                        position: { x: 0, y: 0, z: 0 }
                    },
                    // Pool bottom with tiles texture
                    {
                        name: 'poolBottom',
                        geometry: new THREE.BoxGeometry(50, 0.1, 25),
                        material: new THREE.MeshStandardMaterial({ 
                            color: 0x006699,
                            transparent:true,
                            opacity: 0.6,
                        }),
                        position: { x: 0, y: 0, z: 0 }
                    }
                ]
            },
            LaneDividers: {
                name: 'LaneDividers',
                parent: 'SwimmingPool',
                position: { x: 3, y: 0, z: 0 },
                objects: this.generateLaneDividers()
            },
            JumpPlatforms: {
                name: 'JumpPlatforms',
                parent: 'SwimmingPool',
                position: { x: 0, y: 0, z: 0 },
                objects: this.generateJumpPlatforms()
            },
            PoolStairs: {
                name: 'PoolStairs',
                parent: 'SwimmingPool',
                position: { x: 0, y: 0, z: 0 },
                objects: this.generatePoolStairs()
            },
            SurroundingArea: {
                name: 'SurroundingArea',
                parent: 'SwimmingPool',
                position: { x: 0, y: 0, z: 0 },
                objects: [
                    // Pool deck
                    {
                        name: 'poolDeck1',
                        geometry: new THREE.BoxGeometry(70, 0.2, 7.5),
                        material: new THREE.MeshStandardMaterial({ color: 0x3232323 }),
                        position: { x: 0, y: 0, z: -16.27}
                    },
                    {
                        name: 'poolDeck2',
                        geometry: new THREE.BoxGeometry(70, 0.2, 8),
                        material: new THREE.MeshStandardMaterial({ color: 0x3232323 }),
                        position: { x: 0, y: 0, z: 16.3}
                    },
                    {
                        name: 'poolDeck3',
                        geometry: new THREE.BoxGeometry(15, 0.4, 41),
                        material: new THREE.MeshStandardMaterial({ color: 0x3232323 }),
                        position: { x: 32, y: 0.1, z: 0}
                    },
                    {
                        name: 'poolDeck4',
                        geometry: new THREE.BoxGeometry(15, 0.2, 41),
                        material: new THREE.MeshStandardMaterial({ color: 0x3232323 }),
                        position: { x: -32, y: 0, z: 0}
                    },
                    // Building structure (simplified from images)
                    {
                        name: 'building',
                        geometry: new THREE.BoxGeometry(40, 20, 20),
                        material: new THREE.MeshStandardMaterial({ color: 0xbb5533 }), // Brick red
                        position: { x: 0, y: 10, z: -30 }
                    },
                    // Roof/covering structure visible in images
                    {
                        name: 'roofStructure1',
                        geometry: new THREE.BoxGeometry(15, 0.5, 30),
                        material: new THREE.MeshStandardMaterial({ color: 0xA8A8A6A }),
                        position: { x: 25, y: 20, z: 0 } 
                    },
                    {
                        name: 'roofStructure2',
                        geometry: new THREE.BoxGeometry(15, 0.5, 30),
                        material: new THREE.MeshStandardMaterial({ color: 0xA8A8A6A }),
                        position: { x: -25, y: 20, z: 0 } 
                    },
                    // Support columns for roof
                    {
                        name: 'supportColumn1',
                        geometry: new THREE.CylinderGeometry(0.5, 0.5, 20),
                        material: new THREE.MeshStandardMaterial({ color: 0x885533 }),
                        position: { x: -30, y: 10, z: 8 }
                    },
                    {
                        name: 'supportColumn2',
                        geometry: new THREE.CylinderGeometry(0.5, 0.5, 20),
                        material: new THREE.MeshStandardMaterial({ color: 0x885533 }),
                        position: { x: 30, y: 10, z: 8 }
                    },
                    {
                        name: 'supportColumn3',
                        geometry: new THREE.CylinderGeometry(0.5, 0.5, 20),
                        material: new THREE.MeshStandardMaterial({ color: 0x885533 }),
                        position: { x: -30, y: 10, z: -8 }
                    },
                    {
                        name: 'supportColumn4',
                        geometry: new THREE.CylinderGeometry(0.5, 0.5, 20),
                        material: new THREE.MeshStandardMaterial({ color: 0x885533 }),
                        position: { x: 30, y: 10, z: -8 }
                    }
                ]
            }
        };
    }

    // Generate lane dividers for the pool
    generateLaneDividers() {
        const dividers = [];
        const laneWidth = 2.5; // Standard Olympic lane width
        const lanesCount = 10; // Olympic pools have 8 lanes
        
        // Calculate starting position for first lane
        const startX = -(laneWidth * (lanesCount / 2 - 0.5));
        
        // Create lane dividers and lane markings on pool bottom
        for (let i = 0; i <= lanesCount; i++) {
            const xPos = startX + (i * laneWidth);

            // Add lane markers on pool bottom
            if (i < lanesCount) {
                dividers.push({
                    name: `laneMarker${i}`,
                    geometry: new THREE.BoxGeometry(45, 0.05, 0.3),
                    material: new THREE.MeshStandardMaterial({ color: 0x000000 }),
                    position: { x: -4 + laneWidth/2, y: -2.85, z: xPos }
                });
            }
            
            // Add T-markers at the ends of each lane
            for (let end = -1.13; end <= 1; end += 2) {
                if (i < lanesCount) {
                    dividers.push({
                        name: `tMarker${i}_${end === -5 ? 'start' : 'end'}`,
                        geometry: new THREE.BoxGeometry(0.5, 0.05, 2.5),
                        material: new THREE.MeshStandardMaterial({ color: 0x000000 }),
                        position: { x: end * 22.5, y: -2.85, z: xPos}
                    });
                }
            }
        }
        
        return dividers;
    }

    // Generate jump platforms (starting blocks)
    generateJumpPlatforms() {
        const platforms = [];
        const laneWidth = 2.5;
        const lanesCount = 10;
        const startX = -(laneWidth * (lanesCount / 2 - 0.5));
        
        for (let i = 2.5; i < lanesCount; i++) {
            const xPos = startX + (i * laneWidth) + (laneWidth/2);
            
            // Platform base
            platforms.push({
                name: `jumpPlatformBase${i}`,
                geometry: new THREE.BoxGeometry(0.6, 1.25, 0.6),
                material: new THREE.MeshStandardMaterial({ color: 0x333333 }),
                position: { x: 25.5, y: 0.8, z: xPos-5}
            });
            
            // Platform top with angled surface
            platforms.push({
                name: `jumpPlatformTop${i}`,
                geometry: new THREE.BoxGeometry(1.5, 0.1, 1),
                material: new THREE.MeshStandardMaterial({ color: 0x333333 }),
                position: { x: 25, y: 1.5, z: xPos-5}
            });
            
           
        }
        
        return platforms;
    }

    // Generate pool stairs based on the reference images
    generatePoolStairs() {
        const stairs = [];
        
        // Pool stairs visible in the corner (based on reference images)
        const stairWidth = 2.5;
        const stairDepth = 0.3;
        
        for (let i = 0; i < 5; i++) {
            stairs.push({
                name: `poolStair${i}`,
                geometry: new THREE.BoxGeometry(stairWidth, 0.1, stairDepth),
                material: new THREE.MeshStandardMaterial({ color: 0x888888 }),
                position: { x: 21, y: -0.5 - (i * 0.5), z: 12.2 }
            });
        }
        
        // Handrails for the stairs
        stairs.push({
            name: 'stairHandrail1',
            geometry: new THREE.CylinderGeometry(0.1, 0.1, 4),
            material: new THREE.MeshStandardMaterial({ color: 0x888888 }),
            position: { x: 20, y: -1, z: 12.2 }
        });

        
        stairs.push({
            name: 'stairHandrail2',
            geometry: new THREE.CylinderGeometry(0.1, 0.1, 4),
            material: new THREE.MeshStandardMaterial({ color: 0x888888 }),
            position: { x: 22, y: -1, z: 12.2 }
        });

        
        return stairs;
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
        
        // Add subtle water animation
        if (this.objects['water']) {
            const waterMesh = this.objects['water'];
            const time = Date.now() * 0.005;
            waterMesh.position.y = Math.sin(time) * 0.03;
        }
        
        this.handleKeyboardMovement(); // Process keyboard input each frame
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.updateDebugInfo();
    }
}

// Initialize and run
const sceneManager = new SceneManager();
sceneManager.animate();
