import { Component, OnInit } from '@angular/core';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-univ',
  templateUrl: './admin-univ.component.html',
  styleUrls: ['./admin-univ.component.css']
})
export class AdminUnivComponent implements OnInit {

  mostrarFormulario: Boolean;
  codigo: String;
  nombre: String;
  municipio: String;
  capacidad: Number;
  poblacion: Number;
  carreras: any;

  constructor(private UniversidadesService: UniversidadesService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.mostrarFormulario = false;
  }
  
  toogleForm(){
    this.mostrarFormulario = (this.mostrarFormulario === true? false : true);
  }


  cargarFormulario(){
    this.toogleForm();
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
    
    if(this.UniversidadesService.validateUniversity(universidad)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });
      console.log(universidad);
      this.UniversidadesService.registrarUniversidad(universidad).subscribe(data =>{

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
      console.log(universidad);
    }
    
  }

}
