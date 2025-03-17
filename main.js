import { groupName } from "./Objects.js";

class SceneManager {
    constructor() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.objects = {}; // Store objects for easy access
        this.groups = {}; // Store Group references

        // Initialize
        this.init();
    }

    init() {
        // Renderer settings
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xefffef);
        document.body.appendChild(this.renderer.domElement);

        // Camera position
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        // Lights
        this.addAmbientLight(0xffffff, 0.8);
        this.addDirectionalLight(0xffffff, 0.2, { x: 0, y: 5, z: 5 });

        //Camera control
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
    }

    initGroups() {
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
        
        if(parentGroup) {
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
        
        if(parent && this.groups[parent]) {
            this.groups[parent].add(mesh);
        } else {
            this.scene.add(mesh);
        }
        
        this.objects[name] = mesh;
        return mesh;
    }

    getGroup(name) {
        return this.groups[name];
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
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize and run
const sceneManager = new SceneManager();
sceneManager.addGroup('FJ');
sceneManager.addGroup('Group', 'FJ');

const Group1 = [
    {
        name: 'cube',
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshStandardMaterial({ color: 0xff0000 }),
        pos: { x: 0, y: 0, z: 0 }
    },
    {
        name: 'sphere',
        geometry: new THREE.SphereGeometry(0.5, 32, 32),
        material: new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
        pos: { x: 2, y: 0, z: 0 }
    }
]

Group1.forEach(obj => {
    sceneManager.addObject(obj.name, obj.geometry, obj.material, obj.pos, 'Group');
});

const mainGroup = sceneManager.getGroup('FJ');
mainGroup.position.set(0,1,0);
// Example: Rotate the cube
sceneManager.animate();