window.addEventListener("load", function(){
    
    
   // drawMap();
   window.drawMap = function(){
    
    var map = L.map('map').setView([10.645556, -63.038889], 9);

L.tileLayer('http://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/scripts/mapaSucre.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.geoJson(countries).addTo(map);
/*
L.marker([10.645556, -63.038889]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();    
       */ 
       
       
       
       
    }
    
    
});