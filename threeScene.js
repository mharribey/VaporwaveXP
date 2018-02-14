var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight-300);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

var controls = new THREE.OrbitControls(camera);

// ground
var geometry = new THREE.PlaneGeometry(10000, 10000000, 300, 300);
var material = new THREE.MeshBasicMaterial( {color: "rgb(126,0,126)", side: THREE.DoubleSide, wireframe: true} );
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;

camera.position.set(0,30,0);
controls.update();

// stars
var starsGeometry = new THREE.Geometry();

for ( var i = 0; i < 10000; i ++ ) {
	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread(1000);
	star.y = THREE.Math.randFloatSpread(1000);
	star.z = THREE.Math.randFloatSpread(1000);
  star.size = 100

	starsGeometry.vertices.push(star);
}

var starsMaterial = new THREE.PointsMaterial( { color: "rgb(255,255,255)" } );
var starField = new THREE.Points( starsGeometry, starsMaterial );

scene.add(starField);
scene.add(plane);
