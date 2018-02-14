
document.addEventListener("DOMContentLoaded",function(){
  init();
});

var canvas = document.createElement("canvas");
var duration = document.getElementById("duration");
var dur = 0;
var interval;

// set elements
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 300;
canvas.style.top = 0;
document.body.appendChild(canvas);

var circle = document.getElementById("circle");

var posX = 1,
    posY = 150,
    radius = 6,
    bool = true;


function init(){
  var audio = new Audio();
  audio.src = 'sound2.wav';
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = true;

  audio.addEventListener('loadedmetadata', function() {
    setInterval( function() {
      dur += 1/audio.duration; // 1/2secondesa
      duration.style.width = dur+"%";
      if (dur >= 99.8) {
        dur = 0;
      }
    }, 10);
  });

  contextAudio = new AudioContext(); // AudioContext object instance
	analyser = contextAudio.createAnalyser(); // AnalyserNode method
  source = contextAudio.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(contextAudio.destination);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  radius = fbc_array[400]/2;

  draw(posX,posY,radius);

  if (posX >= canvas.width){
    bool = false;
  }else if (posX == 0){
    bool = true;
  }

  switch (bool) {
    case true:
        posX += 1;
      break;
    case false:
        posX -= 1;
      break;
    default:
  }

  //three.js
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  var ratio = fbc_array[512]/100
  starField.rotation.y += 0.001

  if (camera.position.z < 150) {
    camera.position.z += 0.2
  } else {
    camera.position.z += 0.05
  }

  camera.position.y += ratio
  camera.position.y -= ratio

  if(fbc_array[512] > 90){
    plane.material.color.set("rgb(255,0,255)");
    setTimeout(function(){
      plane.material.color.set("rgb(126,0,126)");
    },100);
  }
  if(fbc_array[0] > 230){
    document.body.style.backgroundColor = "rgb(255,255,255)";
    scene.background = new THREE.Color(0xffffff);
    starsMaterial.color.set("rgb(0,0,0)");
    setTimeout(function(){
      document.body.style.backgroundColor = "rgb(0,0,0)";
      scene.background = new THREE.Color(0x000000);
      starsMaterial.color.set("rgb(255,255,255)");

    },150);
  }

  renderer.render(scene, camera);
}

function draw(posX,posY,radius){
  // clear canvas
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height)
  context.closePath();
  context.fill();

  // draw rect
  context.beginPath();
  context.fillStyle= "transparent";
  context.arc(posX, posY, radius, 0, Math.PI*2, true);
  context.lineWidth = 8;
  context.strokeStyle = "rgb(255,0,255)";
  context.closePath();

  context.stroke();
  context.fill();


}
