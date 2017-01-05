var map;
var infoWindow;
var Marker;

function createInfoWindow(marker, infowindow) {
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(marker.content);
        infowindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 700);
    }
}

/**
* @description Initializes Google map on load
*/
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.795, lng: -73.939},
        zoom: 16
    });

    infoWindow = new google.maps.InfoWindow();

    Marker = function (datum) {
        var mark = new google.maps.Marker({
            position: datum.coordinates(),
            map: map,
            title: datum.name(),
            animation: google.maps.Animation.DROP,
            content: datum.contentString()
        });

        mark.addListener("click", function () {
            createInfoWindow(this, infoWindow);
        });

        return mark;
    };
}
