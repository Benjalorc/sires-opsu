import { Component, OnInit } from '@angular/core';
import { LiceosService } from '../../../services/liceos/liceos.service';
import { ParroquiasService } from '../../../services/parroquias/parroquias.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Todas } from './tipos_estudio';

@Component({
  selector: 'app-admin-liceo',
  templateUrl: './admin-liceo.component.html',
  styleUrls: ['./admin-liceo.component.css']
})
export class AdminLiceoComponent implements OnInit {

  mostrarFormulario: Boolean;
  codigo: String;
  nombre: String;
  tipo: String;
  estado: string;
  municipio: string;
  parroquia: string;
  ofertas_egreso: any;

  especialidades: any;
  menciones: any;

  ubicacion: any;

  estados: any;
  municipios: any;
  parroquias: any;

  munOff: Boolean;
  parrOff: Boolean;
  
  espOff: Boolean;
  menOff: Boolean;

  tipo_educacion: string;
  mencion: string;
  especialidad: string;

  constructor(private liceosService: LiceosService,
              private parroquiasService: ParroquiasService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.mostrarFormulario = false;
    this.munOff = true;
    this.parrOff = true;

    this.espOff = true;
    this.menOff = true;

    this.tipo_educacion = "";
    this.especialidades = [];
    this.mencion = "";

    this.ofertas_egreso = [];
    
    this.ubicacion = [];
    this.parroquiasService.obtenerParroquias().subscribe(data =>{

      if(data){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.ubicacion = data.data;
          this.estados = this.ubicacion.est;
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
      }

    });
    eval("window.yo = this");
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
    this.tipo = "";
    this.parroquia = "";
    this.ofertas_egreso = [];
    this.especialidades = [];
    this.menciones = [];
    this.munOff = true;
    this.parrOff = true;
    this.espOff = true;
    this.menOff = true;
    this.toogleForm();
  }

  enableMun(){
    this.munOff = false;
    this.municipios = this.ubicacion.mun.filter((element) =>{return element.estado == this.estado });
  }

  enableParr(){
    this.parrOff = false;
    this.parroquias = this.ubicacion.parr.filter((element) =>{return element.municipio == this.municipio});
  }

  enableEsp(){
     
    this.espOff = false;
    if(this.tipo_educacion == "Media General"){
      this.especialidades = Todas.mge;
    }
    else{
      this.especialidades = Todas.mte;
    }
  }  

  enableMen(){
     
    this.menOff = false;
    switch(this.especialidad){
      case "Industrial":
        this.menciones = Todas.mtim;
      break;
      case "Agropecuaria":
        this.menciones = Todas.mtam;
      break;
      case "Comercio y Servicios Administrativos":
        this.menciones = Todas.mtcm;
      break;
      case "Promocion y Servicios para la Salud":
        this.menciones = Todas.mtsm;
      break;

      default:
        this.menciones = Todas.mgem;
    }
  }

  agregarTipoEgreso(){
    if( !this.tipo_educacion ){
      console.log("No puedes agregar si no hay tipo de educacion");
      this.flashMessage.show("No puedes agregar si no has indicado el tipo de educacion", { cssClass: 'alert-warning', timeout: 1000 });
      return false;
    }
    if( !this.especialidad ){
      console.log("No puedes agregar si no especificas una especialidad");
      this.flashMessage.show("No puedes agregar si no especificas una especialidad", { cssClass: 'alert-warning', timeout: 1000 });
      return false;
    }
    if( !this.mencion ){
      console.log("No puedes agregar si no especificas una mencion");
      this.flashMessage.show("No puedes agregar si no especificas una mencion", { cssClass: 'alert-warning', timeout: 1000 });
      return false;
    }
    if( this.ofertas_egreso.find((element) =>{return (element.educacion == this.tipo_educacion)&&(element.especialidad== this.especialidad)&&(element.mencion==this.mencion) }) ){
      console.log("Ya existia ese tipo de egreso, no te pases de listo ¬¬");
      this.flashMessage.show("No puedes repetir una mencion", { cssClass: 'alert-warning', timeout: 1000 });
    }
    else{
      this.ofertas_egreso.push({educacion: this.tipo_educacion, especialidad: this.especialidad, mencion: this.mencion});
    }
  }

  removerTipoEgreso(egr){
    this.ofertas_egreso = this.ofertas_egreso.filter((element) => {return element != egr});
  }
  
  enviarFormulario(){
    
    let menciones = [];

    this.ofertas_egreso.forEach((element) =>{

      let mencion = '';
      mencion += element.educacion+'';
      if(element.especialidad != "N/A"){
        mencion += element.especialidad;
      }
      if(element.especialidad == Todas.mte[2] || element.especialidad == Todas.mte[3]){
        mencion += 'en '+element.especialidad;       
      }
      mencion += ': Mencion '+element.mencion;

      menciones.push(mencion);

    });

    const liceo = {
      codigo : this.codigo,
      nombre : this.nombre,
      tipo : this.tipo,
      parroquia : this.parroquia,
      menciones: menciones
    }
    
    if(this.liceosService.validateLiceo(liceo)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });
      console.log(liceo);
      this.liceosService.registrarLiceo(liceo).subscribe(data =>{

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
      console.log(liceo);
    }
    
  }

}
