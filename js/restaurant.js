var map;
var infoWindow;
var newMarker;


/**
* @description Represents a restaurant
* @constructor
* @param {object} restaurant object with restaurant name, GPS
* coordinates, Foursquare restaurant ID, address, url link to menu,
* url link to seamless, favorite taco, personal review summary, and phone
*number.
*/

var Restaurant = function(data){
    var self = this;
    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.favorite = ko.observable(data.favorite);
    this.summary = ko.observable(data.summary);

    this.id = ko.observable();
    this.address = ko.observable();
    this.menu = ko.observable();
    this.delivery = ko.observable();
    this.favorite = ko.observable();
    this.summary = ko.observable();
    this.phone = ko.observable();

    var labelMenu;
    if (self.menu()){
        labelMenu = "See Menu";
    } else {
        labelMenu = "";
    }

    var labelDelivery;
    if (self.delivery()){
        labelDelivery = "Get Delivery";
    } else {
        labelDelivery = "";
    }

    var contentString = "<div class='text-center' id='content>" +
                        "<h1 id='restaurant_name' class='firstHeading'>"+
                        `<b>${self.name}</b>`+
                        "</h1>"+
                        "<div id='restaurant_info'>"+
                        `<p>${self.address}</p>`+
                        `<p>${self.phone}</p>`+
                        `<p>${self.summary}</p>`+
                        `<p>Favorite Taco: ${self.taco}</p>`+
                        "<p>"+
                        `<a href='${self.menu}' target='_blank'>${labelMenu}</a>`+
                        "</p>"+
                        "<p>"+
                        `<a href='${self.delivery}' target='_blank'>`+
                        `${labelDelivery}`+
                        "</a></p></div></div>";

    this.contentString = ko.observable(contentString);

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
            var name_array = restaurant_name().split(" ");
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


    getAjax(self.name, function(data){
        var id = data.id;
        self.id(id);

        var address = data.location.formattedAddress[0];
        self.address(address);

        if (data.hasMenu){
            menu = data.menu.url;
            self.menu(menu);

            delivery = data.delivery.url;
            self.delivery(delivery);
        }

        var phone = data.contact.formattedPhone;
        self.phone(phone);
    })

/*
    this.id = ko.observable();
    this.address = ko.observable();
    this.menu = ko.observable();
    this.delivery = ko.observable();
    this.phone = ko.observable();
    */


}



/*
* Array of restaurant objects.  Objects will be used to retrieved info
*   from Foursquare API
*/
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
        favorite: "Lengua Taco",
        summary: "Pretty good food, good offerings, authentic tacos."
    },

    {
        name: "Lupita's",
        coordinates: {lat: 40.79014530307375, lng: -73.942862034803},
        favorite: 'Pollo Taco',
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

var testing = ko.observableArray([])

/*
restaurants.forEach(function(restaurant){
    var newRes = new Restaurant(restaurant);
    testing.push(newRes);
})
*/

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

    newMarker = new google.maps.Marker();

    self.markers = [];

    restaurants.forEach(function(rest){
        var test = new newMarker({
            position: rest.coordinates,
            map: map,
            title: rest.name,
            animation: google.maps.Animation.DROP
        })
        self.markers.push(test)
    })



    console.log('here');
    console.log(self.markers)

}
