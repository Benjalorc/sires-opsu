import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { countries } from './divisionTerritorial';
import { UniversidadesService} from '../../services/universidades/universidades.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataOrigins: any;
  map: any;
  myIcon: any;
  loadedMap: Boolean;
  datosMunicipios: any;
  desiredUniversity: any;
  showingUniversity: Boolean;
  showingUnivCarreers: Boolean;
  currentUniv: any;

  constructor(private universidadesService: UniversidadesService, private flashMessage : FlashMessagesService) { 
    
  }

  ngOnInit() {
    this.dataOrigins=[2009, 2010, 2011, 2012, "actual"];
    this.loadedMap=false;
    this.datosMunicipios = [];
    this.showingUniversity = false;
    this.showingUnivCarreers = false;
    this.currentUniv = {};
  }
  
  /*
  ////////////////////////////////////////
  updateIconSize(zoomLevel){
    switch(zoomLevel){

      case 7:
        this.myIcon.iconSize = [16, 16];
        break;      
        
      case 8:
        this.myIcon.iconSize = [24, 24];
        break;      
        
      case 97:
        this.myIcon.iconSize = [32, 32];
        break;
    }
  }
  /////////////////////////////////////////
  */
  
  coordinates(feature, municipioBuscado){
    
    function getCoordinates(municipio, municipioBuscado) {

        console.log(municipio);
        return municipio["meso:name_local"] == municipioBuscado ? { lon: municipio["meso:mps_x"], lat: municipio["meso:mps_y"]} :
        {}; 
    }
    
    return getCoordinates(feature.properties, municipioBuscado);
  }
  
  style(feature) {
    
    function getColor(municipio) {
        return municipio == "Sucre" ? 'red' :
        '#FFEDA0'; 
    }
  
    return { 
      fillColor: getColor(feature.properties["meso:name_local"]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }; 
  }
  
  dibujarMapa(){

    document.querySelector("#holder").remove();
    this.map = L.map('map', {minZoom: 7, maxZoom: 9}).setView([10.645556, -63.038889], 9);

    L.tileLayer('', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //APLICAR DIVISION TERRITORIAL
    L.geoJSON(countries).addTo(this.map);
    
    L.geoJSON(countries, { style: this.style }).addTo(this.map);
    
    let featuresArr = [];
    function popup(feature, layer) {
        if (feature.properties && feature.properties["meso:name_local"]){ 
            layer.bindPopup('Municipio: '+feature.properties["meso:name_local"]+'<br/>Longitud: '+feature.properties["meso:mps_x"]+'<br/>Latitud: '+feature.properties["meso:mps_y"]);
            featuresArr.push(feature);
            console.log(feature);
            console.log(featuresArr);
        } 
    }

    L.geoJSON(countries, {
        style: this.style, onEachFeature: popup 
    }).addTo(this.map);
    
    this.loadedMap = true;
    this.datosMunicipios = featuresArr;
    console.log(JSON.stringify(this.datosMunicipios));
    console.log("Surprise!!!");
  }
  
  revealUniversity(univ_code, listado){
    
    
    let univ = listado.find((element)=>{ return element.codigo == univ_code });
    
    this.universidadesService.getUniversity(univ_code).subscribe(data =>{
      if(data.success){

        this.flashMessage.show('Cargando la universidad seleccionada en el panel inferior...', { cssClass: 'alert-info', timeout: 3000 });
        console.log(data.data);
        console.log(data);
        this.currentUniv = data.data;
        this.showingUniversity = true;
        this.showingUnivCarreers = true;
      }
      else{
        this.flashMessage.show('Hubo un problema cargando la información de esta universidad. Contacte a un administrador', { cssClass: 'alert-error', timeout: 3000 });
      }
    });
  }
  
  drawUniversities(){

    this.universidadesService.getUniversities().subscribe(data =>{

      this.flashMessage.show('Cargando las universidades...', { cssClass: 'alert-info', timeout: 3000 });
      if(data.success){

      let listado=data.data;
        var avaibleList = {}

        listado.forEach((element) =>{

          let munName = element.municipio.nombre;
          let univ = {nombre: element.nombre, codigo: element.codigo};

          if(avaibleList[munName]){
            avaibleList[munName].push(univ);
          }else{
            avaibleList[munName]=[];
            avaibleList[munName].push(univ)
          }

        });
        console.log(avaibleList);
        console.log(listado);

        this.myIcon = L.icon({
          iconUrl: '../../../../icons/universityIcon128.png',
          iconSize: [32, 32]
        });

        let avaibleMun = Object.getOwnPropertyNames(avaibleList);
        console.log(avaibleMun);

        for (let i=0, j=avaibleMun.length; i<j; i++){

          console.log(avaibleList[avaibleMun[i]].length);
          console.log(avaibleList[avaibleMun[i]]);

          let munPos = this.datosMunicipios.findIndex(function(element){ return element.properties["meso:name_local"] == avaibleMun[i] });
          console.log(munPos);
          let coord = this.coordinates(this.datosMunicipios[munPos], avaibleMun[i]);
          console.log(coord);

          let popupDiv = document.createElement("div");
          
          for (let k = 0, l = avaibleList[avaibleMun[i]].length; k<l; k++){
            let popupButton = document.createElement("button");
            popupButton.setAttribute("class", "univ_button");
            popupButton.setAttribute("id", avaibleList[avaibleMun[i]][k].codigo);
            popupButton.innerHTML= ""+avaibleList[avaibleMun[i]][k].nombre;
            let yo = this;
            popupButton.addEventListener("click", function(){
              yo.revealUniversity(avaibleList[avaibleMun[i]][k].codigo, listado)
            });
            popupDiv.appendChild(popupButton);
          }

          console.log(popupDiv);
          L.marker([coord["lat"], coord["lon"]], {icon: this.myIcon}).bindPopup(popupDiv).addTo(this.map);
          
          let univButtons = document.querySelectorAll(".univButton");
          console.log(univButtons);
        }
        /*
        let univButtons = document.querySelectorAll(".univButton");
        for (let i = 0, j = univButtons.length; i<j; i++){
          
          console.log(univButtons[i]);
          univButtons[i].addEventListener("click", function(){
            alert("HOLA HOLA");
          });
        }
        */
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
