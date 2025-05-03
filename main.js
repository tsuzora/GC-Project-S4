let scene, camera, renderer, controls, colliders = [];
let walk={f:false,b:false,l:false,r:false}, vel=new THREE.Vector3(), dir=new THREE.Vector3();
let isTopDown=false, spinMode=false;
const prev={pos:new THREE.Vector3(),rot:new THREE.Euler()};
let hemiLight, dirLight, modelScene;
let spinCenter=new THREE.Vector3(), spinRadius=0, spinAngle=0;
const raycaster = new THREE.Raycaster();

const topDownPresets = [
{ name:'Pool',   target:{x:220,y:0,z:-40}, offsetRanges:{x:{min:-30,max:30}, y:{min:20,max:50}, z:{min:-30,max:30}} },
{ name:'Gym',    target:{x:190,y:0,z:-30}, offsetRanges:{x:{min:-30,max:40}, y:{min:20,max:50}, z:{min:-30,max:40}} },
{ name:'Lapbas', target:{x:140,y:0,z:-35}, offsetRanges:{x:{min:-30,max:30}, y:{min:20,max:50}, z:{min:-30,max:30}} },
{ name:'FJ', target:{x:70,y:0,z:-35}, offsetRanges:{x:{min:-50,max:50}, y:{min:20,max:30}, z:{min:-50,max:50}} }
];

init();
animate();

function init(){
scene = new THREE.Scene();
scene.background = new THREE.Color(0x494949);
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Model with collision detection
new THREE.GLTFLoader().load('Models/FJ_(3).gltf',
  gltf => {
    modelScene = gltf.scene;
    scene.add(modelScene);
    
    // Collect all meshes for collision detection
    modelScene.traverse(child => {
      if (child.isMesh) {
        colliders.push(child);
      }
    });
  },
  undefined,
  err => console.error(err)
);

// Lights
hemiLight = new THREE.HemisphereLight(0xffffff,0x444444,parseFloat(hemiIntensity.value));
hemiLight.position.set(0,50,0); scene.add(hemiLight);

dirLight = new THREE.DirectionalLight(dirColor.value,parseFloat(dirIntensity.value));
dirLight.position.set(
  parseFloat(dirPosX.value),
  parseFloat(dirPosY.value),
  parseFloat(dirPosZ.value)
);
scene.add(dirLight);

// Controls
controls = new THREE.PointerLockControls(camera, document.body);
document.addEventListener('click', ()=>{ if(!isTopDown && !spinMode) controls.lock(); });
scene.add(controls.getObject());

// UI buttons
const tvc = document.getElementById('topViewControls');
topDownPresets.forEach((p,i) => {
  const btn = document.createElement('button');
  btn.textContent = `${i+1}. ${p.name}`;
  btn.onclick = ()=> goTopDown(p);
  tvc.appendChild(btn);
});
document.getElementById('showAllSpinBtn')
        .addEventListener('click', goShowAllSpin);
document.getElementById('restoreBtn')
        .addEventListener('click', restoreView);

// Light inputs
hemiIntensity .addEventListener('input', e=> hemiLight.intensity = parseFloat(e.target.value));
dirIntensity  .addEventListener('input', e=> dirLight.intensity = parseFloat(e.target.value));
dirPosX       .addEventListener('input', e=> dirLight.position.x = parseFloat(e.target.value));
dirPosY       .addEventListener('input', e=> dirLight.position.y = parseFloat(e.target.value));
dirPosZ       .addEventListener('input', e=> dirLight.position.z = parseFloat(e.target.value));
dirColor      .addEventListener('input', e=> dirLight.color.set(e.target.value));

document.addEventListener('keydown', onKeys);
document.addEventListener('keyup',   onKeyUp);
window.addEventListener('resize',   onWindowResize);

camera.position.set(100,1.8,-25);
}

function goTopDown(p){
if(!(isTopDown||spinMode)) {
    prev.pos.copy(controls.getObject().position);
    prev.rot.copy(camera.rotation);
    isTopDown=true;
    document.querySelectorAll('#topViewControls button').forEach(b=>b.disabled=false);
    showAllSpinBtn.disabled = false;
    restoreBtn.disabled = false;
}

const {target, offsetRanges: r} = p;
const rx = THREE.MathUtils.randFloat(r.x.min, r.x.max),
      ry = THREE.MathUtils.randFloat(r.y.min, r.y.max),
      rz = THREE.MathUtils.randFloat(r.z.min, r.z.max);

controls.unlock();
controls.getObject().position.set(target.x+rx, target.y+ry, target.z+rz);
camera.lookAt(target.x, target.y, target.z);
}

function goShowAllSpin(){
if(!modelScene || spinMode) return;
prev.pos.copy(controls.getObject().position);
prev.rot.copy(camera.rotation);
spinMode = true;
isTopDown = false;
document.querySelectorAll('#topViewControls button').forEach(b=>b.disabled=true);
showAllSpinBtn.disabled = true;
restoreBtn.disabled = false;

const box = new THREE.Box3().setFromObject(modelScene);
const sph = new THREE.Sphere();
box.getBoundingSphere(sph);
spinCenter.copy(sph.center);
spinRadius = sph.radius * 0.8;
spinAngle = 0;
}

function restoreView(){
if(!(isTopDown||spinMode)) return;
controls.getObject().position.copy(prev.pos);
camera.rotation.copy(prev.rot);
isTopDown = spinMode = false;
document.querySelectorAll('#topViewControls button').forEach(b=>b.disabled=false);
showAllSpinBtn.disabled = false;
restoreBtn.disabled = true;
}

function checkCollision(direction, velocity) {
// Update camera's world matrix
camera.updateMatrixWorld();

// Calculate ray direction based on movement
const rayDirection = direction.clone().normalize();
const rayLength = Math.abs(velocity);

// Set up raycaster
raycaster.set(camera.position, rayDirection);
raycaster.far = rayLength + 0.5; // Add small offset

// Check for intersections
const intersects = raycaster.intersectObjects(colliders);
return intersects.length > 0;
}

function onKeys(e){
if(e.code==='Digit1') goTopDown(topDownPresets[0]);
if(e.code==='Digit2') goTopDown(topDownPresets[1]);
if(e.code==='Digit3') goTopDown(topDownPresets[2]);
if(e.code==='Digit4') goShowAllSpin();
if(e.code==='KeyR')   restoreView();

if(isTopDown||spinMode) return;
if(e.code==='KeyW') walk.f=true;
if(e.code==='KeyS') walk.b=true;
if(e.code==='KeyA') walk.l=true;
if(e.code==='KeyD') walk.r=true;
}
function onKeyUp(e){
if(isTopDown||spinMode) return;
if(e.code==='KeyW') walk.f=false;
if(e.code==='KeyS') walk.b=false;
if(e.code==='KeyA') walk.l=false;
if(e.code==='KeyD') walk.r=false;
}

function onWindowResize(){
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
}

function animate(){
requestAnimationFrame(animate);

if(spinMode){
  spinAngle += 0.003;
  const x = spinCenter.x + spinRadius * Math.cos(spinAngle);
  const z = spinCenter.z + spinRadius * Math.sin(spinAngle);
  const y = spinCenter.y + spinRadius;
  controls.unlock();
  camera.position.set(x,y,z);
  camera.lookAt(spinCenter);
}
else if(!isTopDown){
    const speed=0.3;
    dir.z = Number(walk.f)-Number(walk.b);
    dir.x = Number(walk.r)-Number(walk.l);
    dir.normalize();
    
    // Calculate movement vectors
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    // Apply collision detection
    if(walk.f && !checkCollision(forward, speed)) vel.z -= speed;
    if(walk.b && !checkCollision(forward.clone().negate(), speed)) vel.z += speed;
    if(walk.l && !checkCollision(right.clone().negate(), speed)) vel.x += speed;
    if(walk.r && !checkCollision(right, speed)) vel.x -= speed;

    controls.moveRight(-vel.x);
    controls.moveForward(-vel.z);
    vel.x *= 0.5; 
    vel.z *= 0.5;
  }

  renderer.render(scene,camera);
}