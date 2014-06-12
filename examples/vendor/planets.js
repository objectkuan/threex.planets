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
