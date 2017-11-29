import { Component, OnInit, ViewChild } from '@angular/core';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { ParroquiasService } from '../../../services/parroquias/parroquias.service';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { SnisService } from '../../../services/snis/snis.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Chart from 'chart.js';

@Component({
  selector: 'app-admin-oferta-univ',
  templateUrl: './admin-oferta-univ.component.html',
  styleUrls: ['./admin-oferta-univ.component.css']
})
export class AdminOfertaUnivComponent implements OnInit {

  graficaActiva: Boolean;
  activeChart: any;
  mostrarGrafica: Boolean;
  mostrarUnivs: Boolean;
  encontroUniversidad: Boolean;
  mostrarPrincipal: Boolean;

  universidadActiva: Boolean;

  eligiendoCarreras: Boolean;
  agregandoCarreras: Boolean;
  addCarrOff: Boolean;
  seleccionandoUnivs: Boolean;
  viendoCarrerasDisponibles: Boolean;

  grafOff: Boolean;

  dangerRange: any;
  warningRange: any;
  successRange: any;

  etiqueta: any;
  recibido: any;
  esperando: any;

  mostrarFormulario: Boolean;

  mostrarRegistrar: Boolean;
  mostrarCargarCarreras: Boolean;
  mostrarActualizar: Boolean;
  mostrarEliminar: Boolean;
  mostrarElegir: Boolean;
  mostrarUniversidad: Boolean;

  isCodesearchCollapsed: Boolean;
  isListsearchCollapsed: Boolean;

  preguntarCarreras: Boolean;

  preguntarModificacion: Boolean;

  codigo: string;
  nombre: string;
  siglas: string;
  parroquia: string;
  municipio: string;
  capacidad: number;
  matricula: number
  gestion: string;
  servicios: any;

  carreras: any;
  carrerasDisponibles: any;

  estado: string;
  actualMun: any;

  ubicacion: any;
  editUniv: Boolean;


  estados: any;
  municipios: any;
  parroquias: any;

  estOff: Boolean;
  munOff: Boolean;
  parrOff: Boolean;
  univOff: Boolean;

  clasificaciones: any;
  clasificacion: any;
  sortedCareers: any;

  clase: string;

  opcionesCarrera: any;
  opcionesUniversidad: any;

  listadoCarreras: any;
  listadoUniversidades: any;

  universidadActual: any;

  universidades: any;

  carreraActual: any;
  sinCarrera: Boolean;

  areas: any;
  area_carr: string;

  especialidades: any;
  especialidad_carr: string;

  espOff: Boolean;
  carrOff: Boolean;


  matrOff : Boolean;
  codOff : Boolean;
  actualizandoUniv : Boolean;

  ano: number;
  periodo: number;

  duracion_carr_1: number;
  duracion_carr_2: number;
  titulo_carr_1: string;
  titulo_carr_2: string;
  codigo_int: string;
  modalidad_carr: string;

  nombre_carr: string;

  especialidadCargada: Boolean;
  hasCareers: Boolean;

  mensajeImportante: string;
  mensajero: HTMLElement;

  anoActual: number;
  anos: any;
  ofertasOff: Boolean;
  anoOff: Boolean;
  carreraSeleccionada: Boolean;
  periodoOff: Boolean;
  viendoHistorialCarrera: Boolean;

  ofertasCarreraActual: any;
  viendoOfertasCarrera: Boolean;

  cant_ofertas: number;
  cargarOfertaOff: Boolean;

  constructor(private universidadesService: UniversidadesService,
              private parroquiasService: ParroquiasService,
              private carrerasService: CarrerasService,
              private snisService: SnisService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

   ngOnInit() {

   	this.ano = 0;
   	this.anoActual = (new Date().getFullYear())
   	this.anos = [];
   	this.periodo = 0;
   	this.anoOff = true;
   	this.ofertasOff = true;
	  this.carreraSeleccionada = false;
	  this.periodoOff = true;
    this.viendoHistorialCarrera = false;
    this.ofertasCarreraActual = [];
    this.viendoOfertasCarrera = false;
    this.cargarOfertaOff = true;

    this.dangerRange = 30;
    this.warningRange = 60;
    this.successRange = 90;

    this.etiqueta = "";
    this.mostrarPrincipal = true;
    this.mostrarGrafica = false;
    this.mostrarUnivs = false;
    this.agregandoCarreras = false;
    this.eligiendoCarreras = false;
    this.seleccionandoUnivs = false;
    this.viendoCarrerasDisponibles = false;
    this.especialidadCargada = false;
    this.universidadActiva = false;

    this.nombre_carr = "";
    this.carreraActual = {};
    this.sinCarrera = true;

    this.addCarrOff = true
    this.carrOff = true;

    this.grafOff = true;

    this.matrOff = false;
    this.codOff = false;
    this.actualizandoUniv = false;
    
    this.duracion_carr_1 = 0;
    this.duracion_carr_2 = 0;
    this.titulo_carr_1 = "";
    this.titulo_carr_2 = "";

    this.codigo = "";
    this.siglas = "";
    this.nombre = "";
    this.parroquia = "";
    this.capacidad = 0;
    this.matricula = 0;
    this.gestion = "Publicas";
    this.servicios = [];

    this.mostrarFormulario = false;
    this.mostrarRegistrar = false;
    this.mostrarCargarCarreras = false;
    this.preguntarCarreras = false;
    this.preguntarModificacion = false;

    this.universidades = [];
    this.servicios = [];
  
    this.estOff = false;
    this.munOff = true;
    this.parrOff = true;
    this.univOff = true;
    this.municipios = [];

    this.isCodesearchCollapsed = false;
    this.isListsearchCollapsed = true;

    this.listadoCarreras = [];

    this.carrerasDisponibles = [];
    this.universidadActual = {};
    this.hasCareers = false;

    this.listadoUniversidades = [];

      this.espOff = true;
      this.ubicacion = [];
      this.parroquiasService.obtenerParroquias().subscribe(data =>{

        if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
            this.ubicacion = data.data;
            this.estados = this.ubicacion.est;
        }
        else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
        }

      });

      this.carrerasService.obtenerClasificacion().subscribe(data =>{

        if(data.success){
          this.areas = data.data;
        }
        else{
          this.clasificacion = {};
          this.areas = [];
          this.area_carr = "";
          this.especialidades = [];
          this.especialidad_carr = "";
        }

      });

      this.mensajero = document.querySelector("#mensajesImportantes") as HTMLElement;
      this.mensajeImportante = "";
    eval("window.yo = this");

    this.cant_ofertas = 0;
  }

  cargarOferta(){

  	let oferta = {
  		univ: this.universidadActual.codigo,
  		carr: this.carreraActual.carrera.codigo,
  		ano: this.ano,
  		periodo: this.periodo,
  		oferta: this.cant_ofertas
  	}

  	this.universidadesService.cargarOferta(oferta).subscribe(data =>{

  		if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
  		}

  		else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
  		}

  	});



  }


  consultarOfertas(){

    let ano = this.ano;
    let periodo = this.periodo;
    let univ = this.universidadActual.codigo;
    let carr = this.carreraActual.carrera.codigo;

    this.universidadesService.obtenerHistorialOfertas(univ, carr, ano, periodo).subscribe(data =>{

      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });
        
        let orden1 = data.data.sort((a,b) =>{return a.periodo-b.periodo});
        let orden2 = orden1.sort((a,b) =>{return b.ano-a.ano});
        this.ofertasCarreraActual = data.data;
        this.viendoOfertasCarrera = true;
        this.grafOff = false;

        if(!this.ofertasCarreraActual.find((element) =>{return (element.ano == ano)&&(element.periodo == periodo) })){
           this.mensajeImportante = "No se encontraron ofertas para el año y periodo especificados. Si es el usuario indicado podrá cargarla";
           this.mensajero.click();
           this.cargarOfertaOff = false;
        }
        else{
          this.cant_ofertas = this.ofertasCarreraActual.find((element) =>{return (element.ano == ano) && (element.periodo == periodo) }).cupos;
          this.cargarOfertaOff = true;
        }
      }
      else{
        this.mensajeImportante = "No se encontraron ofertas para el año y periodo especificados. Si es el usuario indicado podrá cargarla";
        this.mensajero.click();
        this.cargarOfertaOff = false;

      }

    });

  	this.ofertasOff = true;

  }

  enableAno(){
  	this.anos = [];
  	this.anoOff = false;

  	for(let i = 0; i<100; i++){
  		this.anos.push(this.anoActual-i);
  	}
  }

  enablePeriodo(){
	this.periodo = 0;
	this.periodoOff = false;
  }




























    cargarFormulario(){
    this.mostrarFormulario = true;
    this.mostrarRegistrar = true;
    this.mostrarUnivs = true;
  }

  elegir(opc){

    this.universidadesService.getUniversities().subscribe(data =>{

      if(data){
        this.listadoUniversidades = data.data;
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });

        this.mostrarElegir = true;
        this.mostrarFormulario = true;
        if(opc == 'u'){this.mostrarActualizar = true;}
        if(opc == 'd'){this.mostrarEliminar = true;}
      }
      else{
        this.flashMessage.show("No se logra encontrar universidades", { cssClass: 'alert-danger', timeout: 1000 });
      }
    });
  }

  cargarOpcionesUniversidad(){
    let opciones = []

    this.listadoUniversidades.forEach((element) =>{
      if(element.ubicacion.codigo == this.parroquia){
        opciones.push(element);
      }
    });

    this.opcionesUniversidad = opciones;
    this.univOff = false;
  }


//////////
  cambiarUniversidadActual(){
    this.universidadActual = this.universidades.find((element) =>{return element.codigo == this.codigo });
    
    if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}

    this.carrerasDisponibles = this.universidadActual.carreras;
    this.nombre = this.universidadActual.nombre;
    this.siglas = this.universidadActual.siglas;
  }
  buscarUniversidad(){
    this.universidadActual = this.listadoUniversidades.find((element) =>{return element.codigo == this.codigo});
    if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}
    this.carrerasDisponibles = this.universidadActual.carreras;
    this.mostrarUniversidad = true;
  }
///////////

  toggleCodesearch(elem){
    if(!this.isListsearchCollapsed){this.isListsearchCollapsed = true};
    this.isCodesearchCollapsed = !this.isCodesearchCollapsed;
    elem.setAttribute("class","btn btn-primary");
    document.querySelector("#listsearch").setAttribute("class","btn btn-default");
  }
  toggleListsearch(elem){    
    if(!this.isCodesearchCollapsed){this.isCodesearchCollapsed = true};
    this.isListsearchCollapsed = !this.isListsearchCollapsed;
    elem.setAttribute("class","btn btn-primary");
    document.querySelector("#codesearch").setAttribute("class","btn btn-default");
  }

  aceptarUniversidad(){
    this.mostrarElegir = false;
    this.mostrarUniversidad = false;
    this.preguntarModificacion = true;
  }

  actualizarFormulario(){
    this.elegir('u');
  }  

  eliminarFormulario(){
    this.elegir('d');
  }
  
  restaurar(){
    this.codigo = "";
    this.nombre = "";
    this.estado = "";
    this.parrOff = true;
    this.parroquia = "";
    this.parroquias = [];
    this.estOff = false;
    this.munOff = true;
    this.municipio = "";
    this.municipios = [];
    this.servicios = [];
    this.siglas = "";
    this.gestion = "Publicas";
    this.univOff = true;
    this.capacidad = 0;
    this.matricula = 0;
    this.matrOff = false;
    this.codOff = false;
    this.viendoHistorialCarrera = false;
    this.ofertasCarreraActual = [];
    this.viendoOfertasCarrera = false;

   	this.ano = 0;
   	this.periodo = 0;    
   	this.anoOff = true;
   	this.ano = 0;
   	this.anoActual = (new Date().getFullYear())
   	this.anos = [];
   	this.anoOff = true;
   	this.ofertasOff = true;
    this.carreraSeleccionada = false;
    this.periodoOff = true;
    this.cargarOfertaOff = true;


    this.duracion_carr_1 = 0;
    this.duracion_carr_2 = 0;
    this.titulo_carr_1 = "";
    this.titulo_carr_2 = "";
    this.especialidadCargada = false;
    this.nombre_carr = "";
    this.universidadActiva = false;

    this.mostrarPrincipal = true;
    this.agregandoCarreras = false;
    this.mostrarUnivs = false;
    this.mostrarGrafica = false;
    this.addCarrOff = true;
    this.grafOff = true;
    this.seleccionandoUnivs = false;
    this.viendoCarrerasDisponibles = false;
  
    let cb = document.querySelectorAll("input[type='checkbox']");
    for(let i = 0, j = cb.length; i<j; i++){
      if(cb[i]["checked"]){cb[i]["checked"]=false}
    }
    this.actualizandoUniv = false;

    this.mostrarFormulario = false;
    this.mostrarRegistrar = false;
    this.mostrarCargarCarreras = false;
    this.preguntarCarreras = false;
    this.preguntarModificacion = false;
    this.mostrarActualizar = false;
    this.mostrarEliminar = false;
    this.mostrarElegir = false;
    this.mostrarUniversidad = false;
    this.isCodesearchCollapsed = false;
    this.isListsearchCollapsed = true;
  }


  enableMun(){
    this.municipios = this.ubicacion.mun.filter((element) =>{return element.estado == this.estado });
    this.munOff = false;
    this.parrOff = true;

    this.mostrarUnivs = false;
    this.grafOff = true;
  }


  enableParr(){

    this.universidadesService.getUniversitiesByMun(this.municipio).subscribe(data =>{

      if(data.success){

          if(data.data.length){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });

            this.parroquias = this.ubicacion.parr.filter((element) =>{return element.municipio == this.municipio});
            this.parrOff = false;

          }
          else{
            
            this.flashMessage.show("No hay universidades en la localidad especificada", { cssClass: 'alert-warning', timeout: 1000 });            
            this.parrOff = true;
            this.parroquia = "";
            this.parroquias = [];

          }
          this.universidades = data.data;
          this.mostrarUnivs = true;
          this.addCarrOff = false;

      }
      else{

          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.universidades = [];
          this.grafOff = true;
          this.mostrarUnivs = false;
      }

    });

  }


  obtenerUniversidadesPorParroquia(){

    this.universidadesService.getUniversitiesByParr(this.parroquia).subscribe(data =>{
    
      if(data.success){

          if(data.data.length){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          }
          else{
            this.flashMessage.show("No hay universidades en la localidad especificada", { cssClass: 'alert-warning', timeout: 1000 });            
          }
        this.universidades = data.data;
        this.mostrarUnivs = true;
        this.addCarrOff = false;
      }
      else{

        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });    
        this.universidades = [];
        this.grafOff = true;
        this.addCarrOff = true;
        this.mostrarUnivs = false;
      }
    });
  }

  evaluarPoblacion(){

    let dato = (this.matricula/this.capacidad)*100;
    let div = document.querySelector("#indicador");
    div.innerHTML = "";

    let span = document.createElement("span"); 
    let h4 = document.createElement("h4");

    div.appendChild(span);
    div.appendChild(h4);


    if(dato>=100){
      span.setAttribute("class","glyphicon glyphicon-warning-sign pull-left");
      h4.innerHTML = "Tiene superpoblacion con un "+(100-dato)+"% de disponibilidad ";

      document.querySelector("#indicador>span")["style"].color = "red";
      document.querySelector("#indicador>span")["style"]["font-size"] = "2em";
      document.querySelector("#indicador")["style"]["margin-top"] = "2em";
    }
    else if(dato > 75){
      span.setAttribute("class","glyphicon glyphicon-warning-sign pull-left");
      h4.innerHTML = "Se encuentra proximo a alcanzar su capacidad maxima, con un "+(100-dato)+"% de disponibilidad";

      document.querySelector("#indicador>span")["style"].color = "yellow";
      document.querySelector("#indicador>span")["style"]["font-size"] = "2em";
      document.querySelector("#indicador")["style"]["margin-top"] = "2em";
    }
    else{
      span.setAttribute("class","glyphicon glyphicon-ok pull-left");
      h4.innerHTML = "Su disponibilidad de matricula es optima con un "+(100-dato)+"% de disponibilidad";

      document.querySelector("#indicador>span")["style"].color = "green";
      document.querySelector("#indicador>span")["style"]["font-size"] = "2em";
      document.querySelector("#indicador")["style"]["margin-top"] = "2em";
    }


    let trs = document.querySelectorAll("tbody>tr");

    for(let p = 0, j = trs.length; p<j; p++){

      let cap = parseInt(trs[p]["cells"][3].innerText);
      let mat = parseInt(trs[p]["cells"][4].innerText);

      dato = (mat/cap)*100;

      if (dato>=100){
        trs[p].setAttribute("class","danger");
      }
      else if(dato > 80){
        trs[p].setAttribute("class","warning");        
      }
      else{
        trs[p].setAttribute("class","success");        
      }
    }

  }


  listarServicios(servicio){


    if(!this.servicios.find((element) =>{return element == servicio})){
      this.servicios.push(servicio);
    }
    else{

      let servicios = this.servicios.filter((element) =>{return element != servicio});
      this.servicios = servicios;
    }

    console.log(this.servicios);
  }



  responderCarreras(respuesta){
    console.log("RESPONDIO CON")
    console.log(respuesta);
    if(respuesta){

      let codigo = this.codigo;
      this.universidadesService.getUniversity(codigo).subscribe(data =>{

        if(data){
          this.flashMessage.show('Se encontro la universidad buscada', { cssClass: 'alert-success', timeout: 1000 });
          this.universidadActual = data.data;
          if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}

            this.carrerasService.getSortedCareers().subscribe(data =>{

              if(data){
                this.flashMessage.show('Y se obtuvieron las carreras con exito', { cssClass: 'alert-success', timeout: 1000 });
                this.mostrarCargarCarreras = true;
                this.preguntarCarreras = false;
                this.preguntarModificacion = false;
                this.carreras = data.data;

                let listadoCarreras = [];

                this.universidadActual.carreras.forEach((element) =>{
                  listadoCarreras.push(element);
                });

                this.listadoCarreras = listadoCarreras;
                
              }else{
                this.flashMessage.show('Pero no se pudieron obtener las carreras', { cssClass: 'alert-info', timeout: 1000 });
              }

            });

        }else{
          this.flashMessage.show('No se pudo ubicar esa universidad', { cssClass: 'alert-danger', timeout: 1000 });
        }
      });



    }else{
      this.restaurar();
    }
  }
  
  cargarClasificacion(opcion){
    let sortedCareers = {};

    this.carreras[opcion].forEach((element) =>{
        sortedCareers[element["_id"]]=element.carreras;
    });  
  
    this.sortedCareers = sortedCareers;
    this.clasificaciones = Object.getOwnPropertyNames(sortedCareers);
    console.log(this.sortedCareers);
    console.log(this.clasificaciones);
  }

  cargarOpcionesCarrera(){
    let opciones = this.sortedCareers[this.clase];
    this.opcionesCarrera = opciones;
  }

  removerCarrera(carr_cod){
    this.listadoCarreras = this.listadoCarreras.filter((element) => {return element.codigo != carr_cod});
  }

  insertarCarrera(){
    if( !this.clase ){
      console.log("No puedes agregar si no hay clase");
      this.flashMessage.show("No puedes agregar si no has indicado la clase", { cssClass: 'alert-warning', timeout: 1000 });
      return false;
    }
    if( !this.carreraActual ){
      console.log("No puedes agregar si no especificas una carrera");
      this.flashMessage.show("No puedes agregar si no especificas una carrera", { cssClass: 'alert-warning', timeout: 1000 });
      return false;
    }
    if( this.listadoCarreras.find((element) =>{return element.codigo == this.carreraActual }) ){
      console.log("Ya existia esa especialidad, no te pases de listo ¬¬");
    }
    else{
      let carrera = this.opcionesCarrera.find((element) =>{return element.codigo == this.carreraActual});
      this.listadoCarreras.push(carrera);
    }
  }

  enableSubmit(){

    if(this.codigo && 
       this.siglas && 
       this.nombre && 
       this.municipios &&
       this.parroquia &&
       this.matricula &&
       this.capacidad &&
       this.servicios){}

  }

  enviarFormulario(){

    let universidad = {
      codigo: "",
      siglas: "",
      nombre: "",
      nucleo: "",
      ubicacion: "",
      capacidad: 1,
      matricula: 1,
      servicios: [],
      gestion: ""
    }

  try{     
    universidad.codigo = this.codigo;
    universidad.siglas = this.siglas;
    universidad.nombre = this.nombre;
    universidad.nucleo = this.municipios.find((element) =>{return element.codigo == this.municipio}).nombre;
    universidad.ubicacion = this.parroquia;
    universidad.capacidad = this.capacidad;
    universidad.matricula = this.matricula;
    universidad.servicios = this.servicios;
    universidad.gestion = this.gestion;
  }
  catch(err){

     console.log(err);
     console.log("Error atrapado!");
     this.mensajeImportante = "Asegurese de rellenar todos los campos y de manera correcta";
     this.mensajero.click();
     return false;
  }
    console.log(universidad);


    if(this.universidadesService.validateUniversity(universidad)){
      this.flashMessage.show('Formulario llenado con exito', { cssClass: 'alert-info', timeout: 1000 });
      console.log(universidad);
      this.universidadesService.registrarUniversidad(universidad).subscribe(data =>{

        if(data.success){
          
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          
          this.universidadActual = data.data;
          if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}
          this.universidades.push(this.universidadActual);
          this.agregarCarreras();
        }
        else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
          if(data.data){
          if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}
            this.universidadActual = data.data;
            this.codigo = this.universidadActual.codigo;
            this.siglas = this.universidadActual.siglas; 
            this.nombre = this.universidadActual.nombre; 
            this.parroquia = this.universidadActual.ubicacion;
            this.matricula = this.universidadActual.matricula;
            this.capacidad = this.universidadActual.capacidad;
            this.servicios = this.universidadActual.servicios;
            this.agregarCarreras()
          }
        }
      });
    }
    else{
      this.flashMessage.show('Rellene todos los campos', { cssClass: 'alert-danger', timeout: 1000 });    
    }
    
  }


  encontrarUniversidad(univ){

    this.universidadesService.getUniversity(univ).subscribe(data =>{

      if(data.success){

        this.universidadActual = data.data;
        if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}
        this.encontroUniversidad = true;
        this.mostrarPrincipal = false;
        this.mostrarUnivs = false;
      }else{

      }

    });

  }

  editarUniversidad(univ){


    this.universidadesService.getUniversity(univ).subscribe(data =>{

      if(data.success){

        this.universidadActual = data.data;
        if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}

        this.estado = this.universidadActual.ubicacion.municipio.estado.codigo;
        this.municipio = this.universidadActual.ubicacion.municipio.codigo;
        this.parroquia = this.universidadActual.ubicacion.codigo;
        this.codigo = this.universidadActual.codigo;
        this.nombre = this.universidadActual.nombre;
        this.siglas = this.universidadActual.siglas;
        this.gestion = this.universidadActual.gestion;
        this.capacidad = this.universidadActual.capacidad;
        this.matricula = this.universidadActual.matricula;

        this.estOff = true;
        this.munOff = true;
        this.parrOff = true;
        this.matrOff = true;
        this.codOff = true;
        this.actualizandoUniv = true;
        this.mensajeImportante = "Por favor, no olvide marcar los servicios que ofrece la universidad";        
        this.mensajero.click();
        this.mostrarUnivs = false;
      }
      else{

      }
    });
    //alert(univ);
  }

  eliminarUniversidad(univ){

    alert(univ);

  }

  volverGestionar(){

    this.universidadActual = {};
    this.hasCareers = false;
    this.encontroUniversidad = false;
    this.mostrarPrincipal = true;

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


  modelChart(initLabel){

    let ctx = this.initChart();

    this.activeChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: initLabel,
              data: [],
              backgroundColor: [
              ],
              borderColor: [
              ],
              borderWidth: 1
          }]
      },
      options: {
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                      return data.datasets[tooltipItems.datasetIndex].label +': ' + ((tooltipItems.yLabel/data.total)*100).toFixed(2) + ' %';
                    }
                }
            },
        scales: {
          yAxes: [{
              ticks: {
                beginAtZero:true
              }
          }]
        }
      }
    });
  }

  updateChartColors(){

    for(let i = 0, j = this.activeChart.data.datasets[0].data.length; i<j; i++){
      
      let colores = this.getColor(this.activeChart.data.datasets[0].data[i], '');
      this.activeChart.data.datasets[0].backgroundColor[i] = colores.color;
      this.activeChart.data.datasets[0].borderColor[i] = colores.borderColor;
    }

    this.activeChart.update();
  }

  addDataToChart(dato, etiqueta, opt){

    this.activeChart.data.labels.push(etiqueta);
    this.activeChart.data.datasets[0].data.push(Math.floor(dato));

    let colores = this.getColor(dato, opt);

    this.activeChart.data.datasets[0].backgroundColor.push(colores.color);
    this.activeChart.data.datasets[0].borderColor.push(colores.borderColor);

    this.activeChart.update();
  }

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getColor(dato, opt){

    let color = "";
    let borderColor = "";

    if(opt=="random"){

      let cadena = "rgba("+this.getRandomInt(0, 256)+","+this.getRandomInt(0, 256)+","+this.getRandomInt(0, 256)+",";
      color = ""+cadena+"0.2)";
      borderColor = ""+cadena+"1)";

    }
    else{


    if(dato <= this.dangerRange){
      color = "rgba(200, 30, 30, 0.2)"
      borderColor = "rgba(200, 30, 30, 1)"
    }
    else if(dato <= this.warningRange ){
      color = "rgba(255, 230, 60, 0.2)"
      borderColor = "rgba(255, 230, 60, 1)"
    }
    else{
      color = "rgba(60, 255, 80, 0.2)"
      borderColor = "rgba(60, 255, 80, 1)" 
    }


    }

    let objeto = {color: color, borderColor: borderColor};
    return objeto;
  }

  toggleGrafica(el){

    if(document.querySelector("#myCanvas")){ 
      this.removerGrafica();
      el.innerHTML = "Mostrar Gráfica";
      this.graficaActiva = false; 
    }
    else{
      this.dibujarGrafica('Ofertas por Periodo')
      el.innerHTML = "Ocultar Grafica";
      this.graficaActiva = true;
    }


  }

  dibujarGrafica(info){

    this.mostrarGrafica = true;
    this.seleccionandoUnivs = false;
    this.mostrarUnivs = false;

    let datos = [];

    let total = 0;
    this.ofertasCarreraActual.forEach((element) =>{
      total += element["count"];
    });

    this.ofertasCarreraActual.forEach((element) =>{
      let dato = {
        etiqueta: ""+element["_id"]["ano"]+" - "+element['_id']['periodo'],
        valor: element["count"]
    }

      datos.push(dato);
    });

    this.modelChart(info);
    this.activeChart.data.total = total;

    datos.forEach((element) =>{
      this.addDataToChart(element.valor, element.etiqueta, 'random');
    });

    this.activeChart.ultimo = info;
  }

  cambiarGrafica(el){

    if(this.activeChart.ultimo == 'Matricula'){
      this.dibujarGrafica('Capacidad');
      el.innerText = "Ver Matricula";
    }else{
      this.dibujarGrafica('Matricula');
      el.innerText = "Ver Capacidad";
    }

  }

  removerGrafica(){
    document.querySelector("#myCanvas").parentNode.removeChild(document.querySelector("#myCanvas"));
    if(this.agregandoCarreras){
      this.seleccionandoUnivs = true
    }
    else{
      this.mostrarUnivs = true;
    }
  }


  agregarCarreras(){
    this.seleccionandoUnivs = true;
    this.agregandoCarreras = true;
    this.mostrarUnivs = false;
  }

  seleccionarUniversidad(codigo){

    this.universidadActual = this.universidades.find((element) =>{return element.codigo == codigo});
    if(this.universidadActual.carreras.length>0){this.hasCareers = true;}else{this.hasCareers = false;}

    this.codigo = this.universidadActual.codigo;
    this.nombre = this.universidadActual.nombre;
    this.siglas = this.universidadActual.siglas;
    this.gestion = this.universidadActual.gestion;
    this.parroquia = this.universidadActual.ubicacion.codigo;
    this.seleccionandoUnivs = false;
    this.estOff = true;
    this.munOff = true;
    this.parrOff = true;
    this.viendoCarrerasDisponibles = true;
    this.agregandoCarreras = true;
    this.universidadActiva = true;
    this.mostrarUnivs = false;

  }

  volverListadoUniversidades(){

    this.seleccionandoUnivs = true;
    this.viendoCarrerasDisponibles = false;
    this.mostrarUnivs = true;
  }


  seleccionarCarrera(codigo){
    let carr = codigo.toString();
    console.log(carr);
    for(let i = 0, j = this.universidadActual.carreras.length; i<j; i++){

      if(this.universidadActual.carreras[i].carrera.codigo == codigo){
        this.carreraActual = this.universidadActual.carreras[i];
        this.codigo_int = ""+this.universidadActual.codigo+""+this.carreraActual.carrera.codigo;
        this.nombre_carr = this.carreraActual.carrera.nombre;
        this.sinCarrera = false;
        this.carreraSeleccionada = true;
        this.viendoCarrerasDisponibles = false;
        this.viendoHistorialCarrera = true;
        this.enableAno();
        return false;
      }      

    }

  }

  volverListadoCarreras(){

    this.carreraSeleccionada = false;
    this.viendoCarrerasDisponibles = true;
    this.viendoOfertasCarrera = false;
    this.viendoHistorialCarrera = false;
  }

  confirmarUniversidad(){

    if(!this.universidadActual.codigo){

      this.flashMessage.show("Por favor, elija antes una universidad", { cssClass: 'alert-danger', timeout: 1000 });      

    }
    else{

      this.carreras = [];
      this.carreraActual = {};
      this.eligiendoCarreras = true;
      this.mostrarPrincipal = false;
    }
  }
  
  enableEsp(){
    this.especialidad_carr = "";
    this.especialidades = this.areas.find((element) =>{ return element.nombre == this.area_carr}).especialidades;
    this.espOff = false;
  }

  enableCarr(){

    this.carrerasService.obtenerCarrerasPorEspecialidad(this.especialidad_carr).subscribe(data =>{

      if(data.success){

        this.especialidadCargada = true;
        this.carreras = data.data;
        this.carrOff = false;
      }
      else{

        this.especialidadCargada = true;
        this.carreras = [];
        this.carrOff = true;
      }

    });
  }



  guardarCarrera(){

    if( !this.codigo_int || !this.modalidad_carr ){
      this.flashMessage.show("Por favor, indique la modalidad en la cual se ofrecera la carrera", { cssClass: 'alert-danger', timeout: 2000 });
    }
    else{

      let carrera = {
        codigo: this.carreraActual.codigo,
        codigo_int: this.codigo_int,
        modalidad: this.modalidad_carr,
        nombre: this.nombre_carr,
        area: this.area_carr,
        especialidad: this.especialidad_carr,
        titulos:[]
      }


      if(this.duracion_carr_1 && this.titulo_carr_1!=""){
        carrera.titulos.push({duracion: this.duracion_carr_1, titulo: this.titulo_carr_1 });
      }      

      if(this.duracion_carr_2 && this.titulo_carr_2!=""){
        carrera.titulos.push({duracion: this.duracion_carr_2, titulo: this.titulo_carr_2 });
      }

      if(carrera.titulos.length){

        this.flashMessage.show("Procesando..."+carrera.titulos.length+" titulo(s)", { cssClass: 'alert-info', timeout: 1000 });
        
        this.universidadesService.agregarCarrera(this.universidadActual.codigo, carrera).subscribe(data =>{

          if(data.success){
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });

            let duda = this.universidadActual.carreras.findIndex((element) =>{return element.codigo == carrera.codigo});
            if( duda < 0){
              this.universidadActual.carreras.push({carrera:{codigo: carrera.codigo, nombre: carrera.nombre, area: carrera.area, especialidad: carrera.especialidad}, codigo_int: carrera.codigo_int, modalidad: carrera.modalidad, titulos: carrera.titulos});
            }
            else{
              this.universidadActual.carreras[duda] = {carrera:{codigo: carrera.codigo, nombre: carrera.nombre, area: carrera.area, especialidad: carrera.especialidad}, codigo_int: carrera.codigo_int, modalidad: carrera.modalidad, titulos: carrera.titulos};
            }
          }
          else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });
          }

        });
      }
      else{
        this.flashMessage.show("No puede asociar carrera sin indicar al menos 1 duracion y 1 titulo ofrecido", { cssClass: 'alert-danger', timeout: 3000 });
      }


    }
  }

  updateCurrentCareers(evento){

    if(evento.success){

      console.log(evento.data);
      console.log(this.universidadActual);

    }
    else{

    }

  }  

  deleteCurrentCareers(evento){

    if(evento){

      console.log(evento);

      let carreras = [];
      for(let i = 0, j = this.universidadActual.carreras.length; i<j; i++){
        if(this.universidadActual.carreras[i] != evento){
          carreras.push(this.universidadActual.carreras[i]);
        }
      }
      console.log(carreras);

      this.universidadActual.carreras = carreras;

    }
    else{

    }

  }

  cancelarCarreras(){
    this.eligiendoCarreras = false;
    this.mostrarPrincipal = true;
    this.mostrarUnivs = true;
  }

  actualizarUniversidad(){

      let datos = {
        nombre: this.nombre,
        siglas: this.siglas,
        gestion: this.gestion,
        servicios: this.servicios,
        capacidad: this.capacidad
      }

    this.universidadesService.actualizarUniversidad(this.universidadActual.codigo, datos).subscribe(data =>{

      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2500 });
        
        this.mostrarUnivs = true;
        this.universidadActual.nombre = datos.nombre;
        this.universidadActual.siglas = datos.siglas;
        this.universidadActual.gestion = datos.gestion;
        this.universidadActual.servicios = datos.servicios;
        this.universidadActual.capacidad = datos.capacidad;


        this.estOff = false;
        this.munOff = false;
        this.parrOff = false;
        this.matrOff = false;
        this.matricula = 0;
        this.nombre = "";
        this.siglas = "";
        this.gestion = "";
        this.servicios = [];
        this.capacidad = 0;
        this.codOff = false;
        this.codigo = "";
        this.actualizandoUniv = false;
        let cb = document.querySelectorAll("input[type='checkbox']");
        for(let i = 0, j = cb.length; i<j; i++){
          if(cb[i]["checked"]){cb[i]["checked"]=false}
        }
        setTimeout(() =>{ document.querySelector("#mostrarUnivs").scrollIntoView({behavior: "smooth", block: "start", inline: "start"}) }, 200);
        let indice = this.universidades.findIndex((element) =>{return element.codigo == this.universidadActual.codigo})
        this.universidades[indice] = this.universidadActual;
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });


        this.mostrarUnivs = true;
        this.estOff = false;
        this.munOff = false;
        this.parrOff = false;
        this.matrOff = false;
        this.matricula = 0;
        this.nombre = "";
        this.siglas = "";
        this.gestion = "";
        this.servicios = [];
        this.capacidad = 0;
        this.codOff = false;
        this.codigo = "";
        this.actualizandoUniv = false;

        let cb = document.querySelectorAll("input[type='checkbox']");
        for(let i = 0, j = cb.length; i<j; i++){
          if(cb[i]["checked"]){cb[i]["checked"]=false}
        }
        setTimeout(() =>{ document.querySelector("#mostrarUnivs").scrollIntoView({behavior: "smooth", block: "start", inline: "start"}) }, 200);

      }

    });

  }


}
