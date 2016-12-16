
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.789, lng: -73.944},
    zoom: 15
  });
}




function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      'key=' + GOOGLE_MAPS_API_KEY +'&callback=initMap';
  document.body.appendChild(script);
}

loadScript()
