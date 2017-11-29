import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { tileLayer, latLng } from 'leaflet';
import { sucre } from './Sucre';
import { nueva_esparta } from './Nueva_esparta';
import { anzoategui } from './Anzoategui';
import { monagas } from './Monagas';
import { bolivar } from './Bolivar';
import { UniversidadesService} from '../../services/universidades/universidades.service';
import { CarrerasService} from '../../services/carreras/carreras.service';
import { PnevsService} from '../../services/pnevs/pnevs.service';
import { SnisService} from '../../services/snis/snis.service';
import { EstudiantesService} from '../../services/estudiantes/estudiantes.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataOrigins: any;
  map: any;
  croquis: any;
  myIcon: any;
  showMap: Boolean;
  datosMunicipios: any;
  desiredUniversity: any;
  showingUniversity: Boolean;
  showingUnivCarreers: Boolean;
  currentUniv: any;
  currentCareer: any;
  currentPaint: any;
  originalPaint: Boolean;
  counterPaint: Number;
  markersLayer: any;
  munLayers: any;
  careersOne: Boolean;
  careersTwo: Boolean;
  univs_button: any;
  univs_match: any;
  showingCareers: Boolean;
  showingSortedCareers: Boolean;
  showingSortedCareers2: Boolean;
  showingStudents: Boolean;
  careersToSort: any;
  sortedCareers: any;
  doScroll: Boolean;

  states: any;
  mapToLoad: string;
  countries: any;

  ano: any;
  options: any;

  constructor(private universidadesService: UniversidadesService, 
              private carrerasService: CarrerasService, 
              private pnevsService: PnevsService, 
              private snisService: SnisService, 
              private estudiantesService: EstudiantesService, 
              private flashMessage : FlashMessagesService) {     
  }

  ngOnInit() {
    this.dataOrigins=[2009, 2010, 2011, 2012, "actual"];
    this.countries = sucre;
    this.mapToLoad = "sucre";
    this.states=["sucre", "anzoategui", "nueva esparta", "bolivar", "monagas"];
    this.datosMunicipios = [];
    this.showingUniversity = false;
    this.showingUnivCarreers = false;
    this.currentUniv = {};
    this.currentCareer = {};
    this.currentPaint = {};
    this.ano = 1990;

    this.munLayers = new L.FeatureGroup();
    this.markersLayer = new L.FeatureGroup();

    this.doScroll = true;
    this.showMap = true;

    this.dibujarMapa();

eval("window.yo = this");
  }

descargarCapas(){

    var capas = [];
    capas.push(this.munLayers.toGeoJSON());
    capas.push(this.markersLayer.toGeoJSON());

    var i = 0;

    var myTimerVar;

    function myTimerFunction(){
      myTimerVar = setInterval(timerFunction, 5000);
    }

    function timerFunction(){
      if(i<2){

      var obj = capas[i];
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

      var a = document.createElement('a');
      a.href = 'data:' + data;
      a.download = 'capas'+i+'.geojson';
      a.innerHTML = 'download JSON';
      a.click();
      i++
    }
    else{
      clearInterval(myTimerVar);
    }
  }

  myTimerFunction();

}
  
  cambiarMapa(){

    switch(this.mapToLoad){

      case "sucre":
        this.countries = sucre;
        break;      

      case "anzoategui":
        this.countries = anzoategui;
        break;
      
      case "nueva esparta":
        this.countries = nueva_esparta;
        break;
      
      case "monagas":
        this.countries = monagas;
        break;
      
      case "bolivar":
        this.countries = bolivar;
        break;

    }
    this.dibujarMapa();
  }

  coordinates(feature, municipioBuscado){
    
    function getCoordinates(municipio, municipioBuscado) {

        console.log("Loop");
        console.log(municipio);
        return municipio["meso:name_local"] == municipioBuscado ? { lon: municipio["meso:mps_x"], lat: municipio["meso:mps_y"]} :
        {}; 
    }
    
    return getCoordinates(feature.properties, municipioBuscado);
  }

  testReset(){
    
    this.croquis.setStyle(this.firstStyle);

  }

  densityPaint(feature){


  function getColor(municipio) {

      let pintura = window["pintura"];
      console.log((pintura[municipio]/pintura.total)*100);
      if((pintura[municipio]/pintura.total)*100 < 1){return 'rgb(255, 255, 255)';}
      if((pintura[municipio]/pintura.total)*100 < 15){return 'rgb(255, 225, 100)';}
      if((pintura[municipio]/pintura.total)*100 < 30){return 'rgb(250, 195, 75)';}
      if((pintura[municipio]/pintura.total)*100 < 50){return 'rgb(240, 170, 50)';} 
      if((pintura[municipio]/pintura.total)*100 < 65){return 'rgb(195, 110, 30)';} 
      if((pintura[municipio]/pintura.total)*100 < 80){return 'rgb(150, 60, 15)';} 
      if((pintura[municipio]/pintura.total)*100 <= 100){return 'rgb(110, 5, 5)';} 
      return 'rgb(255, 255, 255)';
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

  toogleMapColors(){
    if(!this.originalPaint){
      this.croquis.setStyle(this.firstStyle);
    }
  }

  firstStyle(feature) {
    
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

    this.showMap = true;
//    if(this.map){this.map.remove();}
//    document.querySelector("#map").setAttribute("class", "panel panel-default");

    //console.log(this.countries.features[0]);
//CREAR EL MAPA

    this.map = L.map('map');

    let featuresArr = [];
    function popup(feature, layer) {
        if (feature.properties && feature.properties["meso:name_local"]){ 
            layer.bindPopup('Municipio: '+feature.properties["meso:name_local"]+'<br/>Longitud: '+feature.properties["lbl:longitude"]+'<br/>Latitud: '+feature.properties["lbl:latitude"]);
            featuresArr.push(feature);
            //console.log(feature.properties["meso:name_local"]);
            //console.log(featuresArr);
        } 
    }

    this.croquis = L.geoJSON(this.countries, {
      style: this.firstStyle, onEachFeature: popup 
    }).addTo(this.map);

    this.map.setView([ this.countries.features[0].properties["lbl:latitude"], this.countries.features[0].properties["lbl:longitude"] ], 7);
    
    this.originalPaint = true;

    //eval("window.miCroquis = this.croquis");
    this.datosMunicipios = featuresArr;
    
//    console.log(this.datosMunicipios);
//    console.log("Surprise!!!");
 //   console.log("AHORA VIENE divisionTerritorial.js completico!!!");
//    console.log(this.countries);

  }

  ocultarPanelInferior(){

    this.showingUniversity = false;
    this.showingUnivCarreers = false;
    this.showingCareers = false;
    this.showingSortedCareers = false;
    this.showingSortedCareers2 = false;
    this.showingStudents = false;
    this.careersOne = false;
    this.careersTwo = false;
  }
  
  revealUniversity(univ_code, listado){
    
    let univ = listado.find((element)=>{ return element.codigo == univ_code });
    console.log(univ);
    //if(true) return false;

    this.flashMessage.show('Cargando la universidad seleccionada en el panel inferior...', { cssClass: 'alert-success', timeout: 3000 });
    this.currentUniv = univ;
    this.showingUniversity = true;
    this.showingUnivCarreers = true;

  }

  backToCareer(){
    this.careersOne = true;
    this.careersTwo = false;
    this.showingUniversity = false;
    this.showingUnivCarreers = false;
    this.currentUniv = {};
    document.querySelector("#univs_match").setAttribute("class","");
    document.querySelector("#univs_match").innerHTML="";
  }

  goToUnivs(){
    this.careersOne = false;
    this.careersTwo = true;    
    document.querySelector("#univs_match").setAttribute("class","panel panel-default");

    let avaibleMun = Object.getOwnPropertyNames(this.univs_match);

    avaibleMun.forEach((element) =>{

      let div = document.createElement("div");
      let h4 = document.createElement("h4");
      h4.innerHTML = ""+element;
      div.appendChild(h4);

      for(let i=0, j=this.univs_match[element].length; i<j; i++){

        let univ_button = document.createElement("button");
        
        univ_button.addEventListener("click", () =>{
          this.currentUniv = this.univs_match[element][i];
          this.showingUniversity = true;
          this.showingUnivCarreers = true;
        });
        univ_button.innerHTML = ""+this.univs_match[element][i].nombre;
        div.appendChild(univ_button);

      }
      document.querySelector("#univs_match").appendChild(div);

    });

    console.log(this.univs_match);
  }
//174
//17
  revealCareer(carr_code, listadoDeUniversidades){
    let pop = document.getElementById("popupDiv");
    pop.parentNode.removeChild(pop);
    this.showingCareers = true;
    this.careersOne = true;
    this.careersTwo = false;
    this.univs_match = null;
    this.currentUniv = {};
    this.showingUniversity = false;
    this.showingUnivCarreers = false;

    console.log(carr_code);
    console.log(listadoDeUniversidades);

    this.carrerasService.getCareer(carr_code).subscribe(data =>{
      if(data.success){
    
        this.flashMessage.show('Cargando la carrera seleccionada en el panel inferior...', { cssClass: 'alert-success', timeout: 3000 });
        this.currentCareer = data.data;
        //document.querySelector("#panelInferior").scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        console.log(this.currentCareer);
        console.log(listadoDeUniversidades);

/////////////////////////////////////////////////////////

        let univ_match = [];
        for (let i = 0, j = listadoDeUniversidades.length; i<j; i++){

          if(listadoDeUniversidades[i].carreras.find(function(element){ return element.codigo == carr_code})){
            console.log("UNIV_MATCH");
            console.log(listadoDeUniversidades);
            console.log(listadoDeUniversidades[i]);
            univ_match.push(listadoDeUniversidades[i]);
          }
          else{
            console.log("NO COINCIDENCE");
          }
        }
        console.log(univ_match);


//////////////////////////////////////////////////////
        let sortedUniv = {}

        univ_match.forEach((element) =>{
    
          let munName = element.ubicacion.municipio.nombre;
    
          if(sortedUniv[munName]){
            sortedUniv[munName].push(element);
          }else{
            sortedUniv[munName]=[];
            sortedUniv[munName].push(element);
          }
    
        });

        console.log("UNIVERSIDADES SORTED");
        console.log(sortedUniv);
//////////////////////////////////////////////////////

        this.univs_match = sortedUniv;
    
        document.querySelector("#univs_match").setAttribute("class","");
        document.querySelector("#univs_match").innerHTML=""; 
      }
      else{
        this.flashMessage.show('Hubo un problema cargando la información de esta carrera. Contacte a un administrador', { cssClass: 'alert-danger', timeout: 3000 });
        this.careersOne = false;
      }
    });
  }

  drawCareers(){
    
    this.doScroll = true;
    this.toogleMapColors();
    this.ocultarPanelInferior();

    if(this.markersLayer != undefined){this.markersLayer.clearLayers();}

    this.universidadesService.getUniversitiesByState(this.countries.features[0].properties.codigo).subscribe(data =>{

      if(data.success){
        this.flashMessage.show('Cargando las carreras...', { cssClass: 'alert-success', timeout: 3000 });

//////////////////////////////////////////////////////////////////////////

        let listadoDeUniversidades = data.data;
        let avaibleList = {};

        console.log(listadoDeUniversidades);
        listadoDeUniversidades.forEach((element) =>{
          
          let munName = element.ubicacion.municipio.nombre;
          if(avaibleList[munName] && element.carreras.length > 0){
            
            for(let i = 0, j = element.carreras.length; i<j; i++){
              
              let nombreCarrera = element.carreras[i].carrera.nombre;
              let carrera = avaibleList[munName].find(function(element){return element.carrera.nombre == nombreCarrera });
              
              if(carrera == undefined){
                avaibleList[munName].push(element.carreras[i]);
                console.log("La carrera no existia y se añadio");
              }
              
              else{
                console.log("Esa carrera ya existia, no se añadio");
              }
              
            }
          }
          else{
            if(element.carreras.length > 0){
              
            avaibleList[munName] = [];
            element.carreras.forEach((element) =>{
              avaibleList[munName].push(element);
            });
            console.log(JSON.stringify(avaibleList))
              
            }
          }
        });
        
////////////////////////////////////////////////////////////////////////

        let avaibleMun = Object.getOwnPropertyNames(avaibleList);
        console.log(avaibleMun);
  
        avaibleMun.forEach((element) =>{

          let upperElement = element;
          console.log(avaibleList[upperElement].length);
          console.log(avaibleList[upperElement]);
  
          let munPos = this.datosMunicipios.findIndex(function(element){ return element.properties["meso:name_local"] == upperElement });
          console.log(munPos);
          let coord = this.coordinates(this.datosMunicipios[munPos], upperElement);
          console.log(coord);
  
          let popupDiv = document.createElement("div");
          popupDiv.setAttribute("id","popupDiv");
            let yo = this;
          for (let k = 0, l = avaibleList[upperElement].length; k<l; k++){
            let popupButton = document.createElement("button");
            popupButton.setAttribute("class", "btn btn-info carr_button");
            popupButton.setAttribute("id", avaibleList[upperElement][k].codigo);
            popupButton.innerHTML= ""+avaibleList[upperElement][k].carrera.nombre;
            console.log(avaibleList[upperElement][k]);
            popupButton.addEventListener("click", function(){
              yo.revealCareer(avaibleList[upperElement][k].codigo, listadoDeUniversidades)
            });
            let popupRow = document.createElement("div");
            popupRow.setAttribute("class","row");
            let popupCol = document.createElement("div");
            popupCol.setAttribute("class","col-xs-5")
            popupRow.appendChild(popupCol);
            popupCol.appendChild(popupButton);
            popupDiv.appendChild(popupRow);
          }
          console.log(popupDiv);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          this.myIcon = L.icon({
            iconUrl: '../../assets/icons/careerIcon128.png',
            iconSize: [32, 32]
          });

          let newPopupDiv = document.createElement("div");

          let newButton = document.createElement("button");
          newButton.setAttribute("class", "btn btn-info");
          newButton.innerHTML = "Carreras en "+element;
          newButton.addEventListener("click", () =>{
            document.getElementById("panelInferior").appendChild(popupDiv);
          })
          newPopupDiv.appendChild(newButton);

          let marker = L.marker([coord["lat"], coord["lon"]], {icon: this.myIcon}).bindPopup(newPopupDiv);
          this.markersLayer.addLayer(marker);

        });
        this.markersLayer.addTo(this.map);
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        console.log(data.msg);
        console.log(data);
      }
    });
  }

  drawUniversities(){

    this.doScroll = true;
    this.toogleMapColors();
    this.ocultarPanelInferior();

    if(this.markersLayer != undefined){this.markersLayer.clearLayers();}
    this.universidadesService.getUniversitiesByState(this.countries.features[0].properties.codigo).subscribe(data =>{

      if(data.success){
        this.flashMessage.show('Cargando las universidades...', { cssClass: 'alert-success', timeout: 3000 });

///////////////////////////////////////////////////////////////
        console.log(data.data);
        let listado=data.data;
        let avaibleList = {}
        console.log(listado);
        listado.forEach((element) =>{
          
          console.log(element);
          let munName = element.ubicacion.municipio.nombre;
          let univ = {nombre: element.nombre, codigo: element.codigo};
  
          if(avaibleList[munName]){
            avaibleList[munName].push(univ);
          }
          else{
            avaibleList[munName]=[];
            avaibleList[munName].push(univ)
          }
  
        });
        console.log(avaibleList);
        console.log(listado);

////////////////////////////////////////////////////////////////
    
        let avaibleMun = Object.getOwnPropertyNames(avaibleList);
        console.log(avaibleMun);

        avaibleMun.forEach((element) =>{

          let upperElement = element;
          console.log(avaibleList[upperElement].length);
          console.log(avaibleList[upperElement]);
  
          let munPos = this.datosMunicipios.findIndex(function(element){ return element["properties"]["meso:name_local"] == upperElement });
          console.log("EL PEO ESTA DESDE AQUI");
          console.log(munPos);
          console.log(upperElement);
          console.log(this.datosMunicipios);
          console.log("HASTA ACA");
          let coord = this.coordinates(this.datosMunicipios[munPos], upperElement);
          console.log(coord);
  
          let popupDiv = document.createElement("div");
            
          for (let k = 0, l = avaibleList[upperElement].length; k<l; k++){
            let popupButton = document.createElement("button");
            popupButton.setAttribute("class", "univ_button");
            popupButton.setAttribute("id", avaibleList[upperElement][k].codigo);
            popupButton.innerHTML= ""+avaibleList[upperElement][k].nombre;
            let yo = this;
            popupButton.addEventListener("click", function(){
              yo.revealUniversity(avaibleList[upperElement][k].codigo, listado)
            });
            popupDiv.appendChild(popupButton);
          }
          console.log(popupDiv);

///////////////////////////////////////////////////////////////////////////////////////

          this.myIcon = L.icon({
            iconUrl: '../../assets/icons/universityIcon128.png',
            iconSize: [32, 32]
          });

          let marker = L.marker([coord["lat"], coord["lon"]], {icon: this.myIcon}).bindPopup(popupDiv);
    
          this.markersLayer.addLayer(marker);

        });

        this.markersLayer.addTo(this.map);
/////////////////////////////////////////////////////////////          
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  drawSortedCareers(obj, buttonParent){
    console.log(obj);
    console.log(buttonParent);

    if(document.querySelector("#munCount")){
      let h5temp = document.querySelector("#munCount");
      h5temp.parentNode.removeChild(h5temp);
    }

    let avaible = Object.getOwnPropertyNames(obj);

    let h5 = document.createElement("h5");
    h5.innerHTML = "";
    h5.setAttribute("id","munCount");

    avaible.forEach((element) =>{

      if(element == "total"){
        console.log("Este va de ultimo, aguantate...");
      }
      else{
        h5.innerHTML +=element+": "+obj[element]+", ";
      }
    });

    h5.innerHTML +="Total: "+obj.total;
    buttonParent.appendChild(h5);

    console.log(this.croquis);
    eval("window.pintura = this.currentPaint");
    this.croquis.setStyle(this.densityPaint);
    this.originalPaint = false;

  }

  loadSortedCareers(opt){

    this.toogleMapColors();
    document.getElementById("sortedCareers3").innerHTML = "";
    if(opt == "Especialidad" || opt == "Area" || opt == "Carrera"){

      let obj = this.sortedCareers[opt];
      let avaible = Object.getOwnPropertyNames(obj);
      
      let div = document.createElement("div");
      let h4 = document.createElement("h4");
      h4.innerHTML = ""+opt;
      document.getElementById("sortedCareers3").appendChild(h4);

      let i = 0;
      avaible.forEach((element) =>{
        
        i++;
        div.setAttribute("id","boton"+i);

        let boton = document.createElement("button");
        boton.setAttribute("type", "button");
        boton.innerHTML = ""+element;
        
        boton.addEventListener("click", (event) =>{
          this.currentPaint = obj[element];
          this.drawSortedCareers(obj[element], document.getElementById("boton"+i));
        });

        div.appendChild(boton);

        document.getElementById("sortedCareers3").appendChild(div);

      });


    }
    else{
      this.flashMessage.show("Opcion invalida", { cssClass: 'alert-warning', timeout: 1000 });
    }

  }

  selectForms(opt){

    this.toogleMapColors();
    if(document.getElementById("sortedCareers3")){
      document.getElementById("sortedCareers3").innerHTML= "";
    }

    this.showingSortedCareers2 = false;
    let sortedCareers = this.sortCareers(this.careersToSort, opt);
    this.sortedCareers = sortedCareers;
    this.showingSortedCareers2 = true;
  }

 getPnevs(){

    this.doScroll = true;
    this.toogleMapColors();
    this.ocultarPanelInferior();
    if(this.markersLayer != undefined){this.markersLayer.clearLayers();}

    this.pnevsService.obtenerPnevs().subscribe(data =>{
      if(data.success){
        this.flashMessage.show("Cargando la informacion de aptitud academica", { cssClass: 'alert-success', timeout: 500 });

        this.careersToSort = data.data;
        this.showingSortedCareers = true;
        //document.querySelector("#panelInferior").scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      }
      else{
        this.flashMessage.show("No se pudo obtener la informacion de aptitudes academica", { cssClass: 'alert-danger', timeout: 500 });

        console.log("ERROR");
      }

    });

  }

  getSnis(){

    this.doScroll = true;
    this.toogleMapColors();
    this.ocultarPanelInferior();
    if(this.markersLayer != undefined){this.markersLayer.clearLayers();}

    this.snisService.obtenerSnis().subscribe(data =>{
      if(data.success){
        this.flashMessage.show("Cargando la informacion de demanda academica", { cssClass: 'alert-success', timeout: 500 });

        this.careersToSort = data.data;
        this.showingSortedCareers = true;
        //document.querySelector("#panelInferior").scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        
      }
      else{
        this.flashMessage.show("No se pudo obtener la informacion de demanda academica", { cssClass: 'alert-danger', timeout: 500 });
        console.log("ERROR");
      }

    });

  }

  sortCareers(form, opt){

    //HECHO PARA ORDENAR LOS RESULTADOS DE LAS PNEV O LOS SNI
    if(opt == "a" || opt == "b" || opt == "c"){

    let especialidadSorted = {};
    let areaSorted = {};
    let carreraSorted = {};

    form.forEach((element) =>{

          //////////
          if(especialidadSorted[element.carreras[opt].especialidad]){
            if(especialidadSorted[element.carreras[opt].especialidad][element.municipio]){
              especialidadSorted[element.carreras[opt].especialidad][element.municipio] +=1;
            }
            else{
              especialidadSorted[element.carreras[opt].especialidad][element.municipio] = 1;
            }
            especialidadSorted[element.carreras[opt].especialidad].total += 1;
          }
          else{
            especialidadSorted[element.carreras[opt].especialidad] = {};
            especialidadSorted[element.carreras[opt].especialidad].total = 1;
            especialidadSorted[element.carreras[opt].especialidad][element.municipio] = 1;

          }
          //////////

          if(areaSorted[element.carreras[opt].area]){
            if(areaSorted[element.carreras[opt].area][element.municipio]){
              areaSorted[element.carreras[opt].area][element.municipio] +=1;
            }
            else{
              areaSorted[element.carreras[opt].area][element.municipio] = 1;
            }
            areaSorted[element.carreras[opt].area].total += 1;
          }
          else{
            areaSorted[element.carreras[opt].area] = {};
            areaSorted[element.carreras[opt].area].total = 1;
            areaSorted[element.carreras[opt].area][element.municipio] = 1;

          }

          //////////
          if(carreraSorted[element.carreras[opt].nombre]){
            if(carreraSorted[element.carreras[opt].nombre][element.municipio]){
              carreraSorted[element.carreras[opt].nombre][element.municipio] +=1;
            }
            else{
              carreraSorted[element.carreras[opt].nombre][element.municipio] = 1;
            }
            carreraSorted[element.carreras[opt].nombre].total += 1;
          }
          else{
            carreraSorted[element.carreras[opt].nombre] = {};
            carreraSorted[element.carreras[opt].nombre].total = 1;
            carreraSorted[element.carreras[opt].nombre][element.municipio] = 1;
          }

          //////////
        });

      let obj = {
        Especialidad: especialidadSorted,
        Area: areaSorted,
        Carrera: carreraSorted
      };

      return obj;
    }
    else{
      this.flashMessage.show("Opcion invalida", { cssClass: 'alert-warning', timeout: 1000 });
    }
  }

  drawStudents(){

    this.estudiantesService.getStudents(this.ano, this.countries.features[0].properties.codigo).subscribe(data =>{
      if(data.success){
        this.flashMessage.show('Cargando la informacion de estudiantes...', { cssClass: 'alert-success', timeout: 3000 });

        let sortedStudents = {
          total: 0
        };
        data.data.forEach((element) =>{
          sortedStudents[element._id] = element.resultado;
          sortedStudents["total"] += element.resultado;
        });
        this.currentPaint = sortedStudents;

        window["pintura"] = this.currentPaint;


        let mun = 0;
        window["featuresArr"] = [];
        window["layersArr"] = [];
/*
        function popup(feature, layer) {
            if (feature.properties && feature.properties["meso:name_local"]){ 
                layer.bindPopup("Poblacion: "+window["pintura"][feature.properties["meso:name_local"]]);
                featuresArr.push(feature);
                layersArr.push(layer);
                //console.log(feature.properties["meso:name_local"]);
                //console.log(featuresArr);
            } 
        }
*/
        this.croquis = L.geoJSON(this.countries, {
          style: this.densityPaint, onEachFeature: this.doPopup 
        }).addTo(this.map);


        this.originalPaint = false;

      }
      else{
        this.flashMessage.show('No se pudo obtener la informacion de estudiantes...', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });


  }

  doPopup(feature, layer){

            if (feature.properties && feature.properties["meso:name_local"]){ 
                layer.bindPopup("Poblacion: "+window["pintura"][feature.properties["meso:name_local"]]);
                window["featuresArr"].push(feature);
                window["layersArr"].push(layer);
                //console.log(feature.properties["meso:name_local"]);
                //console.log(featuresArr);
            } 
  }

  getStudents(){

    this.doScroll = true;
    this.toogleMapColors();
    this.ocultarPanelInferior();
    if(this.markersLayer != undefined){this.markersLayer.clearLayers();}

    this.munLayers.eachLayer((layer) =>{
      layer.unbindPopup();
    });

    this.showingStudents = true;

  }

  scrollToLowerPanel(){
    if(this.doScroll) document.querySelector("#panelInferior").scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    this.doScroll = false;
  }

}
