import { Component, OnInit } from '@angular/core';
import { MunicipiosService } from '../../../services/municipios/municipios.service';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-univ',
  templateUrl: './admin-univ.component.html',
  styleUrls: ['./admin-univ.component.css']
})
export class AdminUnivComponent implements OnInit {

  listadoMunicipios: Object;
  mostrarFormulario: Boolean;
  codigo: String;
  nombre: String;
  municipio: String;
  capacidad: Number;
  poblacion: Number;
  carreras: any;

  constructor(private municipios: MunicipiosService,
              private universidades: UniversidadesService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.listadoMunicipios = {};
    this.mostrarFormulario = false;
  }
  
  toogleForm(){
    if(this.mostrarFormulario){
      this.mostrarFormulario = false;
    }
    else{
      this.mostrarFormulario = true;
    }
  }

  cargarMunicipios(){

    this.municipios.obtenerMunicipios().subscribe(data =>{
      if(data.success){
        this.flashMessage.show('Se cargaron con exito los municipios', { cssClass: 'alert-success', timeout: 1000 });
        this.listadoMunicipios = data;
        console.log(this.listadoMunicipios);

            if(this.listadoMunicipios["data"]){
  
              let formMunicipio = document.querySelector("#municipio");
              for (let i = 0,  j = this.listadoMunicipios["data"].length; i<j; i++){
                let opcion = document.createElement("option");
                opcion.setAttribute("value", this.listadoMunicipios["data"][i].codigo);
                opcion.innerHTML=this.listadoMunicipios["data"][i].nombre;
                formMunicipio.appendChild(opcion);
              }
            }
            else{
              console.log("Error anadiendo los municipios");
            }

      }
      else{
        this.flashMessage.show('No se pudieron cargar los municipios', { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
  }

  cargarFormulario(){
    this.toogleForm();
    this.cargarMunicipios()
    
  }
  
  quitarFormulario(){
    this.codigo = "";
    this.nombre = "";
    this.municipio = "";
    this.capacidad = 0;
    this.poblacion = 0;
    this.toogleForm();
  }
  
  enviarFormulario(){
    
    const universidad = {
      codigo : this.codigo,
      nombre : this.nombre,
      municipio : this.municipio,
      capacidad : this.capacidad,
      poblacion : this.poblacion
    }
    
    if(this.universidades.validateUniversity(universidad)){
      console.log("TODO LLENO");
      console.log(universidad);
    }
    else{
      console.log("FALTAN DATOS");
      console.log(universidad);
    }
    
  }

}
