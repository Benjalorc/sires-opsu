import { Component, OnInit } from '@angular/core';
import { UniversidadesService } from '../../../../services/universidades/universidades.service';
import { ParroquiasService } from '../../../../services/parroquias/parroquias.service';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
 

  universidades: any;
  universidad: any;

  carreras: any;
  carrera: any;

  universidadActual: any;
  carreraActual: any;


//CODIGOS
  estado: string;
  municipio: string;
//ARREGLOS
  estados: any;
  municipios: any;
//
  ubicacion: any;
//CONTROLES
  munOff: boolean;
  univOff: boolean;
  carrOff: boolean;
  periodoOff: boolean;
  ofertaOff: boolean;
  mostrarGrilla: boolean;

  oferta: any;
  inscritos: any;

  ofertasSesion: any;
  historial: any;

  anios: any;
  periodo: any;
  ano: any;

  constructor(private universidadesService: UniversidadesService,
              private parroquiasService: ParroquiasService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {

    if(window.localStorage.estadoSesion){

      let sesion = JSON.parse(window.localStorage.getItem("estadoSesion"));

      this.ubicacion = sesion.ubicacion;
      this.estados = sesion.estados;
      this.estado = sesion.estado;

      this.municipios = sesion.municipios;
      this.municipio = sesion.municipio;
      this.munOff = sesion.munOff;

      this.universidades = sesion.universidades;
      this.universidad = sesion.universidad;
      this.univOff = sesion.univOff;

      this.carreras = sesion.carreras;
      this.carrera = sesion.carrera;
      this.carrOff = sesion.carrOff;
      

      this.anios = sesion.anios;
      this.periodoOff = sesion.periodoOff;
      this.ano = sesion.ano;      
      this.periodo = sesion.periodo;


      this.oferta = sesion.oferta;
      this.ofertaOff = sesion.ofertaOff;

      this.historial = JSON.parse(window.localStorage.getItem("historialSesion"));
      this.ofertasSesion = JSON.parse(window.localStorage.getItem("ofertasSesion"));

      this.universidadActual = sesion.universidadActual;
      this.carreraActual = sesion.carreraActual;
      
      this.mostrarGrilla = sesion.mostrarGrilla;


    }else{

      this.munOff = true;
      this.univOff = true;
      this.carrOff = true;
      this.periodoOff = true;
      this.ofertaOff = true;

      this.mostrarGrilla = false;
      this.ofertasSesion = [];

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


    }



  
    eval("window.yo = this");

  }

  enableMun(){
    this.munOff = true;
    this.munOff = false;
    this.municipios = this.ubicacion.mun.filter((element) =>{return element.estado == this.estado });
    this.universidades = [];
    this.carreras = [];
            this.univOff = true;
            this.universidad = "";
            this.carreras = [];
            this.carrOff=true;
            this.carrera = "";
            this.periodoOff=true;
            this.periodo = "";
            this.ano = 0;
            this.ofertaOff = true;
            this.oferta = 0;
            this.mostrarGrilla = false;

  }

  obtenerUniversidades(){
    this.universidadesService.getUniversitiesByMun(this.municipio).subscribe(data =>{

      if(data){
  
          if(data.data.length){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
            this.universidades = data.data;
            this.univOff=false;
          }
          else{
            this.flashMessage.show("Disculpe, en ese municipio no se encuentran universidades registradas", { cssClass: 'alert-danger', timeout: 1000 });
            this.universidades = [];
            this.univOff=true;
          }
            this.universidad = "";
            this.carreras = [];
            this.carrOff=true;
            this.carrera = "";
            this.periodoOff=true;
            this.periodo = "";
            this.ano = 0;
            this.ofertaOff = true;
            this.oferta = 0;
            this.mostrarGrilla = false;
  
      }
      else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
      }

    });
  }

  enableCarr(){
    let univ = this.universidades.find((element) =>{return element.codigo == this.universidad});
    if(univ.carreras[0].carrera != undefined){
      this.carrOff = false;
      this.carreras = univ.carreras;
    }else{
      this.flashMessage.show("Disculpe, actualmente esta sede no cuenta con carreras asociadas", { cssClass: 'alert-danger', timeout: 2000 });      
      this.carrOff = true;
    }

    this.carrera = "";
    this.periodoOff=true;
    this.periodo = "";
    this.ano = 0;
    this.ofertaOff = true;
    this.oferta = 0
    this.mostrarGrilla = false;
  }  

  enablePeriodo(){

    this.historial = [];

    this.universidadesService.obtenerHistorialOfertas(this.universidad, this.carrera, 2014, 1).subscribe(data =>{

      if(data.success){
        //MOSTRAR EL HISTORIAL
        this.historial = data.data;
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });
//        this.historial.push(data.data);
        this.mostrarGrilla = true;
      }
      else{
        //OFRECER CREAR NUEVO  
        this.flashMessage.show("No se encontraron registros anteriores para la carrera y universidad indicadas", { cssClass: 'alert-warning', timeout: 3000 });
        this.historial = [];
        this.mostrarGrilla = true;
      }

    });

    this.anios = [];
    for(let i = new Date().getFullYear(), j = i-10; i>j; i--){
      this.anios.push(i);
    }
    this.periodoOff = false;
    this.ofertaOff = false;
    this.oferta = 0
  }

  calcularTitulo(){

    this.universidadActual = this.universidades.find((element) =>{return element.codigo == this.universidad});
    this.carreraActual = this.carreras.find((element) =>{return element.carrera.codigo == this.carrera});

  }

  ordenarHistorial(){

    let orden = this.historial.sort((a, b) =>{return a.periodo-b.periodo });
    let orden2 = orden.sort((a, b) =>{return b.ano-a.ano});
    this.historial = orden2;

  }

  insertar(){

    //VERIFICAR SI NO SE ESTA REPITIENDO
    if( this.historial.find((element) =>{
         return (element.universidad == this.universidad) 
             && (element.periodo == this.periodo) 
             && (element.ano == this.ano) 
             && (element.carrera == this.carrera) 
           }) 
      ){
        
        this.flashMessage.show("Ya insertó un registro para la misma carrera y universidad en el mismo periodo. Puede actualizarlo si desea", { cssClass: 'alert-warning', timeout: 3000 });
    }
    else{

      //CREAR EL OBJETO OFERTA
      let oferta = {
        universidad: this.universidad,
        periodo: this.periodo,
        ano: parseInt(this.ano),
        carrera: this.carrera,
        cupos: this.oferta
      }
      

      //VALIDAR EL OBJETO OFERTA
      if(!this.universidadesService.validarOferta(oferta)){
        this.flashMessage.show("Algunos datos son inválidos. Verifique por favor", { cssClass: 'alert-danger', timeout: 3000 });
      }
      else{

        //SI SE VALIDO CORRECTAMENTE, AGREGAR LA OFERTA A LA BASE DE DATOS
        this.universidadesService.cargarOferta(oferta).subscribe(data =>{

          if(data.success){

            this.flashMessage.show(data.msg, { cssClass: 'alert-warning', timeout: 3000 });

            //SI SE GUARDO CON EXITO, AGREGAR AL ARREGLO PARA QUE SE MUESTRE EN LA GRILLA
            this.historial.push(oferta);
            this.ofertasSesion.push(oferta);

            this.ordenarHistorial();

            this.guardarEstadoSesion();
          }
          else{

            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          }
        });

      }

    }

  }

   modificar(){

    if( !this.ofertasSesion.find((element) =>{
         return (element.universidad == this.universidad) 
             && (element.periodo == this.periodo) 
             && (element.ano == this.ano) 
             && (element.carrera == this.carrera) 
           }) 
      ){
        
        this.flashMessage.show("No se puede completar, la oferta que intenta modificar no fue creada durante esta sesion.", { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{

      let oferta = {
        universidad: this.universidad,
        periodo: this.periodo,
        ano: parseInt(this.ano),
        carrera: this.carrera,
        cupos: this.oferta
      }


      if(!this.universidadesService.validarOferta(oferta)){
        this.flashMessage.show("Algunos datos son inválidos. Verifique por favor", { cssClass: 'alert-danger', timeout: 3000 });
      }
      else{

        //SI SE VALIDO CORRECTAMENTE, AGREGAR LA OFERTA A LA BASE DE DATOS
        this.universidadesService.actualizarOfertaUniversidad(oferta).subscribe(data =>{

          if(data.success){

            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });


            let index1 = this.ofertasSesion.findIndex((element) =>{ 
                               return (element.universidad == this.universidad) 
                                   && (element.periodo == this.periodo) 
                                   && (element.ano == this.ano) 
                                   && (element.carrera == this.carrera) 
                               });

            console.log(index1);
            console.log(this.ofertasSesion);

            this.ofertasSesion[index1] = oferta;

            this.ordenarHistorial();

            this.guardarEstadoSesion();
          }
          else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      }
    }
  }

  eliminar(){

  }

  guardarEstadoSesion(){

            //GUARDAR LA INFORMACION EN LOCALSTORAGE
            //POR SI ACASO SE CIERRA EL NAVEGADOR DE MANERA
            //INESPERADA. ESTO CON EL FIN DE CARGAR EL ÚLTIMO
            //ESTADO DE ESTA PANTALLA HACER QUE PUEDA
            //MODIFICARSE LA OFERTA SIEMPRE Y CUANDO NO
            //SE HAYA SALIDO DE LA PANTALLA
            window.localStorage.ofertasSesion = JSON.stringify(this.ofertasSesion);
            window.localStorage.historialSesion = JSON.stringify(this.historial);

            let estadoSesion = {
              oferta: this.oferta,
              munOff: this.munOff,
              univOff: this.univOff,
              carrOff: this.carrOff,
              periodoOff: this.periodoOff,
              ofertaOff: this.ofertaOff,
              universidadActual: this.universidadActual,
              carreraActual: this.carreraActual,
              mostrarGrilla: this.mostrarGrilla,
              ubicacion: this.ubicacion,
              estados: this.estados,
              estado: this.estado,
              municipios: this.municipios,
              municipio: this.municipio,
              universidades: this.universidades,
              universidad: this.universidad,
              carreras: this.carreras,
              carrera: this.carrera,
              anios: this.anios,
              ano: this.ano,
              periodo: this.periodo
            }

            window.localStorage.estadoSesion = JSON.stringify(estadoSesion);

  }

  limpiarSesion(){

    window.localStorage.removeItem("estadoSesion");
    window.localStorage.removeItem("historialSesion");
    window.localStorage.removeItem("ofertasSesion");

  }


  initChart(){
    if(document.querySelector("#myCanvas")){ 
      document.querySelector("#myCanvas").parentNode.removeChild(document.querySelector("#myCanvas")); 
    }

    let canvas = document.createElement("canvas");
    canvas.setAttribute("id","myCanvas");
    document.querySelector("#indicadores").appendChild(canvas);

    return canvas.getContext('2d');

  }


}
