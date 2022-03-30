import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( {color: 0x00ADB5 } );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add( lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 20, 20);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Space Background
//const spaceTexture = new THREE.TextureLoader().load('./img/space.jpg');
// scene.background = spaceTexture;

// Background video
const videoBg = document.getElementById( 'video' );
const videoTextureBackground = new THREE.VideoTexture(videoBg);
scene.background = videoTextureBackground;




// Avatar
const colinTexture = new THREE.TextureLoader().load('./img/colin.jpg');
const colin = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial( {map: colinTexture })
);

scene.add(colin);

// React

const reactTexture = new THREE.TextureLoader().load('./img/React.png');
const reactLogo = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial( {
        map: reactTexture,
        side: THREE.DoubleSide
    })
);

scene.add(reactLogo);




// Moon
const moonTexture = new THREE.TextureLoader().load('./img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./img/normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture,
    })
);

scene.add(moon);


// Video 
// const video = document.getElementById('video');
// video.play();
// const videoTexture = new THREE.VideoTexture(video);
// const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );

// const videoBox = new THREE.PlaneGeometry(1, 1);
// const videoScreen = new THREE.Mesh(videoBox, videoMaterial);
// scene.add(videoScreen);






moon.position.z = 30;
moon.position.setX(-10);

colin.position.z = -5;
colin.position.x = 2;

reactLogo.position.z = 20;
reactLogo.position.x = 0;


function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    colin.rotation.y += 0.01;
    colin.rotation.z += 0.01;

    reactLogo.rotation.y += 0.01;
    reactLogo.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();



function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    reactLogo.rotation.y += 0.01;
    reactLogo.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();