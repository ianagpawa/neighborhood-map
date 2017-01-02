/**
* @description Retrieves restaurant info from Foursquare API,
*   creates restaurant object.
* @param {object} restaurant Restaurant info from restaurants array
* @returns {none} none Restaurant object used to create Google Maps marker
*   and pushed to retrievedRestaurants array.  Restaurant info used to
*   create instance of Restaurant model and pushed  to modelRestaurants array.
*/
function createRestaurant(restaurant){
    var retrievedRestaurant = {
        name: restaurant.name,
        coordinates: restaurant.coordinates,
        favorite: restaurant.favorite,
        summary: restaurant.summary
    };

    /**
    * @description Ajax call to retrieve restaurant info from Foursquare
    * @param {string} restaurant_name Restaurant name
    * @param {function} callback Callback function for handling ajax response
    *   data
    * @returns {object} response Retrieved restaurant info
    */
    function getAjax(restaurant_name, callback){

        /**
        * @description Creates current date, needed for Foursquare ajax
        *   call
        * @returns {string} date Current date string
        */
        function getCurrentDate(){
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear().toString();

            /**
            * @description Adds a zero to month or day.
            */
            function addZero(n){
                return ('0' + n).slice(-2);
            }

            day = addZero(day);
            month = addZero(month);

            return year + month + day
        };

        /*  Builds URL string for ajax call */
        var urlStart = "https://api.foursquare.com/v2/venues/search?ll="
        var coordinates = "40.793,-73.941"

        /**
        * @description Formats name of restaurant
        * @param {string} restaurant_name
        * @returns {string} Formatted restaurant name
        */
        function formatName(restaurant_name){
            var name_array = restaurant_name.split(" ");
            return name_array.join("%20")
        }

        var restaurant_name = formatName(restaurant_name);
        var query = `&query=${restaurant_name}`;

        var city = "&near=New%20York,NY";
        var limit = "&limit=1";
        var client_id = `&client_id=${CLIENT_ID}`;
        var client_secret = `&client_secret=${CLIENT_SECRET}`;

        var currentDate = getCurrentDate();
        var version = `&v=${currentDate}`;

        /*  Finished url  */
        var url = urlStart +
                  coordinates +
                  query +
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
        retrievedRestaurant.address = address;

        if (data.hasMenu){
            menu = data.menu.url;
            retrievedRestaurant.menu = menu;

            delivery = data.delivery.url;
            retrievedRestaurant.delivery = delivery;
        }

        var phone = data.contact.formattedPhone;
        retrievedRestaurant.phone = phone;


        var create = new Restaurant(retrievedRestaurant)
        modelRestaurants.push(create)


    })
}



var retrievedRestaurants = []
var modelRestaurants = ko.observableArray([]);
/**
* @description Creates ViewModel for knockout binding
*/
var ViewModel = function(){
    var self = this;


}



ko.applyBindings(new ViewModel())
