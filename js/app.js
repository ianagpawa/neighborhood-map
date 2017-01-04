
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

    this.filter = ko.observable();

    this.filteredList = ko.computed(function(){
        var filter = self.filter();
        if (!filter){
            return self.restaurantList();
        } else {

            function lowerCased(input){
                var arr = input.split(" ");
                var newArr = [];

                arr.forEach(function(word){
                    newArr.push(word.toLowerCase());
                })

                return newArr.join(" ")
            }

            filter = lowerCased(filter);

            return ko.utils.arrayFilter(self.restaurantList(),
                function(restaurant){
                    var lowerCase = lowerCased(restaurant.name());
                    console.log(lowerCase.startsWith(filter))
                    return lowerCase.startsWith(filter);
                })
        }
    })
}




ko.applyBindings(new ViewModel())
