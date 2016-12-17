


/*  From Google Maps API Documentation */
function initMap() {




    var restaurant_list = [
        {name: 'El Paso Mexican', location: {lat: 40.790, lng: -73.947} },
        {name: 'Taco Mix', location: {lat: 40.797, lng: -73.938} },
        {name: 'Guajillo', location: {lat: 40.796, lng: -73.935} },
        {name: "Delicias Mexicanas", location: {lat: 40.797, lng: -73.940 }},
        {name: "Ollin", location: {lat: 40.791, lng: -73.939 }},
        {name: "Lupita's", location: {lat: 40.790, lng: -73.943 }},
        {name: "Hot Jalapeno", location: {lat: 40.797, lng: -73.939 }},
        {name: "Burritos y Mas", location: {lat: 40.788, lng: -73.948 }}
    ];


    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.793, lng: -73.946},
        zoom: 16
    });

    function singleMarker(lat_long_obj){
        var marker = new google.maps.Marker({
            position: lat_long_obj,
            map: map
        })
        return marker
    }

    var marker1 = singleMarker(restaurant_list[0]['location'])
    var marker2 = singleMarker(restaurant_list[1]['location'])
    var marker3 = singleMarker(restaurant_list[2]['location'])
    var marker5 = singleMarker(restaurant_list[3]['location'])
    var marker6 = singleMarker(restaurant_list[4]['location'])
    var marker7 = singleMarker(restaurant_list[5]['location'])
    var marker8 = singleMarker(restaurant_list[6]['location'])
    var marker9 = singleMarker(restaurant_list[7]['location'])

    /*
    var marker = new google.maps.Marker({
        position: restaurant,
        map: map
    })
    */
}

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
