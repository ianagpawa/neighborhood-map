/*

var Cat = function (data){
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observable(data.nicknames);


    this.level = ko.computed(function(){
        var level;
        var click = this.clickCount();
        if (click <= 2){
            level = 'Newborn';
        } else if (click < 12){
            level = 'Infant';
        } else if (click < 18){
            level = 'Teen';
        } else if (click < 25){
            level = 'Youngin';
        } else if (click < 65){
            level = 'Adult';
        } else{
            level = "Viejo";
        };
        return level
    }, this);


}



var ViewModel = function(){
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push ( new Cat(catItem));
    });

    this.getCurrentCat = function(clicked){
        self.currentCat(clicked)
    }

    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementCounter = function(){
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);

    };


}

*/



var restaurants = [
    {
        name: 'El Paso Mexicano',
        coordinates: {lat: 40.79072812277658, lng: -73.94721890430739}
    },
    {
        name: 'Taco Mix',
        coordinates: {lat: 40.79727935, lng: -73.938542}
    },
    {
        name: 'Guajillo',
        coordinates: {lat: 40.796939, lng: -73.935039}
    },
    {
        name: "Delicias Mexicanas",
        coordinates: {lat: 40.79746301121289, lng: -73.94036497052035}
    },
    {
        name: "Ollin",
        coordinates: {lat: 40.791111156036116, lng: -73.93960723430115}
    },
    {
        name: "Lupita's",
        coordinates: {lat: 40.79014530307375, lng: -73.942862034803}
    },
    {
        name: "Hot Jalapeno",
        coordinates: {lat: 40.7977, lng: -73.939}
    },
    {
        name: "Burritos y Mas",
        coordinates: {lat: 40.78879863582666, lng: -73.94859841887865}
    }
];



/*  Model   */
var Restaurant = function(data){
    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
    this.id = ko.observable(data.id);
    this.address = ko.observable(data.address);
    this.menu = ko.observable(data.menu);

};


function getAjax(restaurant){

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

    function formatName(name){
        var array = name.split(" ");
        return array.join("%20")
    }

    var formattedName = formatName(restaurant.name);
    var restaurantName = query.replace("%RESTAURANT_NAME%", formattedName)

    var city = "&near=New%20York,NY"

    var limit = "&limit=1"

    var client_id = "&client_id=%CLIENT_ID%".replace("%CLIENT_ID%", CLIENT_ID)
    var client_secret = "&client_secret=%CLIENT_SECRET%".replace("%CLIENT_SECRET%", CLIENT_SECRET)

    var currentDate = getCurrentDate();
    var version = "&v=%DATE%".replace("%DATE%", currentDate)

    /*  Finied url  */
    var url = urlStart + coordinates + restaurantName + city + limit + client_id + client_secret + version


    var data = $.ajax({
        dataType: 'json',
        url: url,
        success: function(foursquare){
            var restaurantRes = foursquare.response.venues[0];

            var id = restaurantRes.id;
            restaurant.id = id;

            var address = restaurantRes.location.formattedAddress[0];
            restaurant.address = address;

            if (restaurantRes.hasMenu){
                var menu = restaurantRes.menu.url;
                restaurant.menu = menu;
            }

        }

    })
    return restaurant;
}


var ViewModel = function(){

    var self = this;

    this.restaurantList = ko.observableArray([]);

    restaurants.forEach(function(restaurant){
        var populatedRestaurant = getAjax(restaurant)
        self.restaurantList.push( new Restaurant(populatedRestaurant))
    });


/*
    this.getCurrentRestaurant = function(clicked){
        self.currentRestaurant(clicked)
    }

    this.currentRestaurant = ko.observable( this.restaurantList()[0] );
*/
}





ko.applyBindings(new ViewModel())
