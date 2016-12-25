


function initMap(){

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.794, lng: -73.937},
        zoom: 15
    });


    this.selectedRestaurant = ko.computed(function(){
        if (currentRes()){
            var currentRestaurantName = currentRes().name();
            createdMarkers.forEach(function(restaurant){
                restaurant.setAnimation(null);
                if (currentRestaurantName == restaurant.title){
                    restaurant.setAnimation(google.maps.Animation.BOUNCE);
                }
            })
        }
    })

    var createdMarkers = []

    restaurants.forEach(function(restaurant){
        createdMarkers.push(singleMarker(restaurant));
    })


    this.markersList = ko.computed(function(){
        if (singleRestaurant.name()){
            createdMarkers.forEach(function(marker){
                if (!marker.title.startsWith(singleRestaurant.name())){
                    marker.setVisible(false);
                    (marker.info).close(map, marker)
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            })


            if (singleRestaurant.name().length < 2){
                createdMarkers.forEach(function(marker){
                    marker.setVisible(true);
                    marker.setAnimation(null);
                    (marker.info).close(map, marker)
                })
            }

        }

    })





    function singleMarker(restaurant){
        /*  From Google MAP API documentation   */
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            };
        };

        var contentString = "<div class='text-center' id='content><h1 id='restaurant_name' class='firstHeading'><b>%RestaurantName%</b></h1><div id='restaurant_info'><p>%SUMMARY%</p><p>Favorite Taco: %TACO%</p></div></div>";

        var res_name = contentString.replace("%RestaurantName%", restaurant.name);
        var taco = res_name.replace("%TACO%", restaurant.favorite);
        var summary = taco.replace("%SUMMARY%", restaurant.summary);

        var infowindow = new google.maps.InfoWindow({
            content: summary,
            title: restaurant.name
        });


        infowindow.addListener("closeclick", function(){
            marker.setAnimation(null);
        })

        var marker = new google.maps.Marker({
                    position: restaurant.coordinates,
                    map: map,
                    title: restaurant.name,
                    animation: google.maps.Animation.DROP,
                    info: infowindow
                 });

        marker.addListener('click', toggleBounce);



        marker.addListener('click', function(){
            infowindow.open(map, marker);
         });


        return marker
    }

}
