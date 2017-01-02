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

var thing = ko.observable(new Restaurant(restaurants[0]))
console.log(thing().name())
