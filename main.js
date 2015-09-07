  var map = L.map('map', {minZoom: 0, zoom: 4, center: L.latLng(36, -95)});
  
  /* OSM basemap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  */
  
  //ESRI
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'}).addTo(map);
  
  /*Stamen
  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', minZoom: 1, maxZoom: 16}).addTo(map);
  */
  
  /* OTM
  L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 16,
	  attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(map);
  */
  
  // Now that the basemap is done, add data
  
  function articleType (tpe){
    if (tpe === "Wikipedia:Exzellent" || tpe === "Featured_articles" || tpe === "Wikipedia:Artículos_destacados" || tpe === "Article_de_qualité"){
      return "Featured Article";
    } else {
      return "Good Article";
    }
    
  }
  
  function addPoints(JSONs, iconURI, lang){
    $.getJSON(JSONs, function(data){
      var Icon = L.icon({iconUrl: iconURI, iconSize: [25,17]});
      L.geoJson(data, {
        pointToLayer: function(feature, cords){
          var Marker = L.marker(cords, {icon: Icon});
          Marker.bindPopup('<center>' + feature.properties.title + '<br>' + articleType(feature.properties.content_type) + '<br><a href="http://' + lang +'.wikipedia.org/wiki/' + feature.properties.title + '" target="_blank">Link</a></center>');
          return Marker;
        }
      }).addTo(map);
    });
  }
    
  addPoints("/WikipediaMap/geo_data_fr.json", '/WikipediaMap/France.png', 'fr');
  addPoints("/WikipediaMap/geo_data_es.json", '/WikipediaMap/Spain.png', 'es');
  addPoints("/WikipediaMap/geo_data_de.json", '/WikipediaMap/Germany.png', 'de');
  //SE
  addPoints("/WikipediaMap/geo_data_en_2.json", '/WikipediaMap/EnLang.png', 'en');
  //NE
  addPoints("/WikipediaMap/geo_data_en_1.json", '/WikipediaMap/EnLang.png', 'en');
  //NW
  addPoints("/WikipediaMap/geo_data_en_3.json", '/WikipediaMap/EnLang.png', 'en');
  //SW
  addPoints("/WikipediaMap/geo_data_en_4.json", '/WikipediaMap/EnLang.png', 'en');
