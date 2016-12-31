/**
* @description Creates map marker
* @param {object} restaurant Restaurant info already retrieved from
*   Foursquare
* @param {object} map Instance of Google map.
* @returns {object} marker Google Map marker
*/
function singleMarker(restaurant, map){
    /*  From Google MAP API documentation   */
    /**
    * @description Toggles bounce animation of map markers.
    */
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

   /**
   * @description Creates info window for map markers.
   * @param {string} delivery Modified content string with restaurant info
   * @param {string} restaurant.name Title for map marker
   * @returns {object} infowindow Info window for map marker
   */
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        title: restaurant.name
    });

    infowindow.addListener("closeclick", function(){
        marker.setAnimation(null);
    });

    /**
    * @description Creates map marker objects
    * @param {string} restaurant.coordinates GPS location for restaurant
    * @param {object} map Google map
    * @param {string} restaurant.name Title for map marker
    * @param {string} google.maps.Animation.DROP  Animation for map marker
    * @param {object} infowindow Info window for map marker
    * @returns {object} marker Google map marker
    */
    var marker = new google.maps.Marker({
                position: restaurant.coordinates,
                map: map,
                title: restaurant.name,
                animation: google.maps.Animation.DROP,
                info: contentString
             });

    marker.addListener('click', toggleBounce);

    marker.addListener('click', function(){
        populateInfoWindow(this, infoWindow);
     })

    return marker;
}


var map;
var infoWindow;


function createInfoWindow(marker, infowindow){
    if (infowindow.marker != marker){
        infowindow.marker = marker;
        infowindow.setContent(marker.contentString);
        infowindow.open(map, marker);

        infowinwdow.addListener('closeclick', function(){
            infowindow.setMarker(null)
        })
    }
}

/**
* @description Initializes Google map on load
*/
function initMap(){
    var self = this;

    var markers = [];

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.795, lng: -73.939},
        zoom: 16
    });

    infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < restaurants.length; i++){
        var marker = new google.maps.Marker({
            map: map,
            position: restaurants[i].coordinates,
            title: restaurants[i].name,
            animation: google.maps.Animation.DROP
        })
        markers.push(marker)
        marker.addListener('click', function(){
            createInfoWindow(this, infoWindow)
        })
    }

}
