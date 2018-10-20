
// var map;
var L;
var document;

// Available tracks:
var treks =
    [
      {
        "title": "Sesto Fiorentino - Monte Morello, sgambata sopra Colonnata",
        "trackfile": "tracks/20181020_morello_basso_lato_colonnata.gpx"
      },
      {
        "title": "Sesto Fiorentino - Monte Morello, Sgambata sopra le Cappelle",
        "trackfile": "tracks/20181007_SgambataMonteMorelloVicinoCasa.gpx"
      },
      {
        "title": "Abetone - Alpe Tre Potenze",
        "trackfile": "tracks/20180909_LeRegine_LagoNero_AlpeTrePotenze_Abetone.gpx"
      },
      {
        "title": "Da Valnontey al Rifugio Sella passando per i capanni dell'Herbetet",
        "trackfile": "tracks/20180820_Valnontey_CapanniHerbetet_RifSella.gpx"
      },
      {
        "title": "Dal Rifugio Sella alla Valsavarenche (Col Lauson).gpx",
        "trackfile": "tracks/20180821_RifSella_ColLauson_Valsavarenche.gpx"
      },
      {
        "title": "Da Pont al Rifugio Savoia",
        "trackfile": "tracks/20180822_Pont_RifSavoia.gpx"
      },
      {
        "title": "Giro sopra il Rifugio Savoia: laghi e Col Leynir",
        "trackfile": "tracks/20180823_RifSavoia_Laghi_ColLeynir.gpx"
      },
      {
        "title": "Dal Rifugio Savoia a Ceresole Reale passando per il Colle della Terra",
        "trackfile": "tracks/20180824_RifSavoia_ColleDellaTerra_RifMila.gpx"
      },
      {
        "title": "Islanda - Passeggiata nel Landmannalaugar con salita al Blahnukur",
        "trackfile": "tracks/20180701_Landmannalaugar_Blahnukur.gpx"
      },
      {
        "title": "Islanda - Breve passeggiata nel Thorsmork",
        "trackfile": "tracks/20180702_Thorsmork.gpx"
      },
      {
        "title": "Islanda - Passeggiata sopra Skogafoss",
        "trackfile": "tracks/20180703_Skogafoss.gpx"
      },
      {
        "title": "Islanda - Il relitto aereo presso la spiaggia di Vik",
        "trackfile": "tracks/20180703_VikRelittoAereo.gpx"
      },
      {
        "title": "Islanda - Skaftafell, anello St. Kristine",
        "trackfile": "tracks/20180705_SkaftafellAnelloStKristine.gpx"
      },
      {
        "title": "Islanda - Le cascate di Hengifoss",
        "trackfile": "tracks/20180707_CascataHengifoss.gpx"
      },
      {
        "title": "Islanda - Asbyrgi",
        "trackfile": "tracks/20180709_Asbyrgi.gpx"
      },
      {
        "title": "Islanda - Vesturdalur e salita al Raudholar",
        "trackfile": "tracks/20180709_Vesturdalur_Raudholar.gpx"
      }
    ];

// -----------------------------------------------------------------------------
function getRadioVal(form, name) {
  'use strict';
  var radios, val, i, len;
  
  radios = form.elements[name];

  for (i = 0, len = radios.length; i < len; i = i + 1) {
    if (radios[i].checked === true) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
function prepareTrackDropdown(ddown, treks) {
  'use strict';
  var option, ndx;

  ddown.length = 0;

  for (ndx = 0; ndx < treks.length; ndx = ndx + 1) {
    option = document.createElement('option');
    option.text = treks[ndx].title;
    ddown.add(option);
  }

  ddown.selectedIndex = 0;
}

// ----------------------------------------------------------------------------
function clearLayers(map) {
  'use strict';
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

// ----------------------------------------------------------------------------
function forYouMapsLayer() {
  'use strict';
  return L.tileLayer('https://tileserver.4umaps.com/{z}/{x}/{y}.png',
    {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.4umaps.com/">4UMaps</a>'
    });
}

// ----------------------------------------------------------------------------
function openTopoMapLayer() {
  'use strict';
  return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
}

// ----------------------------------------------------------------------------
function thunderForestLandscapeLayer() {
  'use strict';
  return L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}',  {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: 'e9fb11ac45734d7f9475e22de47d93e7',
    maxZoom: 22
  });
}

// ----------------------------------------------------------------------------
function mapBoxLayer() {
  'use strict';

  var mpKey, mpUrl, mpAttrib;
  
  // save my MapBox key
  mpKey = 'pk.eyJ1Ijoicm9kbWNiYW4iLCJhIjoiY2ptNHQ2c3N1MGducTNxbzRydGUwZzdtMSJ9.jILIRcBlfcJTPZztynaKwQ';
  mpUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mpKey;

  mpAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>';

  return new L.tileLayer(mpUrl,
    {
      attribution: mpAttrib,
      id: 'mapbox.streets'
    }
                        );
}

// ----------------------------------------------------------------------------
function showSelectedBaseMap(map, basemap) {
  'use strict';
  clearLayers(map);

  switch (basemap) {
  case 'fum':
    // 4Umaps
    map.addLayer(forYouMapsLayer());
    break;
  case 'otm':
    // Open topo map
    map.addLayer(openTopoMapLayer());
    break;
  case 'tf':
    // Thunderforest landscape
    map.addLayer(thunderForestLandscapeLayer());
    break;
  case 'mb':
    // Mapbox
    map.addLayer(mapBoxLayer());
    break;
  default:
    // impossible... Uses Mapbox
    map.addLayer(mapBoxLayer());
    break;
  }
}

// ----------------------------------------------------------------------------
function showTrack(map, track) {
  'use strict';
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
  }).on('loaded', function (e) {
    var gpx = e.target;
    map.fitBounds(gpx.getBounds());
    console.log('GPX name = ' + gpx.get_name());
  }).addTo(map);
}

// ----------------------------------------------------------------------------
function showLayers(map, basemap, track) {
  'use strict';
  showSelectedBaseMap(map, basemap);
  showTrack(map, track);
}

// ----------------------------------------------------------------------------
function redrawMap(map, mapform, ddown, treks) {
  'use strict';
  showLayers(map, getRadioVal(mapform, 'basemap'),
    treks[ddown.selectedIndex].trackfile);
}

//-----------------------------------------------------------------------------
function domap() {
  'use strict';
  var mymap, mapform, ddown, basemapRadios, i, len;
  mymap = new L.map('mapid');
  mymap.scrollWheelZoom.disable()

  mapform = document.getElementById('mapLayerChooserForm');
  ddown = document.getElementById('track-chooser-dropdown');

  // assign onclick function to radio button used
  // to select basemap
  //basemapRadios = mapform.elements['basemap'];
  basemapRadios = mapform.elements.basemap;

  for (i = 0, len = basemapRadios.length; i < len; i = i + 1) {
    basemapRadios[i].addEventListener("click", function () {
      redrawMap(mymap, mapform, ddown, treks);
    }, false);
  }

  prepareTrackDropdown(ddown, treks);
  ddown.addEventListener("change", function () {
    redrawMap(mymap, mapform, ddown, treks);
  }, false);


  redrawMap(mymap, mapform, ddown, treks);
}

