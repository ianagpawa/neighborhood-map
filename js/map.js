
/*  From Google Maps API Documentation */
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.794, lng: -73.937},
        zoom: 15
    });



    function singleMarker(restaurant){
        /*  From Google MAP API documentation   */
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            };
        };

        var marker = new google.maps.Marker({
                     position: restaurant['coordinates'],
                     map: map,
                     title: restaurant['name'],
                     animation: google.maps.Animation.DROP
                 });

        marker.addListener('click', toggleBounce);


        var contentString = "<div class='text-center' id='content><h1 id='restaurant_name' class='firstHeading'>%RestaurantName%</h1><div id='restaurant_info'><p>%SUMMARY%</p><p>Favorite Taco: %TACO%</p></div></div>";

        var res_name = contentString.replace("%RestaurantName%", restaurant.name)
        var taco = res_name.replace("%TACO%", restaurant.favorite)
        var summary = taco.replace("%SUMMARY%", restaurant.summary)

        /*  var address = res_name.replace("%ADDRESS%", restaurant.address) */

        var infowindow = new google.maps.InfoWindow({
            content: summary
        });


        marker.addListener('click', function() {
            infowindow.open(map, marker);
         });


        return marker
    }



    function createMarkers(restaurant_list){
        var markers = []

        for (restaurant in restaurant_list){
            markers.push(singleMarker(restaurant_list[restaurant]))
        }

        return markers
    }

    /*  restaurants (restaurant list) from app.js */
    var markers = createMarkers(restaurants)


}
