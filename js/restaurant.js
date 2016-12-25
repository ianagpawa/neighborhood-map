/**
*  Houses Restaurant object template and restaurants array.
*/


var Restaurant = function(data){
    /*
    * Creates restaurant object.  Restaurant info will be retrieved from
    *   Foursquare API.
    * @name str Name of restaurant.
    * @coordinates obj Object of restaurant latitutde and longitute
    *   coordinates. e.g. {lat: int, lng: int}.
    * @id str Restaurant Foursquare ID number.
    * @address str Restaurant street address.
    * @menu url Restaurant menu url address,directs to Foursquare menu.
    * @delivery url Seamless restaurant url.
    * @favorite str Favorite taco from restaurant.
    * @summary str Personal resview of restaurant.
    * @phone str Restaurant phone number
    */
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





var restaurants = [
    /*
    * Array of restaurant objects.  Objects will be used to retrieved info
    *   from Foursquare API
    */
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
        favorite: "Pollo Taco",
        summary: "Pretty good food."
    },

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
