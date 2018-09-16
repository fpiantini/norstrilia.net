var map;

function initmap() {

  var cogne = new L.map('mapid');
  cogne.setView([45.6074676, 7.3490831], 13);

  // save my MapBox key
  var mpKey = 'pk.eyJ1Ijoicm9kbWNiYW4iLCJhIjoiY2ptNHQ2c3N1MGducTNxbzRydGUwZzdtMSJ9.jILIRcBlfcJTPZztynaKwQ';
  var mpUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mpKey;

  var mpAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'

  tlay = new L.tileLayer(mpUrl,
    {
       attribution: mpAttrib,
       id: 'mapbox.streets',
    }
  );

  cogne.addLayer(tlay);

}

