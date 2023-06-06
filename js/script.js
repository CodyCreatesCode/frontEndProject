// Get references to the zoom buttons
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");
const currentDateButton = document.getElementById("currentDateButton");
const currentMonthButton = document.getElementById("currentMonthButton");
const currentYearButton = document.getElementById("currentYearButton");
const allWildfiresButton = document.getElementById("allWildfiresButton");

let modeCheckbox = document.getElementById("modeCheckbox");
let texturePath = "images/3dTextureEarth.jpeg"; // Default texture path

const wildfireMarkers = [];

// Initialize Three.js variables
let scene, camera, renderer, globeMesh, cloudMesh, wildfireGroup;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

init();

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("globeContainer").appendChild(renderer.domElement);

  // Load the space background texture
  const spaceTexture = new THREE.TextureLoader().load(
    "../images/spaceTexture.jpeg"
  );

  // Create a sphere geometry for the skybox
  const skyGeometry = new THREE.SphereBufferGeometry(10, 64, 64);

  // Create a material for the skybox using the space texture
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: spaceTexture,
    side: THREE.BackSide, // Render the material on the inside of the sphere
  });

  // Create a mesh with the sky geometry and material
  const skybox = new THREE.Mesh(skyGeometry, skyMaterial);

  // Add the skybox to the scene
  scene.add(skybox);

  // Create a parent object for the globe and the wildfire group
  const parent = new THREE.Object3D();
  scene.add(parent);

  // Create a globe mesh
  const geometry = new THREE.SphereBufferGeometry(2, 128, 128);
  const texture = new THREE.TextureLoader().load(texturePath); // Replace with the actual path to the globe texture image
  const material = new THREE.MeshBasicMaterial({ map: texture });
  globeMesh = new THREE.Mesh(geometry, material);
  parent.add(globeMesh); // Add the globe to the parent object

  // Create a cloud mesh
  const cloudGeometry = new THREE.SphereBufferGeometry(2.07, 128, 128);
  const cloudTexture = new THREE.TextureLoader().load(
    "images/3dcloudsTexture.jpeg"
  );
  const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.4,
  });
  cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
  parent.add(cloudMesh);

  // Set the initial rotation of the globe
  globeMesh.rotation.x = Math.PI / 4.5; // Rotate around the x-axis
  globeMesh.rotation.y = Math.PI / 12; // Rotate around the y-axis
  globeMesh.rotation.z = Math.PI / 18; // Rotate around the z-axis

  // Create a group for wildfires
  wildfireGroup = new THREE.Group();
  globeMesh.add(wildfireGroup); // Add the wildfire group as a child of the globe

  // Fetch wildfire data from EONET API
  fetch(
    "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category=wildfires"
  )
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the wildfire events
      data.events.forEach((event) => {
        console.log(event);
        const lat = event.geometry[0].coordinates[1];
        const lon = event.geometry[0].coordinates[0];

        // Convert latitude and longitude to radians
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        // Set the radius of the globe
        const globeRadius = 2;

        // Convert spherical coordinates to Cartesian coordinates
        const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
        const y = globeRadius * Math.cos(phi);
        const z = globeRadius * Math.sin(phi) * Math.sin(theta);

        // Create a wildfire marker
        const markerGeometry = new THREE.SphereBufferGeometry(0.005);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        // Position the marker
        marker.position.set(x, y, z);

        // Add the marker to the wildfire group for current year
        currentDateButton.addEventListener("click", (e) => {
          wildfireGroup.remove(marker);
          if (event.geometry[0].date.includes("2023"))
            wildfireGroup.add(marker);
          wildfireMarkers.push(marker);
        });

        // Add the marker to the wildfire group
        currentMonthButton.addEventListener("click", (e) => {
          wildfireGroup.remove(marker);
          if (event.geometry[0].date.includes("2023"))
            wildfireGroup.add(marker);
          wildfireMarkers.push(marker);
        });

        // Add the marker to the wildfire group
        currentYearButton.addEventListener("click", (e) => {
          wildfireGroup.remove(marker);
          if (event.geometry[0].date.includes("2023"))
            wildfireGroup.add(marker);
          wildfireMarkers.push(marker);
        });

        // Add the marker to the wildfire group for all wildfires
        allWildfiresButton.addEventListener("click", (e) => {
          wildfireGroup.remove(marker);
          if (event) wildfireMarkers.push(marker);
          wildfireGroup.add(marker);
        });
      });
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });

  // Add event listeners for mouse/touch events
  renderer.domElement.addEventListener("mousedown", onMouseDown);
  renderer.domElement.addEventListener("touchstart", onTouchStart);
  renderer.domElement.addEventListener("mousemove", onMouseMove);
  renderer.domElement.addEventListener("touchmove", onTouchMove);
  renderer.domElement.addEventListener("mouseup", onMouseUp);
  renderer.domElement.addEventListener("touchend", onTouchEnd);

  // Add event listener for window resize
  window.addEventListener("resize", onWindowResize);

  // Render the scene
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cloud mesh along with the globe
  cloudMesh.rotation.copy(globeMesh.rotation);

  // Render the scene with the camera
  renderer.render(scene, camera);
}

function onMouseDown(event) {
  event.preventDefault();
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function onTouchStart(event) {
  event.preventDefault();
  isDragging = true;
  previousMousePosition = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  };
}

function onMouseMove(event) {
  event.preventDefault();
  if (!isDragging) return;

  const deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y,
  };

  const rotationQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      toRadians(deltaMove.y * 1),
      toRadians(deltaMove.x * 1),
      0,
      "XYZ"
    )
  );

  globeMesh.quaternion.multiplyQuaternions(
    rotationQuaternion,
    globeMesh.quaternion
  );

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function onTouchMove(event) {
  event.preventDefault();
  if (!isDragging) return;

  const deltaMove = {
    x: event.touches[0].clientX - previousMousePosition.x,
    y: event.touches[0].clientY - previousMousePosition.y,
  };

  const rotationQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      toRadians(deltaMove.y * 1),
      toRadians(deltaMove.x * 1),
      0,
      "XYZ"
    )
  );

  globeMesh.quaternion.multiplyQuaternions(
    rotationQuaternion,
    globeMesh.quaternion
  );

  previousMousePosition = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  };
}

function onMouseUp(event) {
  event.preventDefault();
  isDragging = false;
}

function onTouchEnd(event) {
  event.preventDefault();
  isDragging = false;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Add event listeners to the zoom buttons
zoomInButton.addEventListener("click", zoomIn);
zoomOutButton.addEventListener("click", zoomOut);

// Function to zoom in
function zoomIn() {
  camera.position.z -= 0.1; // Adjust the zoom level as desired
}

// Function to zoom out
function zoomOut() {
  camera.position.z += 0.1; // Adjust the zoom level as desired
}

// Function to toggle light/dark mode
function toggleMode() {
  if (modeCheckbox.checked) {
    document.body.classList.add("bg-dark");
    document.body.classList.remove("bg-light");
    texturePath = "images/3dearthTextureDark.jpeg"; // Path to dark mode texture
  } else {
    document.body.classList.add("bg-light");
    document.body.classList.remove("bg-dark");
    texturePath = "images/3dearthTexture.jpeg"; // Path to light mode texture
  }

  // Update the globe texture
  const newTexture = new THREE.TextureLoader().load(texturePath);
  globeMesh.material.map = newTexture;
  globeMesh.material.needsUpdate = true;
}

// Event listener for mode toggle checkbox
modeCheckbox.addEventListener("change", toggleMode);
