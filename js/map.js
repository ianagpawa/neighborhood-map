var map;

function initMap(){
    var self = this;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.795, lng: -73.939},
        zoom: 16
    });


    this.selectedRestaurant = ko.computed(function(){
        if (currentRes()){
            var currentRestaurantName = currentRes().name();
            createdMarkers.forEach(function(restaurant){
                restaurant.setAnimation(null);
                if (currentRestaurantName == restaurant.title){
                    restaurant.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
        };
    });

    var createdMarkers = retrievedRestaurants;


    this.markersList = ko.computed(function(){
        if (singleRestaurant.name()){
            createdMarkers.forEach(function(marker){
                if (!marker.title.startsWith(singleRestaurant.name())){
                    marker.setVisible(false);
                    (marker.info).close(map, marker)
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            });


            if (singleRestaurant.name().length < 2){
                createdMarkers.forEach(function(marker){
                    marker.setVisible(true);
                    marker.setAnimation(null);
                    (marker.info).close(map, marker)
                });
            };
        };
    });
};
