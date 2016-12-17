
/*  From Google Maps API Documentation */
function initMap() {

    var restaurant_list = [
        {name: 'El Paso Mexicano', location: {lat: 40.790, lng: -73.947} },
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

/*
    var marker1 = singleMarker(restaurant_list[0])
    var marker2 = singleMarker(restaurant_list[1])
    var marker3 = singleMarker(restaurant_list[2])
    var marker5 = singleMarker(restaurant_list[3])
    var marker6 = singleMarker(restaurant_list[4])
    var marker7 = singleMarker(restaurant_list[5])
    var marker8 = singleMarker(restaurant_list[6])
    var marker9 = singleMarker(restaurant_list[7])

    var contentString = '<div id="content">'+ '<div id="siteNotice">'+ '</div>'+ '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+'<div id="bodyContent">'+'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +'sandstone rock formation in the southern part of the '+'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+'south west of the nearest large town, Alice Springs; 450&#160;km '+'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+'features of the Uluru - Kata Tjuta National Park. Uluru is '+'sacred to the Pitjantjatjara and Yankunytjatjara, the '+'Aboriginal people of the area. It has many springs, waterholes, '+'rock caves and ancient paintings. Uluru is listed as a World '+'Heritage Site.</p>'+'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+'(last visited June 22, 2009).</p>'+'</div>'+'</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

   marker1.addListener('click', function() {
       infowindow.open(map, marker1);
    });

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
