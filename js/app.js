/**
* @description Retrieves restaurant info from Foursquare API,
*   creates restaurant object.
* @param {object} restaurant object
* @returns {none} Adds restaurant object to retrievedRestaurants array, and to modelRestaurants array.  
*/
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
            };

            day = addZero(day);
            month = addZero(month);

            return year + month + day
        };

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
        var client_id = "&client_id=%CLIENT_ID%".replace("%CLIENT_ID%",
                        CLIENT_ID)
        var client_secret = "&client_secret=%CLIENT_SECRET%".replace(
                            "%CLIENT_SECRET%", CLIENT_SECRET);
        var currentDate = getCurrentDate();
        var version = "&v=%DATE%".replace("%DATE%", currentDate);

        /*  Finied url  */
        var url = urlStart +
                  coordinates +
                  restaurantName +
                  city +
                  limit +
                  client_id +
                  client_secret +
                  version;


        $.ajax({
            dataType: 'json',
            url: url,
            success: function(foursquare){
                data = foursquare.response.venues[0];
                callback(data)
            },
            error: function(error){
                alert('Something went wrong with Foursquare!');
            }
        });
    };


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
                        return word.slice(0,1).toUpperCase() +
                               word.slice(1).toLowerCase();
                };

                arr.forEach(function(word){
                    newArr.push(upperCaseWord(word))
                });

                return newArr.join(" ")
            }


            filter = camelCaseAll(filter);

            return ko.utils.arrayFilter(self.restaurantList(),
                function(restaurant){
                    singleRestaurant.name(filter);
                    return restaurant.name().startsWith(filter);
            });
        }
    });

    allRestaurants = self.filteredList;
};


ko.applyBindings(new ViewModel())
