/*
var initialCats = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'https://placekitten.com/g/600/400',
        nicknames: ['Dr. StrangeHate', 'Chairman Meow']
    },
    {
        clickCount: 0,
        name: 'Monster',
        imgSrc: 'https://placekitten.com/g/600/400',
        nicknames: ['Chairman Meow', 'Catclops']
    },
    {
        clickCount: 0,
        name: 'Roger',
        imgSrc: 'https://placekitten.com/g/600/400',
        nicknames: ['Chairman Meow', 'Catclops']
    }

];

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
        coordinates: {lat: 40.790, lng: -73.947}
    },
    {
        name: 'Taco Mix',
        coordinates: {lat: 40.797, lng: -73.938}
    },
    {
        name: 'Guajillo',
        coordinates: {lat: 40.796, lng: -73.935}
    },
    {
        name: "Delicias Mexicanas",
        coordinates: {lat: 40.797, lng: -73.940}
    },
    {
        name: "Ollin",
        coordinates: {lat: 40.791, lng: -73.939}
    },
    {
        name: "Lupita's",
        coordinates: {lat: 40.790, lng: -73.943}
    },
    {
        name: "Hot Jalapeno",
        coordinates: {lat: 40.797, lng: -73.939}
    },
    {
        name: "Burritos y Mas",
        coordinates: {lat: 40.788, lng: -73.948}
    }
]

/*
var Cat = function (data){
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observable(data.nicknames);
}
*/

/* need to add grubhub */
/*  Model   */
var Restaurant = function(data){
    this.name = ko.observable(data.name);
    this.coordinates = ko.observable(data.coordinates);
};



var ViewModel = function(){

    var self = this;

    this.restaurantList = ko.observableArray([]);

    restaurants.forEach(function(restaurant){
        self.restaurantList.push( new Restaurant(restaurant))
    });


/*
    this.getCurrentRestaurant = function(clicked){
        self.currentRestaurant(clicked)
    }

    this.currentRestaurant = ko.observable( this.restaurantList()[0] );
*/
}





ko.applyBindings(new ViewModel())
