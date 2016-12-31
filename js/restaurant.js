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
    this.id = ko.observable(data.id);
    this.address = ko.observable(data.address);
    this.menu = ko.observable(data.menu);
    this.delivery = ko.observable(data.delivery);
    this.favorite = ko.observable(data.favorite);
    this.summary = ko.observable(data.summary);
    this.phone = ko.observable(data.phone);

    var labelMenu;
    if (self.menu){
        labelMenu = "See Menu";
    } else {
        labelMenu = "";
    }

    var labelDelivery;
    if (self.delivery){
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

    this.contentString = ko.observable(contentString)
}

Restaurant.prototype.addMarker = function(){
    var self = this;
    this.marker = new google.maps.Marker({
        position: this.coordinates,
        map: map,
        title: this.name,
        animation: google.maps.Animation.Drop,
        info: content
    })
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


restaurants.forEach(function(restaurant){
    createRestaurant(restaurant);
})



retrievedRestaurants.forEach(function(restaurant){
    console.log(restaurant)
})
