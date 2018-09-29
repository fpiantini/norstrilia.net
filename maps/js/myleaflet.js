var map;

// Available tracks:
// var selectedMap = "tracks/20180820_Valnontey_CapanniHerbetet_RifSella.gpx";
// var selectedMap = "tracks/20180821_RifSella_ColLauson_Valsavarenche.gpx";
// var selectedMap = "tracks/20180822_Pont_RifSavoia.gpx";
// var selectedMap = "tracks/20180823_RifSavoia_Laghi_ColLeynir.gpx";
// var selectedMap = "tracks/20180824_RifSavoia_ColleDellaTerra_RifMila.gpx";

var treks =
[
  {
    "title": "Da Valnontey al Rifugio Sella passando per i capanni dell'Herbetet",
    "trackfile": "tracks/20180820_Valnontey_CapanniHerbetet_RifSella.gpx",
    "abbreviation": "V_CH_FS"
  },
  {
    "title": "Dal Rifugio Sella alla Valsavarenche (Col Lauson).gpx",
    "trackfile": "tracks/20180821_RifSella_ColLauson_Valsavarenche.gpx",
    "abbreviation": "RS_CL_V"
  },
  {
    "title": "Da Pont al Rifugio Savoia",
    "trackfile": "tracks/20180822_Pont_RifSavoia.gpx",
    "abbreviation": "P_RS"
  },
  {
    "title": "Giro sopra il Rifugio Savoia: laghi e Col Leynir",
    "trackfile": "tracks/20180823_RifSavoia_Laghi_ColLeynir.gpx",
    "abbreviation": "RS_CL"
  },
  {
    "title": "Dal Rifugio Savoia a Ceresole Reale passando per il Colle della Terra",
    "trackfile": "tracks/20180824_RifSavoia_ColleDellaTerra_RifMila.gpx",
    "abbreviation": "RS_CDT_CR"
  },
]

var selectedMap = treks[3]["trackfile"];

//------------------------------------------------------------------------------------------------------
function initmap()
{
  var mymap = new L.map('mapid');
  mymap.setView([45.6074676, 7.3490831], 13);

  var mapform = document.getElementById('baseMapForm');
  var ddown = document.getElementById('track-chooser-dropdown');

  // assign onclick function to radio button used
  // to select basemap
  var basemapRadios = mapform.elements['basemap'];

  for (var i = 0, len = basemapRadios.length; i < len; i++) {
    basemapRadios[i].addEventListener("click", function() {
      redrawMap(mymap, mapform, ddown, treks)
    }, false);
  }

  prepareTrackDropdown(ddown, treks)
  ddown.addEventListener("change", function() {
    redrawMap(mymap, mapform, ddown, treks)
  }, false);


  redrawMap(mymap, mapform, ddown, treks);
  //showLayers(mymap, getRadioVal(mapform, 'basemap'),
  //  treks[ddown.selectedIndex]["trackfile"]);
}

// -----------------------------------------------------------------------------------------------------
function redrawMap(map, mapform, ddown, treks)
{
  showLayers(map, getRadioVal(mapform, 'basemap'),
    treks[ddown.selectedIndex]["trackfile"]);
}

// -----------------------------------------------------------------------------------------------------
function showLayers(map, basemap, track)
{
  showSelectedBaseMap(map, basemap);
  showTrack(map, track);
}

// -----------------------------------------------------------------------------------------------------
function showSelectedBaseMap(map, basemap)
{
  clearLayers(map);

  switch (basemap) {
    case 'fum':
      // 4Umaps
      map.addLayer(forYouMapsLayer());
      break;
    case 'otm':
      // Open topo map
      map.addLayer(OpenTopoMapLayer());
      break;
    case 'tf':
      // Thunderforest landscape
      map.addLayer(ThunderForestLandscapeLayer());
      break;
    case 'mb':
      // Mapbox
      map.addLayer(MapBoxLayer());
      break;
    default:
      // impossible... Uses Mapbox
      map.addLayer(MapBoxLayer());
      break;
  }
}

// -----------------------------------------------------------------------------------------------------
function showTrack(map, track)
{
  var gpx = track;
  new L.GPX(gpx, {
    async: true,
    marker_options: {
      startIconUrl: 'imgs/pin-icon-start.png',
      endIconUrl: 'imgs/pin-icon-end.png',
      shadowUrl: 'imgs/pin-shadow.png'
    },
    polyline_options: {
      color: 'purple',
      opacity: 0.75,
      weight: 3,
      lineCap: 'round'
    }
  }).on('loaded', function(e) {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);
}

//------------------------------------------------------------------------------------------------------
function clearLayers(map)
{
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

//------------------------------------------------------------------------------------------------------
function forYouMapsLayer()
{
  return L.tileLayer('https://tileserver.4umaps.com/{z}/{x}/{y}.png',
  {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.4umaps.com/">4UMaps</a>'
  });
}

//------------------------------------------------------------------------------------------------------
function OpenTopoMapLayer()
{
  return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
}

//------------------------------------------------------------------------------------------------------
function ThunderForestLandscapeLayer()
{
  return L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: 'e9fb11ac45734d7f9475e22de47d93e7',
    maxZoom: 22
  });
}

//------------------------------------------------------------------------------------------------------
function MapBoxLayer()
{

  // save my MapBox key
  var mpKey = 'pk.eyJ1Ijoicm9kbWNiYW4iLCJhIjoiY2ptNHQ2c3N1MGducTNxbzRydGUwZzdtMSJ9.jILIRcBlfcJTPZztynaKwQ';
  var mpUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mpKey;

  var mpAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'

  return tlay = new L.tileLayer(mpUrl,
    {
       attribution: mpAttrib,
       id: 'mapbox.streets',
    }
  );
}

//------------------------------------------------------------------------------------------------------
function getRadioVal(form, name)
{
  var radios = form.elements[name];
  var val;

  for (var i=0, len=radios.length; i<len; i++) {
    if ( radios[i].checked == true ) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}


// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
function prepareTrackDropdown(ddown, treks)
{
  ddown.length = 0;

  //let defaultOption = document.createElement('option');
  //defaultOption.text = 'Scegli la traccia da visualizzare';
  //ddown.add(defaultOption);

  let option;
  for (let ndx = 0; ndx < treks.length; ndx++) {
    option = document.createElement('option');
    option.text = treks[ndx]['title'];
    option.value = treks[ndx]['abbreviation'];
    ddown.add(option);
  }

  ddown.selectedIndex = 0;
}


