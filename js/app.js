
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
        var selectedRestaurant = self.currentRestaurant();
        var restaurantMarker = selectedRestaurant.marker();

        createInfoWindow(restaurantMarker, infoWindow);
    }


    this.currentRestaurant = ko.observable( self.restaurantList[0] );

    this.filter = ko.observable();

    this.filteredList = ko.computed(function(){
        var filter = self.filter();
        if (filter == ''){
            ko.utils.arrayForEach(self.restaurantList(), function(restaurant){
                var marker = restaurant.marker();
                marker.setVisible(true);
            })
            return self.restaurantList();
        } else if (!filter){
            return self.restaurantList();

        } else if (filter) {
            infoWindow.close();

            function lowerCased(input){
                var arr = input.split(" ");
                var newArr = [];

                arr.forEach(function(word){
                    newArr.push(word.toLowerCase());
                })

                return newArr.join(" ");
            }

            filter = lowerCased(filter);

            return ko.utils.arrayFilter(self.restaurantList(),
                function(restaurant){
                    var lowerCase = lowerCased(restaurant.name());
                    var marker = restaurant.marker();
                    if (!lowerCase.startsWith(filter)){
                        marker.setVisible(false);
                    } else {
                        marker.setVisible(true);
                    }
                    return lowerCase.startsWith(filter);
                })
        }
    })
}


ko.applyBindings(new ViewModel())
