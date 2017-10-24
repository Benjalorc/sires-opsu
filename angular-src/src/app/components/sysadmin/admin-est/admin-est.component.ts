import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../../services/estudiantes/estudiantes.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-est',
  templateUrl: './admin-est.component.html',
  styleUrls: ['./admin-est.component.css']
})
export class AdminEstComponent implements OnInit {

  mostrarFormulario: Boolean;
  cedula: string;
  nombre: string;
  apellido: string;
  ano: any;
  mes: any;
  dia: any;
  f_nac: Object;
  sexo: string;
  municipio: string;
  
  toSetupYear: Boolean;
  
  constructor(private estudiantesService: EstudiantesService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.mostrarFormulario = false;
    this.toSetupYear = true;
  }
  
  toogleForm(){
    this.mostrarFormulario = (this.mostrarFormulario === true? false : true);
  }

  cargarFormulario(){
    this.toogleForm();
  }
  
  quitarFormulario(){
    this.cedula = "";
    this.nombre = "";
    this.apellido = "";
    this.sexo = "";
    this.ano = "";
    this.mes = "";
    this.dia = "";
    this.f_nac = {};
    this.municipio = "";
    this.toogleForm();
    this.toSetupYear = true;
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
  
  asignarDias() {
    
    if(this.mes == undefined || this.mes == "" || this.ano == undefined || this.ano == "") return;
    
    let dia = document.querySelector("#dia")
    dia.innerHTML = "";
  
    let dias = 0;
    
    if(this.mes == "4" || this.mes == "6" || this.mes == "9" || this.mes == "11"){
      dias = 30;
    }
    
    if(this.mes == "1" || this.mes == "3" || this.mes == "5" || this.mes == "7" || this.mes == "8" || this.mes == "10" || this.mes == "12"){
      dias = 31;
    }
    
    if(this.mes == "2"){
       if ((((this.ano%100)!=0)&&((this.ano%4)==0))||((this.ano%400)==0)){
         dias = 29;
       }
       else{
         dias = 28;
       }
    }
    
    let firstOption = document.createElement("option");
    firstOption.setAttribute("value","");
    firstOption.setAttribute("selected","selected");
    dia.appendChild(firstOption);
    
    for (let i = 1; i<=dias; i++){
      let opcion = document.createElement("option");
      opcion.setAttribute("value",""+i);
      opcion.innerHTML = ""+i;
      dia.appendChild(opcion);
    }
    
  }
  
  enviarFormulario(){
  
    this.f_nac = new Date(this.ano, this.mes, this.dia, 0, 0, 0, 0);
    
    const estudiante = {
      cedula : this.cedula,
      nombre : this.nombre,
      apellido : this.apellido,
      f_nac : this.f_nac,
      sexo : this.sexo,
      municipio: this.municipio,
      
    }
    
    if(this.estudiantesService.validateStudent(estudiante)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });

      this.estudiantesService.registrarEstudiante(estudiante).subscribe(data =>{

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
