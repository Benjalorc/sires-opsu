import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { PnevsService } from '../../../services/pnevs/pnevs.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-pnev',
  templateUrl: './admin-pnev.component.html',
  styleUrls: ['./admin-pnev.component.css']
})
export class AdminPnevComponent implements OnInit {

  mostrarFormulario: Boolean;
  codigo: string;
  ano: number;
  estudiante: string;
  resultados: any;
  
  clasificacion: string;
  clase: string;
  carreras: any;
  sortedCareers: any;
  carreraActual: string;

  toSetupYear: Boolean;
  toSetupCareers: Boolean;

  constructor(private carrerasService: CarrerasService,
              private pnevsService: PnevsService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.mostrarFormulario = false;
    this.resultados = {
      a: "",
      b: "",
      c: ""
    };
    this.toSetupYear = true;
    this.toSetupCareers = true;
    this.clasificacion = "";
    this.carreras = [];
    this.carreraActual = "";
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
      
      for (let i = 100; i>5; i--){
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
  
  addCareer(opcion){
    this.resultados[opcion] = this.carreraActual;
  }
  clearCareer(opcion){
    this.resultados[opcion] = "";
  }
  
  quitarFormulario(){
    this.codigo = "";
    this.ano = 0;
    this.estudiante = "";
    this.resultados = {
      a: "",
      b: "",
      c: ""
    };
    this.toogleForm();
    this.toSetupYear = true;
  }
 
  enviarFormulario(){
  
    let resultados = {
      a: (this.carreras((element) =>{return element.nombre == this.resultados.a })).codigo,
      b: (this.carreras((element) =>{return element.nombre == this.resultados.b })).codigo,
      c: (this.carreras((element) =>{return element.nombre == this.resultados.c })).codigo
    }

    const pnev = {
      codigo : this.codigo,
      ano : this.ano,
      estudiante : this.estudiante,
      resultados : this.resultados
    }
    
    if(this.pnevsService.validatePnev(pnev)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });

      this.pnevsService.registrarPnev(pnev).subscribe(data =>{

        if(data.success){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
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
