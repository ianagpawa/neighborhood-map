var restaurants = [
    {
        name: 'El Paso Mexicano',
        coordinates: {lat: 40.79072812277658, lng: -73.94721890430739},
        favorite: "Fish Taco",
        summary: "Favorite taco place.  They got rid of the Lengua tacos, but their remaining taco line up is pretty solid. Really good green sauce.",
    },
    {
        name: 'Taco Mix',
        coordinates: {lat: 40.79727935, lng: -73.938542},
        favorite: "Oreja Taco",
        summary: "Authentic tacos, but a bit inconsistent.  Wide range of taco offerings. Decent."
    },
    /*  DOESN'T Load    */
    {
        name: 'Guajillo',
        coordinates: {lat: 40.796939, lng: -73.935039},
        favorite: "Tripa Taco",
        summary: "Good tacos, but not always great."
    },
    {
        name: "Delicias Mexicanas",
        coordinates: {lat: 40.79746301121289, lng: -73.94036497052035},
        favorite: "Al Pastor Taco",
        summary: "Good food, no complaints."
    },
    {
        name: "Ollin",
        coordinates: {lat: 40.791111156036116, lng: -73.93960723430115},
        favorite: "Pollo Taco",
        summary: "Pretty good food."
    },
    /*  DOESN'T Load    */
    {
        name: "Lupita's",
        coordinates: {lat: 40.79014530307375, lng: -73.942862034803},
        favorite: 'Lengua Taco',
        summary: "Ok tacos, not bad."
    },
    {
        name: "Hot Jalapeno",
        coordinates: {lat: 40.7977, lng: -73.939},
        favorite: 'Carne Asada Taco',
        summary: "Suprisingly decent."
    },
    {
        name: "Taqueria Guadalupe",
        coordinates: {lat: 40.79402106079923, lng: -73.94332126150972},
        favorite: 'Chorizo Taco',
        summary: "Meh.  There are better places to eat better food.  Last resort tacos."

    }
];



/*  Model   */
var Restaurant = function(data){

    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.id = ko.observable(data.id);
    this.address = ko.observable(data.address);
    this.menu = ko.observable(data.menu);
    this.delivery = ko.observable(data.delivery);
    this.favorite = ko.observable(data.favorite);
    this.summary = ko.observable(data.summary);
    this.phone = ko.observable(data.phone);

};



function createRestaurant(restaurant){
    var retrievedRestaurant = {
        name: restaurant.name,
        coordinates: restaurant.coordinates,
        favorite: restaurant.favorite,
        summary: restaurant.summary
    };


    /* ajax function  need to pass through callback */
    function getAjax(restaurant_name, callback){

        function getCurrentDate(){
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear().toString();

            function addZero(n){
                if (n < 10) {
                    n = '0' + n
                }
                return n.toString()
            }

            day = addZero(day);
            month = addZero(month);

            return year + month + day
        }


        /*  Builds URL string for ajax call */

        var urlStart = "https://api.foursquare.com/v2/venues/search?ll="

        var coordinates = "40.793,-73.941"

        var query = "&query=%RESTAURANT_NAME%";

        function formatName(restaurant_name){
            var name_array = restaurant_name.split(" ");
            return name_array.join("%20")
        }

        var formattedName = formatName(restaurant_name);
        var restaurantName = query.replace("%RESTAURANT_NAME%", formattedName)

        var city = "&near=New%20York,NY"

        var limit = "&limit=1"

        var client_id = "&client_id=%CLIENT_ID%".replace("%CLIENT_ID%", CLIENT_ID)
        var client_secret = "&client_secret=%CLIENT_SECRET%".replace("%CLIENT_SECRET%", CLIENT_SECRET)

        var currentDate = getCurrentDate();
        var version = "&v=%DATE%".replace("%DATE%", currentDate)

        /*  Finied url  */
        var url = urlStart + coordinates + restaurantName + city + limit + client_id + client_secret + version


        $.ajax({
            dataType: 'json',
            url: url,
            success: function(foursquare){
                data = foursquare.response.venues[0];
                callback(data)
            },
            error: function(){

            }
        })

    }


    getAjax(retrievedRestaurant.name, function(data){
        var id = data.id;
        retrievedRestaurant.id = id;

        var address = data.location.formattedAddress[0];
        retrievedRestaurant.address = address

        if (data.hasMenu){
            menu = data.menu.url;
            retrievedRestaurant.menu = menu;

            delivery = data.delivery.url;
            retrievedRestaurant.delivery = delivery;
        }

        var phone = data.contact.formattedPhone;
        retrievedRestaurant.phone = phone;


        modelRestaurants.push(new Restaurant(retrievedRestaurant))

    })

}


var modelRestaurants = ko.observableArray([]);

var singleRestaurant = ko.observable();


function initMap(){


    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.794, lng: -73.937},
        zoom: 15
    });


/*
    restaurants.forEach(function(restaurant){
        singleMarker(restaurant);
    });
*/

    createdMarkers = []

    this.markersList = ko.computed(function(){

        ko.utils.arrayForEach(allRestaurants(), function(restaurant){
            createdMarkers.push(singleMarker(restaurant))
        })

        if (singleRestaurant() != undefined){
            createdMarkers.forEach(function(marker){

                if (marker.title.startsWith(singleRestaurant())){
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            })

            if (singleRestaurant().length == 1){
                createdMarkers.forEach(function(marker){
                    marker.setVisible(true);
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

        var marker = new google.maps.Marker({
                     position: restaurant.coordinates(),
                     map: map,
                     title: restaurant.name(),
                     animation: google.maps.Animation.DROP
                 });

        marker.addListener('click', toggleBounce);


        var contentString = "<div class='text-center' id='content><h1 id='restaurant_name' class='firstHeading'><b>%RestaurantName%</b></h1><div id='restaurant_info'><p>%SUMMARY%</p><p>Favorite Taco: %TACO%</p></div></div>";

        var res_name = contentString.replace("%RestaurantName%", restaurant.name());
        var taco = res_name.replace("%TACO%", restaurant.favorite());
        var summary = taco.replace("%SUMMARY%", restaurant.summary());

        var infowindow = new google.maps.InfoWindow({
            content: summary
        });


        infowindow.addListener("closeclick", function(){
            marker.setAnimation(null);
        })


        marker.addListener('click', function(){
            infowindow.open(map, marker);
         });


        return marker
    }




    function createMarkers(restaurant_list){
        var markers = []

        restaurant_list.forEach(function(restaurant){
            markers.push(singleMarker(restaurant))
        })

        return markers
    }

}


var allRestaurants = ko.observableArray([]);



var ViewModel = function(){

    var self = this;

    restaurants.forEach(function(restaurant){
        createRestaurant(restaurant)
        //singleMarker(restaurant)
    });


    this.restaurantList = modelRestaurants;

    this.getCurrentRestaurant = function(clicked){
        self.currentRestaurant(clicked)
    }

    this.currentRestaurant = ko.observable( self.restaurantList[0] );

    this.filter = ko.observable();


    this.filteredList = ko.computed(function(){

        var filter = self.filter();

        if (!filter){
            return self.restaurantList();
        } else {


            function camelCaseAll(input){

                var arr = input.split(" ");

                var newArr = [];

                function upperCaseWord(word){
                        return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
                };

                arr.forEach(function(word){
                    newArr.push(upperCaseWord(word))
                });

                return newArr.join(" ")
            }


            filter = camelCaseAll(filter);

            return ko.utils.arrayFilter(self.restaurantList(), function(restaurant){
                singleRestaurant = ko.observable(filter);
                return restaurant.name().startsWith(filter);
            });
        }
    });


    allRestaurants = self.filteredList;
};


ko.applyBindings(new ViewModel())
