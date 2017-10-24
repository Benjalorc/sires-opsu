import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { SnisService } from '../../../services/snis/snis.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-sni',
  templateUrl: './admin-sni.component.html',
  styleUrls: ['./admin-sni.component.css']
})
export class AdminSniComponent implements OnInit {

  mostrarFormulario: Boolean;
  codigo: string;
  ano: number;
  cedula: string;
  resultados: any;
  
  clasificacion: string;
  clase: string;
  carreras: any;
  sortedCareers: any;
  carreraActual: string;

  toSetupYear: Boolean;
  toSetupCareers: Boolean;

  careersToSend: any;

  constructor(private carrerasService: CarrerasService,
              private snisService: SnisService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){
  }

  ngOnInit() {
    this.mostrarFormulario = false;
    this.resultados = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: ""
    };
    this.toSetupYear = true;
    this.toSetupCareers = true;
    this.clasificacion = "";
    this.carreras = [];
    this.carreraActual = "";

    this.careersToSend = 0;

    eval("window.yo = this");
  }
  
  pedirCarreras(){

    if(this.toSetupCareers){

      this.carrerasService.getCareers().subscribe(data =>{
        
        if(data.success){
          this.carreras = data.data;
          this.sortedCareers = this.sortCareers();
          document.querySelector("#boton1").removeAttribute("disabled");
          document.querySelector("#boton2").removeAttribute("disabled");
          console.log(this.sortedCareers);
        }
        else{
          console.log("Error consultando carreras");
        }
      });

    this.toSetupCareers = false;
    }

  }
  
  sortCareers(){
    let areaSorted = {};
    let especialidadSorted = {};
    
    this.carreras.forEach((element) =>{
      
      if(areaSorted[element.area]){
        areaSorted[element.area].push(element.nombre);
      }
      else{
        areaSorted[element.area] = [];  
        areaSorted[element.area].push(element.nombre);  
      }
      
      if(especialidadSorted[element.especialidad]){
        especialidadSorted[element.especialidad].push(element.nombre);
      }
      else{
        especialidadSorted[element.especialidad] = [];  
        especialidadSorted[element.especialidad].push(element.nombre);  
      }

    });
    
    let sortedCareers = {
      Area: areaSorted,
      Especialidad: especialidadSorted
    }
    
    return sortedCareers;
  }
  
  cargarOpcionesCarrera(){
    
    this.carreraActual = "";
    let carreras = this.sortedCareers[this.clasificacion][this.clase];
    console.log(carreras);
    
    let selectCarreras = document.querySelector("#opcionesCarreras");
    selectCarreras.innerHTML = "";
    
    let firstOption = document.createElement("option");
    firstOption.setAttribute("value","");
    firstOption.setAttribute("selected","selected");
    selectCarreras.appendChild(firstOption);
    
    carreras.forEach((element) =>{
      let opcion = document.createElement("option");
      opcion.setAttribute("value",""+element);
      opcion.innerHTML = ""+element;
      selectCarreras.appendChild(opcion);
    });
  }
  
  cargarClasificacion(opcionDom){
    
    this.carreraActual = "";
    this.clasificacion = opcionDom;
    let selectCarreras = document.querySelector("#opcionesCarreras");
    selectCarreras.innerHTML = "";

    
    console.log(this.sortedCareers);
    
    let clases = Object.getOwnPropertyNames(this.sortedCareers[opcionDom]);
    
    let selectClases = document.querySelector("#clases");
    selectClases.innerHTML = "";

    console.log(selectClases);
    
    let firstOption = document.createElement("option");
    firstOption.setAttribute("value","");
    firstOption.setAttribute("selected","selected");
    selectClases.appendChild(firstOption);

    console.log(selectClases);
    
    clases.forEach((element) =>{
      let opcion = document.createElement("option");
      opcion.setAttribute("value",""+element);
      opcion.innerHTML = ""+element;
      selectClases.appendChild(opcion);
    });

  }
  
  asignarAnos(){
    if(this.toSetupYear){
      let anoActual = new Date().getFullYear();
      let anos = document.querySelector('#ano');
      
      for (let i = 0; i<=100; i++){
        let opcion = document.createElement("option");
        opcion.setAttribute("value",""+(anoActual-i));
        opcion.innerHTML = ""+(anoActual-i);
        anos.appendChild(opcion);
      }
    }
    this.toSetupYear = false;
  }
  
  toogleForm(){
    this.mostrarFormulario = (this.mostrarFormulario === true? false : true);
  }

  cargarFormulario(){
    this.toogleForm();
  }

  enableAddButtons(){
    if(this.carreraActual != ""){
      document.querySelector("#add_a").removeAttribute("disabled");
      document.querySelector("#add_a").setAttribute("class","btn-success");
      document.querySelector("#remove_a").removeAttribute("disabled");
      document.querySelector("#remove_a").setAttribute("class","btn-danger");
    }
  }
  
  addCareer(opcion){
  if(this.carreraActual != ""){

    if(this.resultados[opcion] == ""){
      if(this.careersToSend<6) this.careersToSend++;    
    }

    this.resultados[opcion] = this.carreraActual;
    let fix = 1;
    if(this.careersToSend == 6) fix = 0;

    let charCode = String.fromCharCode(96+this.careersToSend+fix);
    let addSelector = "add_"+charCode;
    let removeSelector = "remove_"+charCode;

    document.getElementById(addSelector).setAttribute("class","btn-success");
    document.getElementById(removeSelector).setAttribute("class","btn-danger");
    document.getElementById(addSelector).removeAttribute("disabled");
    document.getElementById(removeSelector).removeAttribute("disabled");

    if(this.resultados.a != "" && this.resultados.b != "" && this.resultados.c != ""){
      document.querySelector("#reg").removeAttribute("disabled");
    }
  }
  else{
    this.flashMessage.show('Seleccione primero alguna carrera de la lista', { cssClass: 'alert-danger', timeout: 1000 });
  }
  }

  clearCareer(opcion){

    let canReduce = false;
    let emptyOption = false;
    let careersFull = false;

    if(this.careersToSend == 6){ careersFull = true}
    if(this.careersToSend > 0){ canReduce = true }
    if(this.resultados[opcion] == ""){ emptyOption = true; };

    this.resultados[opcion] = "";
    console.log(this.resultados);
  
    let lista = opcion.charCodeAt(0)-96;
    let fix = 0;

    if(careersFull) fix = 1;

    for(let i = 0, j = this.careersToSend-lista; i <= j; i++){

      console.log("aqui voooy");
      let letra = String.fromCharCode(96+lista+i);
      console.log("letra: "+letra)
      let siguiente = String.fromCharCode(96+lista+i+1-fix);
      console.log("siguiente: "+siguiente);


      console.log(this.resultados[""+letra]);
      console.log(this.resultados[""+siguiente]);

      this.resultados[""+letra]=this.resultados[""+siguiente];
     
      console.log(this.resultados[""+letra]);
      console.log(this.resultados[""+siguiente]);

    }

    if(!careersFull && !emptyOption){

      let charCode = String.fromCharCode(96+this.careersToSend+1);
      let addSelector = "add_"+charCode;
      let removeSelector = "remove_"+charCode;

      document.getElementById(addSelector).removeAttribute("class");
      document.getElementById(removeSelector).removeAttribute("class");
      document.getElementById(addSelector).setAttribute("disabled","true");
      document.getElementById(removeSelector).setAttribute("disabled","true");

    }


    if(this.resultados.a == "" || this.resultados.b == "" || this.resultados.c == ""){
      document.querySelector("#reg").setAttribute("disabled","true");
    }

    if(canReduce && !emptyOption) this.careersToSend--;
    
  }
  
  quitarFormulario(){
    this.codigo = "";
    this.ano = 0;
    this.cedula = "";
    this.resultados = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: ""
    };
    this.toogleForm();
    this.toSetupYear = true;
    this.toSetupCareers = true;
    this.careersToSend = 0;
  }
 
  enviarFormulario(){

    if(this.resultados.d == ""){
      this.resultados.d = this.resultados.c;
    }
    if(this.resultados.e == ""){
      this.resultados.e = this.resultados.d;
    }
    if(this.resultados.f == ""){
      this.resultados.f = this.resultados.e;
    }

  
    let a = this.carreras.find((element) =>{return element.nombre == this.resultados.a });
    let b = this.carreras.find((element) =>{return element.nombre == this.resultados.b });
    let c = this.carreras.find((element) =>{return element.nombre == this.resultados.c });
    let d = this.carreras.find((element) =>{return element.nombre == this.resultados.d });
    let e = this.carreras.find((element) =>{return element.nombre == this.resultados.e });
    let f = this.carreras.find((element) =>{return element.nombre == this.resultados.f });



    let opciones = {
      a: a.codigo,
      b: b.codigo,
      c: c.codigo,
      d: d.codigo,
      e: e.codigo,
      f: f.codigo
    }

    console.log(opciones);

    const sni = {
      codigo : this.codigo,
      ano : this.ano,
      estudiante : this.cedula,
      opciones : opciones
    }

    console.log(sni);
    

    if(this.snisService.validateSni(sni)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });

      this.snisService.registrarSni(sni).subscribe(data =>{

        if(data.success){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.quitarFormulario();
        }
        else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
        }
      });
    }
    else{
      this.flashMessage.show('Rellene todos los campos', { cssClass: 'alert-danger', timeout: 1000 });
    }


  }

}
