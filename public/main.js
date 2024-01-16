var defaultSelector = document.getElementById("defaultSelector");
defaultSelector.style.display = "block";
var QlayerSelect = document.getElementById("QlayerSelect");
QlayerSelect.style.display = "none";
var LlayerSelect = document.getElementById("LlayerSelect");
LlayerSelect.style.display = "none";
var BiblioteklayerSelect = document.getElementById("BiblioteklayerSelect");
BiblioteklayerSelect.style.display = "none";
// var showLayerButton = document.getElementById('showLayerButton');
var selectors = [LlayerSelect, QlayerSelect, BiblioteklayerSelect,defaultSelector];

var vectorLayerGroup = new ol.layer.Group({});

// create base map layer
var googleLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attributions: "© Google Maps",
  }),
});

// create map container and load base map
var map = new ol.Map({
  target: "map",
  layers: [googleLayer], // add google map
  view: new ol.View({
    center: ol.proj.fromLonLat([18.0716173, 59.3489465]), // set center
    zoom: 16,
  }),
});

//add base floor
var baseLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: "/base.geojson",
    format: new ol.format.GeoJSON(),
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgb(0,71,145)",
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "rgb(242,242,242)",
    }),
  }),
});
map.addLayer(baseLayer);

// create a container for floors layers
var mapLayers = {};
// load geoJson
var LgeoJSONFiles = [
  { name: "L-building Floor 2", file: "/Lbuilding/2.geojson" },
  { name: "L-building Floor 3", file: "/Lbuilding/3.geojson" },
  { name: "L-building Floor 4½", file: "/Lbuilding/45.geojson" },
  { name: "L-building Floor 5½", file: "/Lbuilding/55.geojson" },
];

// load geoJsons to mapLayers
LgeoJSONFiles.forEach(function (item) {
  var source = new ol.source.Vector({
    url: item.file,
    format: new ol.format.GeoJSON(),
  });

  var layer = new ol.layer.Vector({
    source: source,
    title: item.name,
    visible: false,
    style: function (feature) {
      var namn = feature.get("namn");
      var matchingEvent = currentEvents.find(function (event) {
        return event.room === namn;
      });
      var typ = feature.get("typ");
      var color;
      var eventInfo;
      //Set text content, free or course ongoing
      if (matchingEvent) {
        //If course is ongoing
        eventInfo =
          matchingEvent.room +
          "\n" +
          typ +
          "\n" +
          matchingEvent.code +
          "\n " +
          matchingEvent.event +
          "\n " +
          matchingEvent.teacher;
      } else {
        //If room is free
        if (typ != "corridor") {
          var eventInfo = namn + "\n " + typ + "\n" + "Free";
        }
      }
      //Set feature style
      if (typ === "corridor") {
        color = "white"; // set corridor color
      } else {
        color = "rgb(224,254,254)"; // set rooms color
      }
      return new ol.style.Style({
        text: new ol.style.Text({
          text: eventInfo,
          fill: new ol.style.Fill({ color: "black" }),
          font: "bold 18px Calibri,sans-serif",
          stroke: new ol.style.Stroke({
            color: "white",
            width: 2,
          }),
          scale: Math.pow(map.getView().getZoom().toString() / 20, 14),
          // padding: [3, 3, 3, 3],
          rotation: Math.PI / 3.2,
          overflow: true,
        }),
        fill: new ol.style.Fill({
          color: color,
        }),
        stroke: new ol.style.Stroke({
          color: "rgb(193,239,254)",
          width: 1,
        }),
      });
    },
  });
  mapLayers[item.name] = layer;
  map.addLayer(layer);
  vectorLayerGroup.getLayers().push(layer);
});

var QgeoJSONFiles = [
  { name: "Q-building Floor 1", file: "/Qbuilding//1.geojson" },
  { name: "Q-building Floor 2", file: "/Qbuilding//2.geojson" },
  { name: "Q-building Floor 3", file: "/Qbuilding//3.geojson" },
];

QgeoJSONFiles.forEach(function (item) {
  var source = new ol.source.Vector({
    url: item.file,
    format: new ol.format.GeoJSON(),
  });

  var layer = new ol.layer.Vector({
    source: source,
    title: item.name,
    visible: false,
    style: function (feature) {
      var namn = feature.get("namn");
      var matchingEvent = currentEvents.find(function (event) {
        return event.room === namn;
      });
      var typ = feature.get("typ");
      var color;
      var eventInfo;
      //Set text content, free or course ongoing
      if (matchingEvent) {
        //If course is ongoing
        eventInfo =
          matchingEvent.room +
          "\n" +
          typ +
          "\n" +
          matchingEvent.code +
          "\n " +
          matchingEvent.event +
          "\n " +
          matchingEvent.teacher;
      } else {
        //If room is free
        if (typ != "corridor") {
          var eventInfo = namn + "\n " + typ + "\n" + "Free";
        }
      }
      //Set feature style
      if (typ === "corridor") {
        color = "white"; // set corridor color
      } else {
        color = "rgb(224,254,254)"; // set rooms color
      }
      return new ol.style.Style({
        text: new ol.style.Text({
          text: eventInfo,
          fill: new ol.style.Fill({ color: "black" }),
          font: "bold 18px Calibri,sans-serif",
          stroke: new ol.style.Stroke({
            color: "white",
            width: 2,
          }),
          scale: Math.pow(map.getView().getZoom().toString() / 20, 14),
          // padding: [3, 3, 3, 3],
          rotation: Math.PI / 3.3 - Math.PI / 2,
          overflow: true,
        }),
        fill: new ol.style.Fill({
          color: color,
        }),
        stroke: new ol.style.Stroke({
          color: "rgb(193,239,254)",
          width: 1,
        }),
      });
    },
  });
  mapLayers[item.name] = layer;
  map.addLayer(layer);
  vectorLayerGroup.getLayers().push(layer);
});

var BibliotekgeoJSONFiles = [
  { name: "Bibliotek-building Floor 4", file: "/Bibliotekbuilding//4.geojson" },
];

BibliotekgeoJSONFiles.forEach(function (item) {
  var source = new ol.source.Vector({
    url: item.file,
    format: new ol.format.GeoJSON(),
  });

  var layer = new ol.layer.Vector({
    source: source,
    title: item.name,
    visible: false,
    style: function (feature) {
      var namn = feature.get("namn");
      var matchingEvent = currentEvents.find(function (event) {
        return event.room === namn;
      });
      var typ = feature.get("typ");
      var color;
      var eventInfo;
      //Set text content, free or course ongoing
      if (matchingEvent) {
        //If course is ongoing
        eventInfo =
          matchingEvent.room +
          "\n" +
          typ +
          "\n" +
          matchingEvent.code +
          "\n " +
          matchingEvent.event +
          "\n " +
          matchingEvent.teacher;
      } else {
        //If room is free
        if (typ != "corridor") {
          var eventInfo = namn + "\n " + typ + "\n" + "Free";
        }
      }
      //Set feature style
      if (typ === "corridor") {
        color = "white"; // set corridor color
      } else {
        color = "rgb(224,254,254)"; // set rooms color
      }
      return new ol.style.Style({
        text: new ol.style.Text({
          text: eventInfo,
          fill: new ol.style.Fill({ color: "black" }),
          font: "bold 18px Calibri,sans-serif",
          stroke: new ol.style.Stroke({
            color: "white",
            width: 2,
          }),
          scale: Math.pow(map.getView().getZoom().toString() / 20, 14),
          // padding: [3, 3, 3, 3],
          rotation: Math.PI / 6 - Math.PI / 2,
          overflow: true,
        }),
        fill: new ol.style.Fill({
          color: color,
        }),
        stroke: new ol.style.Stroke({
          color: "rgb(193,239,254)",
          width: 1,
        }),
      });
    },
  });
  mapLayers[item.name] = layer;
  map.addLayer(layer);
  vectorLayerGroup.getLayers().push(layer);
});

//floor selector functions
selectors.forEach(function (selector) {
  //Visualize floor when clicking
  selector.addEventListener("change", function () {
    var selectedLayerName = selector.value;
    for (var key in mapLayers) {
      // console.log(key);
      if (mapLayers.hasOwnProperty(key)) {
        if (key === selectedLayerName) {
          mapLayers[key].setVisible(true);
        } else {
          mapLayers[key].setVisible(false);
        }
      }
    }
  });

  var selectClick = new ol.interaction.Select({
    condition: ol.events.condition.click,
  });

  //switching selectors from buildings
  var index = selector.id.indexOf("layerSelect");
  var name = selector.id.substring(0, index);
  map.addInteraction(selectClick);
  selectClick.on("select", function (e) {
    if (e.selected.length > 0) {
      var selectedFeature = e.selected[0];
      var husetProperty = selectedFeature.get("huset");
      if (husetProperty === name) {
        //click the building to zoom to
        //load building center
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/cpoints.json", false);
        xhr.send();
        var cpoints = JSON.parse(xhr.responseText);
        for (const point of cpoints) {
          if (point.name === name&&map.getView().getZoom()<19.1) {
            map.getView().setCenter(point.cpoint);
            map.getView().setZoom(point.zoom);
            break;
          }
        }
        selector.style.display = "block";
      } else {
        selector.style.display = "none";
      }
      selectClick.getFeatures().clear();
    } else {
      selector.style.display = "none";
    }
  });
});

//time selection
var currentTime = new Date();
// load courses
var xhr = new XMLHttpRequest();
xhr.open("GET", "/data.json", false);
xhr.send();
var course = JSON.parse(xhr.responseText);
var currentEvents = getcurrentEvents(course, currentTime);

var sCourseT = document.getElementById("searchCourseT");
var sCourseB = document.getElementById("searchCourseB");
var sCourseP = document.getElementById("searchCourseP");

sCourseB.addEventListener("click", function () {
  var futureEvents = getfutureEvents(course, currentTime);
  var searchCourse = sCourseT.value.toUpperCase();
  var found = false;
  var goroom;
  for (const currentevent of currentEvents) {
    if (currentevent.code === searchCourse) {
      sCourseP.querySelector(".toast-header strong").textContent =
        "Ongoing Event:";
      sCourseP.querySelector(".toast-body").innerHTML =
        "Time: " +
        currentevent.date +
        " " +
        currentevent.bgtime +
        "-" +
        currentevent.edtime +
        "<br>Course: <a href='https://www.kth.se/student/kurser/kurs/" +
        currentevent.code +
        "'>" +
        currentevent.code +
        "</a><br>Event: " +
        currentevent.event +
        "<br>Location: " +
        currentevent.room +
        " " +
        "<button class='btn btn-sm' id='goButton' style='color: blue'>↗️</button><br>Teacher: " +
        currentevent.teacher;
      found = true;
      var goroom = currentevent.room;
      break;
    }
  }

  if (!found) {
    for (const futureevent of futureEvents) {
      if (futureevent.code === searchCourse) {
        sCourseP.querySelector(".toast-header strong").textContent =
          "Next Event:";
        sCourseP.querySelector(".toast-body").innerHTML =
          "Time: " +
          futureevent.date +
          " " +
          futureevent.bgtime +
          "-" +
          futureevent.edtime +
          "<br>Course: <a href='https://www.kth.se/student/kurser/kurs/" +
          futureevent.code +
          "'>" +
          futureevent.code +
          "</a><br>Event: " +
          futureevent.event +
          "<br>Location: " +
          futureevent.room +
          " " +
          "<button class='btn btn-sm' id='goButton' style='color: blue'>↗️</button><br>Teacher: " +
          futureevent.teacher;
        found = true;
        var goroom = futureevent.room;
        break;
      }
    }
  }

  if (!found) {
    sCourseP.querySelector(".toast-header strong").textContent =
      "No course " + searchCourse + " was found";
    sCourseP.querySelector(".toast-body").innerHTML =
      "Please check:<br>Whether the course code input is correct. <br>Whether the course is in the current semester.<br>Whether the course is on the KTH main campus.";
    found = true;
  }
  sCourseP.style.display = "block";
  document.getElementById("closer1").addEventListener("click", function () {
    sCourseP.style.display = "none";
  });
  var goButton = document.getElementById("goButton");
  goButton.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/location.json", false);
    xhr.send();
    var location = JSON.parse(xhr.responseText);
    for (const room of location) {
      if (room.namn === goroom) {
        var selectedLayerName = room.location;
        map.getView().setCenter(room.coordinates);
        map.getView().setZoom(20);
        for (var key in mapLayers) {
          if (mapLayers.hasOwnProperty(key)) {
            if (key === selectedLayerName) {
              mapLayers[key].setVisible(true);
            } else {
              mapLayers[key].setVisible(false);
            }
          }
        }
      }
    }
  });
});

var sRoomT = document.getElementById("searchRoomT");
var sRoomB = document.getElementById("searchRoomB");
sRoomB.addEventListener("click", function () {
  var searchRoom = sRoomT.value.toUpperCase();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/location.json", false);
  xhr.send();
  var location = JSON.parse(xhr.responseText);
  for (const room of location) {
    if (room.namn === searchRoom) {
      var selectedLayerName = room.location;
      map.getView().setCenter(room.coordinates);
      map.getView().setZoom(20);
      for (var key in mapLayers) {
        if (mapLayers.hasOwnProperty(key)) {
          if (key === selectedLayerName) {
            mapLayers[key].setVisible(true);
          } else {
            mapLayers[key].setVisible(false);
          }
        }
      }
    }
  }
});

//map.on('click', function (event) {
//  console.log(event.coordinate);
//});
