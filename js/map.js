/**
* @description Creates map marker
* @param {object} restaurant Restaurant info already retrieved from
*   Foursquare
* @param {object} map Instance of Google map.
* @returns {object} marker Google Map marker
*/

function singleMarker(restaurant, map){
    /*  From Google MAP API documentation   */
    /**
    * @description Toggles bounce animation of map markers.
    */
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    var contentString = "<div class='text-center' id='content>" +
                        "<h1 id='restaurant_name' class='firstHeading'>"+
                        "<b>%RESTAURANT_NAME%</b>"+
                        "</h1>"+
                        "<div id='restaurant_info'>"+
                        "<p>%ADDRESS%</p>"+
                        "<p>%PHONE%</p>"+
                        "<p>%SUMMARY%</p>"+
                        "<p>Favorite Taco: %TACO%</p>"+
                        "<p>"+
                        "<a href='%MENU%' target='_blank'>%SEE_MENU%</a>"+
                        "</p>"+
                        "<p>"+
                        "<a href='%DELIVERY%' target='_blank'>"+
                        "%GET_DELIVERY%"+
                        "</a></p></div></div>";

    /**
    * @description Modifies contentString with restaurant info.
    * @param {string} string Content string
    * @param {string} target Substring targeted in content string
    * @param {string} replacement Modified string
    */
    function replaceContent(string, target, replacement){
        return string.replace(target, replacement);
    }

    var res_name = replaceContent(contentString, "%RESTAURANT_NAME%",
                   restaurant.name);
    var taco = replaceContent(res_name, "%TACO%", restaurant.favorite);
    var summary = replaceContent(taco, "%SUMMARY%", restaurant.summary);
    var phone;
    if (restaurant.phone){
        phone = replaceContent(summary, "%PHONE%", restaurant.phone);
    } else {
        phone = replaceContent(summary, "%PHONE%", '');
    }
    var address = replaceContent(phone, "%ADDRESS%", restaurant.address);
    var labelMenu;
    if (restaurant.menu){
        labelMenu = replaceContent(address, "%SEE_MENU%", "See Menu");
    } else {
        labelMenu = replaceContent(address, "%SEE_MENU%", "");
    }
    var menu = replaceContent(labelMenu, "%MENU%", restaurant.menu);
    var labelDelivery;
    if (restaurant.delivery){
        labelDelivery = replaceContent(menu, "%GET_DELIVERY%", "Get Delivery");
    } else {
        labelDelivery = replaceContent(menu, "%GET_DELIVERY%", "");
    }
    var delivery = replaceContent(labelDelivery, "%DELIVERY%",
                   restaurant.delivery);

   /**
   * @description Creates info window for map markers.
   * @param {string} delivery Modified content string with restaurant info
   * @param {string} restaurant.name Title for map marker
   * @returns {object} infowindow Info window for map marker
   */
    var infowindow = new google.maps.InfoWindow({
        content: delivery,
        title: restaurant.name
    });

    infowindow.addListener("closeclick", function(){
        marker.setAnimation(null);
    });

    /**
    * @description Creates map marker objects
    * @param {string} restaurant.coordinates GPS location for restaurant
    * @param {object} map Google map
    * @param {string} restaurant.name Title for map marker
    * @param {string} google.maps.Animation.DROP  Animation for map marker
    * @param {object} infowindow Info window for map marker
    * @returns {object} marker Google map marker
    */
    var marker = new google.maps.Marker({
                position: restaurant.coordinates,
                map: map,
                title: restaurant.name,
                animation: google.maps.Animation.DROP,
                info: infowindow
             });

    marker.addListener('click', toggleBounce);

    marker.addListener('click', function(){
        infowindow.open(map, marker);
     })

    return marker;
}


var map;

/**
* @description Initializes Google map on load
*/
function initMap(){
    var self = this;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.795, lng: -73.939},
        zoom: 16
    });

    /**
    * @description Highlights map marker of selected restaurant from list
    * @returns {object} marker Selected restaurant map marker will bounce
    */
    this.selectedRestaurant = ko.computed(function(){
        if (currentRes()){
            var currentRestaurantName = currentRes().name();
            createdMarkers.forEach(function(restaurant){
                restaurant.setAnimation(null);
                if (currentRestaurantName == restaurant.title){
                    restaurant.setAnimation(google.maps.Animation.BOUNCE);
                }
            })
        }
    })

    var createdMarkers = retrievedRestaurants;

    /**
    * @description Filters restaurant list and map markers
    * @returns Returns filtered list and map markers
    */
    this.markersList = ko.computed(function(){
        if (singleRestaurant.name()){
            createdMarkers.forEach(function(marker){
                if (!marker.title.startsWith(singleRestaurant.name())){
                    marker.setVisible(false);
                    (marker.info).close(map, marker)
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            })


            if (singleRestaurant.name().length < 2){
                createdMarkers.forEach(function(marker){
                    marker.setVisible(true);
                    marker.setAnimation(null);
                    (marker.info).close(map, marker);
                })
            }
        }
    })
}
