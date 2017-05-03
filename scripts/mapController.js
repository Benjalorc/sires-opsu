window.addEventListener("load", function(){
    
    
   // drawMap();
   window.drawMap = function(){
    
    var map = L.map('map').setView([10.645556, -63.038889], 9);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*
L.marker([10.645556, -63.038889]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();    
       */ 
    }
    
    
});