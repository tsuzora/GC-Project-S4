import { objects} from './objects.mjs';
import { FJ_Model } from './BC_Model.mjs';

class SceneManager {
    constructor() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.textureLoader = new THREE.TextureLoader();
        this.sharedTexture = this.textureLoader.load('testImg.png');
        this.objects = {}; // Store objects for easy access
        this.groups = {}; // Store Group references

        this.debugElement = document.getElementById('debug');

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
        this.getGrid()
        // Camera position
        this.camera.position.set(-20, 15, 50);
        
        // Lights (INCREASED INTENSITY)
        this.addAmbientLight(0xffffff, 0.88); // Increased from 0.8
        this.addDirectionalLight(0xffffff, 0.2, { x: 0, y: 5, z: 5 }); // Increased from 0.2

        // Camera control
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: -1,
            RIGHT: -1
        }

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());

        // Initialize groups and objects
        this.initGroups(this.getGroups());

        this.createToggleButtons();
    }

    createToggleButtons() {
        const container = document.getElementById('objects'); // or another UI div
        if (!container) return;
    
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'modelToggleButtons';
        buttonContainer.innerHTML = `<strong>Model Visibility:</strong><br/>`;
        Object.keys(this.groups).forEach(groupName => {
            const button = document.createElement('button');
            button.textContent = `${groupName}`;
            
            button.addEventListener('click', () => {
                const group = this.groups[groupName];
                group.visible = !group.visible;
            });
    
            buttonContainer.appendChild(button);
        });
    
        container.appendChild(buttonContainer);
    }
    
    getGrid() {
        // XZ grid: usually used as the "ground" grid. We will move it along Y.
        const gridXZ = new THREE.GridHelper(100, 100, 0x0000ff, 0xf2bd86);
        gridXZ.position.set(0, 0, 0);
        this.scene.add(gridXZ);
        gridXZ.visible = false
      
        // XY grid - rotate to lie in the XY plane, adjust its Z position.
        const gridXY = new THREE.GridHelper(100, 100, 0xff0000, 0x779fc3);
        gridXY.rotation.x = Math.PI / 2;
        gridXY.position.set(0, 0, 0);
        this.scene.add(gridXY);
        gridXY.visible = false
      
        // YZ grid - rotate to lie in the YZ plane, adjust its X position.
        const gridYZ = new THREE.GridHelper(100, 100, 0x00ff00, 0xab77c3);
        gridYZ.rotation.z = Math.PI / 2;
        gridYZ.position.set(0, 0, 0);
        this.scene.add(gridYZ);
        gridYZ.visible = false
      
        // Attach event listeners to the buttons inside the debug menu to toggle visibility
        document.getElementById('toggleX').addEventListener('click', () => {
          gridXZ.visible = !gridXZ.visible;
        });
        document.getElementById('toggleY').addEventListener('click', () => {
          gridXY.visible = !gridXY.visible;
        });
        document.getElementById('toggleZ').addEventListener('click', () => {
          gridYZ.visible = !gridYZ.visible;
        });
      
        // ---- Right-click Dragging to Adjust Grid Positions ----
      
        // Disable the default right-click context menu on the canvas
        this.renderer.domElement.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
      
        // Variables to track dragging state
        let isRightDragging = false;
        let startX = 0;
        let startY = 0;
        const sensitivity = 0.1; // Adjust sensitivity as needed
      
        // Start dragging on right mouse button down
        this.renderer.domElement.addEventListener('mousedown', (e) => {
          if (e.button === 2) { // Right mouse button
            isRightDragging = true;
            startX = e.clientX;
            startY = e.clientY;
          }
        });
      
        // End dragging on right mouse button up
        this.renderer.domElement.addEventListener('mouseup', (e) => {
          if (e.button === 2) {
            isRightDragging = false;
          }
        });
      
        // On mouse move, if right dragging, update grid positions
        this.renderer.domElement.addEventListener('mousemove', (e) => {
          if (!isRightDragging) return;
      
          const deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;
      
          // For example:
          // - Horizontal dragging adjusts the YZ grid's X position.
          gridYZ.position.x += deltaX * sensitivity;
          // - Vertical dragging adjusts the XZ grid's Y position.
          gridXZ.position.y -= deltaY * sensitivity;
          // - Also adjust the XY grid's Z position based on vertical dragging.
          gridXY.position.z += deltaY * sensitivity;
      
          // Update starting coordinates for next move event
          startX = e.clientX;
          startY = e.clientY;
        });
      }
    // Define groups and objects
    // Add Objects / groups here
    getGroups() {
        return [objects, FJ_Model]
    }

    // Initialize Groups
    initGroups(groups) {
        const data = fetch('./test.json')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .catch(error => console.error('Failed to fetch data:', error));
        console.log(data)
        
        groups.forEach(model => {
            for (const groupName in model) {
                const groupData = model[groupName];
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
        })
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
        // mesh.updateMatrixWorld();
        // const posAttr = geometry.attributes.position;
        // const uvArray = [];
        // const scale = 1; // Adjust this factor to match your texture's scale
        // for (let i = 0; i < posAttr.count; i++) {
        //     const vertex = new THREE.Vector3().fromBufferAttribute(posAttr, i);
        //     // Convert vertex from local to world coordinates:
        //     vertex.applyMatrix4(mesh.matrixWorld);
        //     // Compute UV from the world x and z (for example):
        //     const u = vertex.x * scale;
        //     const v = vertex.y * scale;

        //     uvArray.push(u, v);
        // }
        // geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
        // geometry.attributes.uv.needsUpdate = true;

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
        this.controls.target.set(0, 2, 0);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.updateDebugInfo();
        console.log(this.camera.position)
    }
}

// Initialize and run
const sceneManager = new SceneManager();
sceneManager.animate();
