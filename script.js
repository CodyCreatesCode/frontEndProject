const wildfireBtn = document.getElementById("wildfireBtn");
const volcanoesBtn = document.getElementById("volcanoesBtn");
let map;
let markers = [];

fetch("https://eonet.gsfc.nasa.gov/api/v3/events")
  .then((response) => {
    return response.json(); // << need to return
  })
  .then((data) => {
    const allEvents = data.events;
    console.log(allEvents);

    wildfireBtn.addEventListener("click", (e) => {
      deleteMarkers()
      allEvents.forEach((events) => {
        // loops through each event that has an id of "wildfires"
        if (events.categories[0].id == "wildfires") {
          const lat = events.geometry[0].coordinates[1];
          const long = events.geometry[0].coordinates[0];

          markMap(lat, long);
        }
      });
    });

    volcanoesBtn.addEventListener("click", (e) => {
      deleteMarkers()
      allEvents.forEach((events) => {
        // loops through each event that has an id of "wildfires"
        if (events.categories[0].id == "volcanoes") {
          const lat = events.geometry[0].coordinates[1];
          const long = events.geometry[0].coordinates[0];

          markMap(lat, long);
        }
      });
    });
  });

async function markMap(latitude, longitude) {
  // The location of markers
  const position = { lat: latitude, lng: longitude };
  // Request needed libraries.
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const wildfireImg = document.createElement("img");
  wildfireImg.src = "images/wildfire.svg";

  // The marker using the position variable for location on map
  const wildfireMarker = new AdvancedMarkerElement({
    map: map,
    position: position,
    content: wildfireImg,
    title: "Wildfire",
  });
  markers.push(wildfireMarker)
}

//Initalize map to render when window loaded
async function initMap(latitude, longitude) {
  // The location of center of US
  const position = { lat: latitude, lng: longitude };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  //   The map, centered at US
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
}

initMap(37.0902, -95.7129);


// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}