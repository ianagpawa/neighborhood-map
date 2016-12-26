



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

        retrievedRestaurants.push(singleMarker(retrievedRestaurant, map))

        modelRestaurants.push(new Restaurant(retrievedRestaurant))

    })
}

var map;

function singleMarker(restaurant, map){
    /*  From Google MAP API documentation   */
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        };
    };

    var contentString = "<div class='text-center' id='content><h1 id='restaurant_name' class='firstHeading'><b>%RestaurantName%</b></h1><div id='restaurant_info'><p>%PHONE%</p><p>%SUMMARY%</p><p>Favorite Taco: %TACO%</p></div></div>";

    var res_name = contentString.replace("%RestaurantName%", restaurant.name);
    var taco = res_name.replace("%TACO%", restaurant.favorite);
    var summary = taco.replace("%SUMMARY%", restaurant.summary);
    var phone = summary.replace("%PHONE%", restaurant.phone);
    var infowindow = new google.maps.InfoWindow({
        content: phone,
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


var retrievedRestaurants = [];



var modelRestaurants = ko.observableArray([]);

var currentRes = ko.observable();



var allRestaurants = ko.observableArray([]);

var singleRestaurant = {
    name: ko.observable('')
};

var ViewModel = function(){
    var self = this;

    restaurants.forEach(function(restaurant){
        createRestaurant(restaurant)
    });

    this.restaurantList = modelRestaurants;

    this.getCurrentRestaurant = function(clicked){
        self.currentRestaurant(clicked)
    }

    this.currentRestaurant = ko.observable( self.restaurantList[0] );

    currentRes = self.currentRestaurant;

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
                singleRestaurant.name(filter);
                return restaurant.name().startsWith(filter);
            });
        }
    });

    allRestaurants = self.filteredList;
};


ko.applyBindings(new ViewModel())
