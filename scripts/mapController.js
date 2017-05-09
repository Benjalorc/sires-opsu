window.addEventListener("load", function(){
    
    
window.drawMap = function(){
    
    var map = L.map('map').setView([10.645556, -63.038889], 9);
    
    L.tileLayer('', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    
//APLICAR DIVISION TERRITORIAL
    L.geoJson(countries).addTo(map);
    
    
//COLOREAR
    function getColor(d) {
        return d == "Cruz Salmeron Acosta" ? 'red' : 
        '#FFEDA0'; 
    }
    
    function style(feature) { 
        return { 
            fillColor: getColor(
            feature.properties["meso:name_local"]),
            weight: 2, 
            opacity: 1, 
            color: 'white', 
            dashArray: '3', 
            fillOpacity: 0.7 
        }; 
    }
    
    L.geoJson(countries, { style: style }).addTo(map);
    
    
    //AÑADIR POPUPS
    function popup(feature, layer) { 
        if (feature.properties && feature.properties["meso:name_local"]){ 
            layer.bindPopup('Municipio: '+feature.properties["meso:name_local"]+'<br/>Longitud: '+feature.properties["meso:mps_x"]+'<br/>Latitud: '+feature.properties["meso:mps_y"]); 
        } 
    }

    geojson = L.geoJson(countries, { 
        style: style, onEachFeature: popup 
    }).addTo(map);
    
    /*
    L.marker([10.645556, -63.038889]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();    
           */ 
}
    
    
});