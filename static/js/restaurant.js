/**
* @description Represents a restaurant
* @constructor
* @param {object} restaurant object with restaurant name, GPS
* coordinates, Foursquare restaurant ID, address, url link to menu,
* url link to seamless, favorite taco, personal review summary, phone
* number, and Google Maps marker.
*/
var Restaurant = function (data) {
    var self = this;

    this.res = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.favorite = ko.observable(data.favorite);
    this.summary = ko.observable(data.summary);

    this.name = ko.observable();
    this.id = ko.observable();
    this.address = ko.observable();
    this.menu = ko.observable();
    this.delivery = ko.observable();
    this.phone = ko.observable();

    this.contentString = ko.observable();
    this.marker = ko.observable();

    /**
    * @description Ajax call to retrieve restaurant info from Foursquare
    * @param {object} restaurant Restaurant object
    * @param {function} callback Callback function for handling ajax response
    *   data
    */
    function getAjax(restaurant, callback) {

        /**
        * @description Creates current date, needed for Foursquare ajax
        *   call
        * @returns {string} date Current date string
        */
        function getCurrentDate() {
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear().toString();

            /**
            * @description Adds a zero to month or day.
            */
            function addZero(n) {
                return ("0" + n).slice(-2);
            }

            day = addZero(day);
            month = addZero(month);

            return year + month + day;
        }

        /*  Builds URL string for ajax call */
        var urlStart = "https://api.foursquare.com/v2/venues/search?ll=";
        var coordinates = "40.793,-73.941";

        /**
        * @description Formats name of restaurant
        * @param {string} restaurant_name Restaurant name
        * @returns {string} Formatted restaurant name
        */
        function formatName(restaurant_name) {
            var name_array = restaurant_name.split(" ");
            return name_array.join("%20");
        }

        var restaurant_name = formatName(restaurant.res());
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
            dataType: "json",
            url: url,
            success: function (foursquare) {
                data = foursquare.response.venues[0];
                callback(data);
            },
            error: function (error) {
                alert("Something went wrong with Foursquare!");
            }
        });
    }


    getAjax(self, function (data) {
        var name = data.name;
        self.name(name);

        var id = data.id;
        self.id(id);

        var address = data.location.formattedAddress[0];
        self.address(address);

        var menu;
        var delivery;


        try {
            if (data.hasMenu) {
                menu = data.menu.url;
                self.menu(menu);

                delivery = data.delivery.url;
                self.delivery(delivery);
            }
        }
        catch (err){

        }

        var phone = data.contact.formattedPhone;
        self.phone(phone);

        if (!phone) {
            phone = "None Listed";
        }

        var summary = self.summary();

        var labelMenu;
        if (self.menu()) {
            labelMenu = "See Menu ";
        } else {
            labelMenu = "";
        }

        var labelDelivery;
        if (self.delivery()) {
            labelDelivery = "| Order Seamless!";
        } else {
            labelDelivery = "";
        }

        var contentString = "<div class='text-left' id='content'>" +
            "<div class='info-top'>" +
            "<h2 id='restaurant_name' class='firstHeading text-center'>" +
            `<b>${self.name()}</b>` +
            "</h2>" +
            "</div>" +
            "<div id='restaurant_info'>" +
            `<p><span class='bold'>Address:</span> ${self.address()}</p>` +
            `<p><span class='bold'>Phone:</span> ${phone}</p>` +
            `<p><span class='bold'>Description:</span> ${summary}</p>` +
            `<p><span class='bold'>Favorite Taco:</span> ${self.favorite()}</p>` +
            "<p class='text-center'>" +
            `<span><a href='${self.menu()}' ` +
            `target='_blank'>${labelMenu}</a>` +
            "</span> " +
            "<span>" +
            `<a href='${self.delivery()}' target='_blank'>` +
            `${labelDelivery}` +
            "</a></span></div></div>";

        self.contentString(contentString);

        self.marker(new Marker(self));
    });
};


/*
* Array of restaurant objects.  Objects will be used to retrieved info
*   from Foursquare API
*/
var restaurants = [
    {
        name: "El Paso Mexicano",
        coordinates: {lat: 40.79072812277658, lng: -73.94721890430739},
        favorite: "Fish Taco",
        summary: "My second fvorite taco place.  They got rid of the lengua " +
                "tacos but their remaining taco line up is pretty solid. " +
                "My favorite is the fish taco, which are fried, but their "+
                "carnitas, chorizo, and al pastor tacos are also pretty good." +
                "They also offer a short rib taco with watermelon pico, which " +
                "is interesting.  This place has my favorite salsa verde, pretty good guacamole too"
    },
    {
        name: "Taco Mix",
        coordinates: {lat: 40.79727935, lng: -73.938542},
        favorite: "Oreja Taco (Pig Ears)",
        summary: "Authentic tacos, but a bit inconsistent.  " +
                "Wide range of taco offerings, my favorite being the orejas. " +
                "However, they can be greasy at times.."
    },
    {
        name: "Guajillo",
        coordinates: {lat: 40.796939, lng: -73.935039},
        favorite: "Tripa Taco (Beef stomache)",
        summary: "Good tacos, but not always great.  My third choice.  Their fish " +
        "tacos are grilled, but topped with too much lettuce, making it too sloppy "+
        "of a taco.  Good salsa verde, ok hot sauce."
    },
    {
        name: "Delicias Mexicanas",
        coordinates: {lat: 40.79746301121289, lng: -73.94036497052035},
        favorite: "Lengua Tacos (Beef Tongue) and Tripa Tacos (Beef stomache)",
        summary: "Currently my favorite taco restaurant.  I love their lengua "+
        "and tripa tacos.  Their salsa verde is good, a bit too much crema "+
        "for my taste, but still good.  Their other sauces are spicy and tasty."
    },
    {
        name: "Ollin",
        coordinates: {lat: 40.791111156036116, lng: -73.93960723430115},
        favorite: "Lengua Taco",
        summary: "Pretty good food, good offerings, authentic tacos.  You get 3 tacos "+
        "per order, so you can't really mix and match."
    },

    {
        name: "Lupita's",
        coordinates: {lat: 40.79014530307375, lng: -73.942862034803},
        favorite: "Pollo Taco",
        summary: "Ok tacos, not bad."
    },
    {
        name: "Hot Jalapeno",
        coordinates: {lat: 40.7977, lng: -73.939},
        favorite: "Carne Asada Taco",
        summary: "Suprisingly decent."
    },
    {
        name: "Taqueria Guadalupe",
        coordinates: {lat: 40.79402106079923, lng: -73.94332126150972},
        favorite: "Chorizo Taco",
        summary: "Meh.  There are better places to eat better food.  " +
                "Last resort tacos."
    },
    {
        name: "L'Encanto D'Lola",
        coordinates: {lat: 40.80011594762893, lng: -73.95123701053632},
        favorite: "Chorizo Taco",
        summary: "Standard tacos.  The Carne Asada is disappointing, cooked  " +
                "on a grilltop and not over a charcoal grill.  The chicken is "+
                "prepared the same way.  Good burritos though."
    },
    {
        name: "Mojitos",
        coordinates: {lat: 40.79760392116124, lng: -73.93875764774252},
        favorite: "Camaron Taco",
        summary: "Good tacos, good sauces.  They have other offerings too, not just "+
        "Mexican food."
    }


];
