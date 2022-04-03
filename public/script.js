// color variables
var start_color = '#CE3000';
var end_color = '#47B700';
// battery slider variables
var batteryLvl = 50;
var slider = document.getElementById('batteryValInp');
var batteryDisplay = document.getElementById('batteryVal');
// car type select variable
var carType = 'hatchback';

// CREDENTIALS
var platform = new H.service.Platform({
  'apikey': 'IEt8dt3NQy3h3phRpCJ_XxK_rcmpHjSlsSZ0GlfBT8U'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,
  {
    zoom: 10,
    center: { lat: 28.6139, lng: 77.2090 }
  }
);

// Adding tilt to the map:
map.getViewModel().setLookAtData({
  tilt: 45
});

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
ui.getControl('mapsettings').setDisabled(false)
ui.getControl('zoom').setDisabled(false)
ui.getControl('scalebar').setDisabled(false)

// Positions of the UI components:
var mapSettings = ui.getControl('mapsettings');
var scalebar = ui.getControl('scalebar');
mapSettings.setAlignment('top-left');
scalebar.setAlignment('bottom-right');

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);

// Emergency Contacts:
function getNumber(i) {
  /* numbers */
  var msg;
  var countryName = i[i.length - 1].slice(1);
  $.ajax({
      url: window.location.href+"view/"+countryName,
      type: 'GET',
      dataType: 'json', // added data type
      async : false,
      success: function(data) {
          console.log(data);
          if(data['COUNTRY']==null){
            // console.log("null")
            msg = `<div class="ui info message" style="margin-top: 0.3vh;">
                      <div class="header">
                          Not Available for this region, please click somewhere else
                      </div>
                  Click <a href="https://www.adducation.info/general-knowledge-travel-and-transport/emergency-numbers/"><b>here</b></a> for countrywise list of emergency numbers
                  </div>`
          } else {
            console.log("CONTROL REACHES TO ELSE");
            // console.log(" not null");
            msg = `<div class="ui six tiny horizontal statistics">
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["COUNTRY"])}
                              </div>
                              <div class="label">
                              REGION
                              </div>
                          </div>
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["CALLCODES"])}
                              </div>
                              <div class="label">
                              Call Codes
                              </div>
                          </div>
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["EMERGENCY"])}
                              </div>
                              <div class="label">
                              Emergency
                              </div>
                          </div>
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["POLICE"])}
                              </div>
                              <div class="label">
                              Police
                              </div>
                          </div>
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["AMBULANCE"])}
                              </div>
                              <div class="label">
                              Ambulance
                              </div>
                          </div>
                          <div class="statistic">
                              <div class="value">
                              ${emptlyValueNumbers(data["FIRE"])}
                              </div>
                              <div class="label">
                              Fire
                              </div>
                          </div>
                          </div>`;
         }
      }
  });
  return msg;
}

// Emergency Contacts Helper: 
function emptlyValueNumbers(k) {
  if (k == "") {
    return `<i class="ban icon"></i>`;
  } else {
    return k;
  }
}

// Reverse GeoCode:
var geocoder = platform.getSearchService();
function revGeocode(lat, lon) {
  var sol = lat + "," + lon;
  let geocodeParam = {
    at: sol
  }

  function onResult(result) {
    if (result.items.length > 0) {
      var x = result.items[0].title;
      document.getElementById("status").innerHTML = '<h3>' + x + '</h3>';
      var i = x.split(",");
      document.getElementById("contacts").innerHTML = getNumber(i);
    } else if (result.items.length == 0) {
      document.getElementById("status").innerHTML = "<h1>funCharge</h1>";
    }
  }

  geocoder.reverseGeocode(geocodeParam, onResult, alert);
}

// mark positions button
markPosition = () => {
  // TODO: start and end position mark logic
  document.getElementById('routeBtn').classList.remove("disabled")
}

// function to get gradient color
getGradientColor = function (start_color, end_color, percent) {
  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, '');
  end_color = end_color.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (start_color.length == 3) {
    start_color = start_color.replace(/(.)/g, '$1$1');
  }

  if (end_color.length == 3) {
    end_color = end_color.replace(/(.)/g, '$1$1');
  }

  // get colors
  var start_red = parseInt(start_color.substr(0, 2), 16),
    start_green = parseInt(start_color.substr(2, 2), 16),
    start_blue = parseInt(start_color.substr(4, 2), 16);

  var end_red = parseInt(end_color.substr(0, 2), 16),
    end_green = parseInt(end_color.substr(2, 2), 16),
    end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  var diff_red = end_red - start_red;
  var diff_green = end_green - start_green;
  var diff_blue = end_blue - start_blue;

  diff_red = ((diff_red * percent) + start_red).toString(16).split('.')[0];
  diff_green = ((diff_green * percent) + start_green).toString(16).split('.')[0];
  diff_blue = ((diff_blue * percent) + start_blue).toString(16).split('.')[0];

  // ensure 2 digits by color
  if (diff_red.length == 1) diff_red = '0' + diff_red
  if (diff_green.length == 1) diff_green = '0' + diff_green
  if (diff_blue.length == 1) diff_blue = '0' + diff_blue

  return '#' + diff_red + diff_green + diff_blue;
};

var accentColor;
// DOMcontentloaded function
document.addEventListener('DOMContentLoaded', function () {
  // battery slider
  accentColor = getGradientColor(start_color, end_color, batteryLvl / 100)
  batteryDisplay.style.color = accentColor
  batteryDisplay.innerHTML = batteryLvl
  // cartype
  document.getElementById(carType).style.backgroundColor = accentColor;
}, false);

// car type select
carSelect = (carSelected) => {
  // console.log("car clicked " + carSelected)
  if (carType != carSelected) {
    document.getElementById('hatchback').style.backgroundColor = '#FFFFFF';
    document.getElementById('sedan').style.backgroundColor = '#FFFFFF';
    document.getElementById('SUV').style.backgroundColor = '#FFFFFF';
  }
  carType = carSelected
  document.getElementById(carType).style.backgroundColor = accentColor;
};


// battery slider value update
slider.addEventListener('input', (event) => {
  // slider.style.color = getGradientColor('#FF0000', '#00FF00', slider.value / 100)
  batteryLvl = slider.value
  accentColor = getGradientColor(start_color, end_color, batteryLvl / 100)
  document.getElementById(carType).style.backgroundColor = accentColor;
  batteryDisplay.style.color = accentColor
  batteryDisplay.innerHTML = slider.value
});

function globalFncTap(evt) {
  var coord = map.screenToGeo(evt.currentPointer.viewportX,
    evt.currentPointer.viewportY);
  var lat = coord.lat.toFixed(4);
  var lon = coord.lng.toFixed(4);
  revGeocode(lat, lon);
};

// Listening to current map location:
function ClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener('tap', globalFncTap);
  
}

ClickListener(map);

var str = "not set";
var end = "not set";

function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.

  document.getElementById("status").innerHTML = "<h4>Select <b>START</b> and <b>END</b> points on the map</h4>";
  var cnt = 0;
  map.addEventListener('tap', fnc);
  map.removeEventListener('tap', globalFncTap);
  function fnc(evt) {
    var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    let Pos = { lat: coord.lat, lng: coord.lng };


    var ans = Pos.lat + ',' + Pos.lng;
    if (cnt == 0) {
      document.getElementById("status").innerHTML = "<h4><b>START</b> point selected</h4>";
      str = ans;
      let strIcon = new H.map.Icon('assets/start.png');
      let strMarker = new H.map.Marker(Pos, { icon: strIcon });
      map.addObject(strMarker);
      strMarker.setData("START for routing!");
      console.log("START: " + ans);
    }
    if (cnt == 1) {
      document.getElementById("status").innerHTML = "<h4><b>END</b> point selected</h4>";
      end = ans;
      let endIcon = new H.map.Icon('assets/end.png');
      let endMarker = new H.map.Marker(Pos, { icon: endIcon });
      map.addObject(endMarker);
      endMarker.setData("END for routing!");
      console.log("END: " + ans);
    }

    cnt++;
    if (cnt == 2) {

      map.removeEventListener('tap', fnc);
      // alert("Use ROUTE button to trace your path on the map");
      map.addEventListener('tap', globalFncTap);
      $('#routeBtn').removeClass("disabled");
      $('#markBtn').addClass("disabled");
    }
    //console.log('Clicked at ' + coord.lat.toFixed(4) +
    // ((coord.lat > 0) ? 'N' : 'S') +
    /// ' ' + coord.lng.toFixed(4) +
    /// ((coord.lng > 0) ? 'E' : 'W'));
  }

}

function clickToMark(){
  // Add event listener:
  map.addEventListener('longpress', function(evt) {
      if(evt.target instanceof H.map.Marker){
          //bubble
          // Create an info bubble object at a specific geographic location:
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          content: evt.target.getData()
   });
          // Add info bubble to the UI:
          ui.addBubble(bubble);
      }
      else{
          // Log 'tap' and 'mouse' events:
          var cnt =0;
          console.log(evt); // too much data here (try to minify)
          let pointer = evt.currentPointer;
          let imgIcon = new H.map.Icon('assets/robot.png');
          let pointerPoistion = map.screenToGeo(pointer.viewportX, pointer.viewportY);
          let pointerMarker = new H.map.Marker(pointerPoistion,{icon: imgIcon, volatility: true});
          pointerMarker.draggable = true;
          if(cnt == 0){
              var userData = prompt("Enter some data for this pointer:");
              pointerMarker.setData(userData);
              console.log("Pointer added!");
          }else{
              pointerMarker.getData();
          }
                 
          map.addObject(pointerMarker);
      }
  });
}

clickToMark();

function clickDragMarkers(){
  // disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener('dragstart', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();
      }
  }, false);
  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        
          
      behavior.enable();
      }
  }, false);
  // Listen to the drag event and move the position of the marker
  // as necessary
  map.addEventListener('drag', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
  }, false);
}

clickDragMarkers();