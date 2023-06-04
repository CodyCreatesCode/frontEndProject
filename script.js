const todayBtn = document.getElementById("todayBtn");
const yesterdayBtn = document.getElementById("yesterdayBtn");
const monthBtn = document.getElementById("monthBtn");
const yearBtn = document.getElementById("yearBtn");
const everyYearBtn = document.getElementById("everyYearBtn");
let map;
let markers = [];

fetch("https://eonet.gsfc.nasa.gov/api/v3/events")
  .then((response) => {
    return response.json(); // << need to return
  })
  .then((data) => {
    console.log(data);
    const allEvents = data.events;
    console.log(allEvents);
    const date = new Date();
    let currentDay = ("0" + date.getDate()).slice(-2);
    let currentMonth = ("0" + (date.getMonth() + 0)).slice(-2);
    let currentYear = date.getFullYear();
  
    const fullDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const fullMonth = `${currentYear}-${currentMonth}`;


    todayBtn.addEventListener("click", (e) => {
      deleteMarkers()
      allEvents.forEach((events) => {
        // loops through each event that has an id of "wildfires"
        if (events.categories[0].id == "wildfires" && events.geometry[0].date.includes(fullDate)) {
          const lat = events.geometry[0].coordinates[1];
          const long = events.geometry[0].coordinates[0];

          markMap(lat, long);
        }
      });
    });

    yearBtn.addEventListener("click", (e) => {
      deleteMarkers()
      allEvents.forEach((events) => {
        // loops through each event that has an id of "wildfires"
        if (events.categories[0].id == "wildfires" && events.geometry[0].date.includes(currentYear)) {
          const lat = events.geometry[0].coordinates[1];
          const long = events.geometry[0].coordinates[0];

          markMap(lat, long);
        }
      });
    });

    monthBtn.addEventListener("click", (e) => {
      deleteMarkers()
      allEvents.forEach((events) => {
        // loops through each event that has an id of "wildfires"
        if (events.categories[0].id == "wildfires" &&  events.geometry[0].date.includes(fullMonth) ) {
          const lat = events.geometry[0].coordinates[1];
          const long = events.geometry[0].coordinates[0];

          markMap(lat, long);
        }
      });
    });

    everyYearBtn.addEventListener("click", (e) => {
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
  const contentString = {}
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Label!",
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