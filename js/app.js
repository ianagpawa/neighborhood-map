
/**
* @description Creates ViewModel for knockout binding
*/
var ViewModel = function(){
    var self = this;

    this.restaurantList = ko.observableArray([])

    restaurants.forEach(function(rest){
        var restaurant = new Restaurant(rest);
        self.restaurantList.push(restaurant);
    })

    this.getCurrentRestaurant = function(clicked){
        self.currentRestaurant(clicked);
    }

    this.currentRestaurant = ko.observable( self.restaurantList[0] );

}



ko.applyBindings(new ViewModel())
