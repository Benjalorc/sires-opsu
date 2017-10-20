import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-carr',
  templateUrl: './admin-carr.component.html',
  styleUrls: ['./admin-carr.component.css']
})
export class AdminCarrComponent implements OnInit {

  mostrarFormulario: Boolean;
  codigo: String;
  nombre: String;
  titulo: String;
  especialidad: String;
  area: String;
  duracion: Number;
  modalidad: String;

  constructor(private carrerasService: CarrerasService,
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
    this.titulo = "";
    this.especialidad = "";
    this.area = "";
    this.duracion = 0;
    this.modalidad = "";
    this.toogleForm();
  }
  
  enviarFormulario(){
    
    const carrera = {
      codigo : this.codigo,
      nombre : this.nombre,
      titulo : this.titulo,
      especialidad : this.especialidad,
      area : this.area,
      duracion: this.duracion,
      modalidad: this.modalidad
    }
    
    if(this.carrerasService.validateCareer(carrera)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });
      console.log(carrera);
      this.carrerasService.registrarCarrera(carrera).subscribe(data =>{

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
