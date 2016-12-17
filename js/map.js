
/*  From Google Maps API Documentation */


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.793, lng: -73.946},
        zoom: 16
    });


    function singleMarker(restaurant){
        var marker = new google.maps.Marker({
            position: restaurant['coordinates'],
            map: map,
            title: restaurant['name']
        })
        return marker
    }

    function createMarkers(restaurant_list){
        var markers = []
        for (restaurant in restaurant_list){
            markers.push(singleMarker(restaurant_list[restaurant]))
        }
        return markers
    }

    /*  restaurants (restaurant list) from app.js */
    var markers = createMarkers(restaurants)

}

/*
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.793, lng: -73.946},
        zoom: 16
    });


    function singleMarker(restaurant){
        var marker = new google.maps.Marker({
            position: restaurant['location'],
            map: map,
            title: restaurant['name']
        })
        return marker
    }

    function createMarkers(restaurant_list){
        var markers = []
        for (restaurant in restaurant_list){
            markers.push(singleMarker(restaurant_list[restaurant]))
        }
        return markers
    }

    var markers = createMarkers(restaurant_list)
}
*/
/*

    var contentString = '<div id="content">'+ '<div id="siteNotice">'+ '</div>'+ '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+'<div id="bodyContent">'+'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +'sandstone rock formation in the southern part of the '+'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+'south west of the nearest large town, Alice Springs; 450&#160;km '+'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+'features of the Uluru - Kata Tjuta National Park. Uluru is '+'sacred to the Pitjantjatjara and Yankunytjatjara, the '+'Aboriginal people of the area. It has many springs, waterholes, '+'rock caves and ancient paintings. Uluru is listed as a World '+'Heritage Site.</p>'+'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+'(last visited June 22, 2009).</p>'+'</div>'+'</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

   var thing = markers[0].addListener('click', function() {
       infowindow.open(map, markers[0]);
    });


}
*/


/* need to add grubhub */
/*
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
        'key=' + GOOGLE_MAPS_API_KEY +'&callback=initMap';
    document.body.appendChild(script);
}

loadScript();
*/
