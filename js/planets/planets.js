/**
 * Planet Objects Generator 
 */
function getSun() {
	var mesh	= THREEx.Planets.createSun()
	return mesh
}

function getMercury() {
	var mesh	= THREEx.Planets.createMercury()
	return mesh
}

function getVenus() {
	var mesh	= THREEx.Planets.createVenus()
	return mesh
}

function getMoon() {
	var mesh	= THREEx.Planets.createMoon()
	return mesh
}

function getEarch() {
	var mesh	= THREEx.Planets.createEarth()
	var cloud	= THREEx.Planets.createEarthCloud()
	mesh.add(cloud)
	return mesh
}

function getMoon() {
	var mesh	= THREEx.Planets.createMoon()
	return mesh
}

function getMars() {
	var mesh	= THREEx.Planets.createMars()
	return mesh
}

function getJupiter() {
	var mesh	= THREEx.Planets.createJupiter()
	return mesh
}

function getSaturn() {
	var mesh	= THREEx.Planets.createSaturn()
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	var ring	= THREEx.Planets.createSaturnRing()
	ring.receiveShadow	= true
	ring.castShadow		= true
	mesh.add(ring)
	return mesh
}

function getUranus() {
	var mesh	= THREEx.Planets.createUranus()
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	var ring	= THREEx.Planets.createUranusRing()
	ring.receiveShadow	= true
	ring.castShadow		= true
	mesh.add(ring)
	return mesh
}

function getNeptune() {
	var mesh	= THREEx.Planets.createNeptune()
	return mesh
}

function getPluto() {
	var mesh	= THREEx.Planets.createPluto()
	return mesh
}






/**
 * Interative Logic
 */
var renderer	= new THREE.WebGLRenderer({
	antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled	= true

var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000 );
camera.position.z = 5;

var light	= new THREE.AmbientLight( 0x888888 )
scene.add( light )

var light	= new THREE.DirectionalLight( 0xcccccc, 1 )
light.position.set(5,5,5)
scene.add( light )
light.castShadow	= true
light.shadowCameraNear	= 0.01
light.shadowCameraFar	= 15
light.shadowCameraFov	= 45

light.shadowCameraLeft	= -1
light.shadowCameraRight	=  1
light.shadowCameraTop	=  1
light.shadowCameraBottom= -1
// light.shadowCameraVisible	= true	

light.shadowBias	= 0.001
light.shadowDarkness	= 0.2

light.shadowMapWidth	= 1024*2
light.shadowMapHeight	= 1024*2

/* Add starfield */
var starSphere	= THREEx.Planets.createStarfield()
scene.add(starSphere)

/* Added planets */
var meshes = new Array(
	getSun(),		getMercury(),	getVenus(),		getMoon(),
	getEarch(),		getMoon(),		getMars(),		getJupiter(),
	getSaturn(),	getUranus(),	getNeptune(),	getPluto()
);
for(var i = 0; i < meshes.length; i++) {
	meshes[i].position.z = -20
	scene.add(meshes[i])
}

/* Planets Controls */
var x = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var y = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var r = Array(0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
var theta = Array(0, 1, 0, -3, 0, -2, 0, -1.3, 0, -3.2, 0, -1.2);
var w = Array(0.001, 0.012, 0.003, 0.004, 0.011, 0.007, 0.005, 0.008, 0.006, 0.002, 0.010, 0.009);
function updatePlanets() {
	for(var i = 0; i < meshes.length; i++) {
		var mesh = meshes[i]
		mesh.position.x = (r[i]) * 3 * Math.cos(theta[i]);
		mesh.position.y = (r[i]) * 3 * Math.sin(theta[i]);
		mesh.position.z = -20;
		theta[i] += w[i];
	}
}

/* Camera Controls */
var mousey = 0;
var mousex = 0;
function updateCamera(delta, now){
	camera.position.y += (mousey * 5 - camera.position.y) * (delta * 3)
	camera.position.x += (mousex * 5 - camera.position.x) * (delta * 3)
	camera.lookAt( scene.position )
}

/* loop runner */
var lastTimeMsec = null
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	updatePlanets();
	updateCamera(deltaMsec/1000, nowMsec/1000);
	renderer.render( scene, camera );
})

function startPlanets() {
	document.body.appendChild( renderer.domElement );
}
