import { Component, OnInit, ViewChild } from '@angular/core';
import { UniversidadesService } from '../../../services/universidades/universidades.service';
import { ParroquiasService } from '../../../services/parroquias/parroquias.service';
import { CarrerasService } from '../../../services/carreras/carreras.service';
import { SnisService } from '../../../services/snis/snis.service';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Chart from 'chart.js';

@Component({
  selector: 'app-admin-matricula-univ',
  templateUrl: './admin-matricula-univ.component.html',
  styleUrls: ['./admin-matricula-univ.component.css']
})
export class AdminMatriculaUnivComponent implements OnInit {

  ubicacion: any;
  
  estados: any;
  municipios: any;
  parroquias: any;
	
  estado: any;
  municipio: any;
  parroquia: any;

  estOff: Boolean;
  munOff: Boolean;
  parrOff: Boolean;

  cod_carr: string;
  nombre_carr: string;
  area_carr: string;
  especialidad_carr: string;

  universidadActual: any;
  carreraActual: any;

  ano: number;
  anoActual: number;
  anos: any;
  periodo: number;

  cant_ingresos_opsu: number;
  cant_ingresos_convenio: number;
  cant_egresos: number;

  cargarIngresos: Boolean;
  cargarEgresos: Boolean;
  opcionSeleccionada: Boolean;


  mensajeImportante: string;
  mensajero: HTMLElement;
  mostrarPrincipal: Boolean;

  mostrarUnivs: Boolean;
  mostrarCarreras: Boolean;
  carreraSeleccionada: Boolean; 
  grafOff: Boolean;

  universidades: any;  

  mostrarIngresos: Boolean;
  mostrarEgresos: Boolean;
  mostrarEgresos2: Boolean;
  mostrarEgresos3: Boolean;
  
  ingresosCarreraActual: any;
  egresosCarreraActual: any;

  ingresosOff: Boolean;
  mostrarGuardar: Boolean;

  cargando: any;

  drawOff: Boolean;
  indicador: any;
  indicadorActivado: Boolean;
  indicadores: any;

  last_ano: any;
  last_per: any;

  stacked: any[] = [];
  dangerRange: any;
  warningRange: any;
  successRange: any;

  preguntarIndicador: Boolean;
  activeChart: any;

  mostrarGrafica: Boolean;
  graficaActiva: Boolean;
  viendoEgresosCarrera: Boolean;


  asignacionesCarreraActual: any;
  mostrarAsignaciones: Boolean;
  reportado: Boolean;

  constructor(private universidadesService: UniversidadesService,
              private parroquiasService: ParroquiasService,
              private carrerasService: CarrerasService,
              private snisService: SnisService,
              private indicadoresService: IndicadoresService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit() {
    this.reportado = false;
        this.mostrarAsignaciones = false;
    this.asignacionesCarreraActual = [];
    this.viendoEgresosCarrera = true;
     this.last_ano = 0;
     this.last_per = 0;
     this.drawOff = true;
    this.indicadorActivado = false;
          this.preguntarIndicador = false;

    this.cargando = document.getElementById("spinner");


    this.indicadoresService.obtenerIndicadores().subscribe(data =>{

      if(data.success){

        this.indicadores = data.data.filter((element) =>{return (element.codigo=='3')||(element.codigo=='4')||(element.codigo=='5')});
        this.indicador = this.indicadores[0];

        this.stacked = [];
        this.stacked.push({value: this.dangerRange, type:"danger", label: "Critico"});
        this.stacked.push({value: this.successRange-this.dangerRange, type:"warning", label:"Alerta"});
        this.stacked.push({value: 100-this.successRange, type:"success", label: "Exito!"});


        this.successRange = this.indicador.ve;
        this.dangerRange = this.indicador.vc;

        this.stacked = [];

        this.stacked.push({value: this.dangerRange, type:"danger", label: "Critico"});
        this.stacked.push({value: this.successRange-this.dangerRange, type:"warning", label:"Alerta"});
        this.stacked.push({value: 100-this.successRange, type:"success", label: "Exito!"});
      }
    });









  	this.ingresosOff = true;
  	this.universidades = [];
  	this.opcionSeleccionada = false;
    this.mostrarCarreras = false;
    this.carreraSeleccionada = false;

    this.mostrarGuardar = false;



    this.cant_ingresos_opsu = 0;
    this.cant_ingresos_convenio = 0;

    this.cant_egresos = 0;

   	this.ano = 0;
   	this.anoActual = (new Date().getFullYear())
   	this.anos = [];

   	for(let i = this.anoActual; i>this.anoActual-30; i--){
   		this.anos.push(i)
   	}

    this.mostrarIngresos = false;
    this.mostrarEgresos = false;
    this.mostrarEgresos2 = false;
    this.mostrarEgresos3 = false;
  
  	this.ingresosCarreraActual = [];
  	this.egresosCarreraActual = [];

  	this.universidadActual = {};
  	this.carreraActual = {};

    this.estOff = false;
  	this.munOff = true;
  	this.parrOff = true;

  	this.cod_carr = "";
  	this.nombre_carr = "";
  	this.area_carr = "";
  	this.especialidad_carr = "";

  	this.cargarIngresos = false;
  	this.cargarEgresos = false;

    this.mostrarUnivs = false;
    this.grafOff = true;  	

    this.ubicacion = [];

    this.cargando.setAttribute("class","spinner");
    this.parroquiasService.obtenerParroquias().subscribe(data =>{
    this.cargando.setAttribute("class","nada");
      if(data.success){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.ubicacion = data.data;
          this.estados = this.ubicacion.est;
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
      }

    });




  	this.mensajeImportante = "";
	this.mensajero = document.querySelector("#mensajesImportantes") as HTMLElement;
  	this.mostrarPrincipal = true;
 
    eval("window.yo = this");
  }

  restaurar(){
    
    this.reportado = false;
    this.mostrarAsignaciones = false;
    this.viendoEgresosCarrera = true;

     this.last_ano = 0;
     this.last_per = 0;
     this.drawOff = true;
    this.indicadorActivado = false
          this.preguntarIndicador = false;

  	this.universidades = [];
    this.drawOff = true;
   	this.ano = 0;
   	this.anoActual = (new Date().getFullYear())
   	this.anos = [];

	this.estado = "";
	this.municipio = "";
	this.parroquia = "";

	this.estOff = false;
	this.munOff = true;
	this.parrOff = true;

  	this.cod_carr = "";
  	this.nombre_carr = "";
  	this.area_carr = "";
  	this.especialidad_carr = "";

  	this.cargarIngresos = false;
  	this.cargarEgresos = false;

  	this.universidadActual = {};
  	this.carreraActual = {};

  	this.opcionSeleccionada = false

  	this.mensajeImportante = "";
  	this.mostrarPrincipal = true;

    this.mostrarUnivs = false;
    this.mostrarCarreras = false;
    this.grafOff = true;
    this.carreraSeleccionada = false;

    this.mostrarIngresos = false;
    this.mostrarEgresos = false;
    this.mostrarEgresos2 = false;
    this.mostrarEgresos3 = false;
  
  	this.ingresosCarreraActual = [];
  	this.egresosCarreraActual = [];
   	this.ingresosOff = true;
 
    this.cant_ingresos_opsu = 0;
    this.cant_ingresos_convenio = 0;

    this.cant_egresos = 0;

    this.mostrarGuardar = false;


  }


  gestionarIngresos(){
    this.preguntarIndicador = false;
    this.cargarEgresos = false;
    this.mostrarEgresos = false;
    this.mostrarEgresos2 = false;
    this.mostrarEgresos3 = false;
    this.cargarIngresos = true;
    this.reportado = false;
    document.getElementById("gestionarIngresos").setAttribute("class","scheduler-border activo");
	document.getElementById("gestionarEgresos").setAttribute("class","scheduler-border");
  }

  gestionarEgresos(){

    this.removerGrafica();
    this.graficaActiva = false;
    this.preguntarIndicador = false;
    this.grafOff = true;
    this.graficaActiva = false;
    this.indicadorActivado = false;
    this.mostrarIngresos = false;
    this.mostrarAsignaciones = false;
    this.cargarIngresos = false;
    this.cargarEgresos = true;
    this.mostrarIngresos = false;
    this.reportado = false;
  	document.getElementById("gestionarEgresos").setAttribute("class","scheduler-border activo");
  	document.getElementById("gestionarIngresos").setAttribute("class","scheduler-border");
  }

  enableMun(){
    this.municipios = this.ubicacion.mun.filter((element) =>{return element.estado == this.estado });
    this.munOff = false;
    this.parrOff = true;

    this.mostrarUnivs = false;
    this.grafOff = true;
  }

  enableParr(){

    this.cargando.setAttribute("class","spinner");
    this.universidadesService.getUniversitiesByMun(this.municipio).subscribe(data =>{
    this.cargando.setAttribute("class","nada");
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
      }
      else{

          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.universidades = [];
          this.grafOff = true;
          this.mostrarUnivs = false;
      }

    });

  }

  seleccionarUniversidad(codigo){

  	this.universidadActual = this.universidades.find((element) =>{return element.codigo == codigo});

    this.estOff = true;
    this.munOff = true;
    this.parrOff = true;

    this.mostrarUnivs = false;
    this.mostrarCarreras = true;

  }

  volverListadoUniversidades(){

    this.mostrarCarreras = false;
    this.mostrarUnivs = true;
    this.universidadActual = {};
    this.estOff = false;
    this.munOff = false;
    this.parrOff = false;
  }

  volverListadoCarreras(){

    this.mostrarCarreras = true;
    this.carreraSeleccionada = false;
    this.carreraActual = {};

    this.mostrarIngresos = false;
    this.mostrarEgresos = false;
    this.mostrarEgresos2 = false;
    this.mostrarEgresos3 = false;
    this.cargarIngresos = false;
    this.cargarEgresos = false;

    this.ano = 0;
    this.periodo = 0;
    this.cant_ingresos_opsu = 0;
    this.cant_ingresos_convenio = 0;
    this.cant_egresos = 0;

    this.ingresosOff = true;
    this.mostrarGuardar = false;

  }


  seleccionarCarrera(codigo){
    let carr = codigo.toString();

    this.carreraActual = this.universidadActual.carreras.find((element) =>{return element.carrera.codigo == carr})

    this.mostrarCarreras = false;
    this.carreraSeleccionada = true;

    let ext = this;
    setTimeout(function(){ ext.gestionarIngresos(); }, 300);
  }


  consultarIngresos(){

    this.mostrarIngresos = false;
    this.mostrarAsignaciones = false;
    this.indicadorActivado = false;
    this.grafOff = true;
    this.removerGrafica();
    this.graficaActiva = false;
    this.ingresosCarreraActual = [];

    let ano = this.ano;
    let periodo = this.periodo;
    let univ = this.universidadActual.codigo;
    let carr = this.carreraActual.carrera.codigo;

    if(!this.ano || !this.periodo){
	    this.flashMessage.show("Debe indicar un año y un periodo", { cssClass: 'alert-danger', timeout: 2000 });    	
		return false;
    }


    this.cargando.setAttribute("class","spinner");
  	this.universidadesService.consultarIngresos(univ, carr, ano, periodo).subscribe(data =>{
    this.cargando.setAttribute("class","nada");
  		if(data.success){

	        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });

        let orden1 = data.data.sort((a,b) =>{return b.periodo-a.periodo});
        let orden2 = orden1.sort((a,b) =>{return b.ano-a.ano});

  			this.ingresosCarreraActual = orden2;
  			this.mostrarIngresos = true;


	        if(!this.ingresosCarreraActual.find((element) =>{return (element.ano == ano)&&(element.periodo == periodo) })){
				this.mensajeImportante = "Disculpe, no existia una oferta para este periodo. No puede reportar inscripciones sin haber realizado una oferta";
	        	this.mensajero.click();
	        	this.ingresosOff = true;
		        this.cant_ingresos_opsu = 0;
		        this.cant_ingresos_convenio = 0;
		        this.mostrarGuardar = false;
	        }
	        else{

	        	if( (!this.ingresosCarreraActual.find((element) =>{return (element.ano == ano)&&(element.periodo == periodo) }).inscritos.opsu)
	        	 && (!this.ingresosCarreraActual.find((element) =>{return (element.ano == ano)&&(element.periodo == periodo) }).inscritos.convenio) ){

		           this.mensajeImportante = "No se encontraron ingresos para el año y periodo especificados. Si es el usuario indicado podrá cargarlos";
		           this.mensajero.click();
				   this.cant_ingresos_opsu = 0;
				   this.cant_ingresos_convenio = 0;

				   this.ingresosOff = false;
		           this.mostrarGuardar = true;
	        		
	        	}

	        	else{

		          this.cant_ingresos_opsu = this.ingresosCarreraActual.find((element) =>{return (element.ano == ano) && (element.periodo == periodo) }).inscritos.opsu;
		          this.cant_ingresos_convenio = this.ingresosCarreraActual.find((element) =>{return (element.ano == ano) && (element.periodo == periodo) }).inscritos.convenio;
		          this.ingresosOff = true;
		          this.mostrarGuardar = false;

	        	}



	        }

  		}
  		else{

		    this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });

	  		this.ingresosCarreraActual = [];
	  		this.mostrarIngresos = true;

			this.mensajeImportante = "Disculpe, no existia una oferta para este periodo. No puede reportar inscripciones sin haber realizado una oferta";
			this.mensajero.click();
			this.ingresosOff = true;
			this.mostrarGuardar = false;

  		}

  	});


  }

  guardarIngresos(){

  	if(this.universidadActual
  		&& this.carreraActual
  		&& this.ano
  		&& this.periodo
  		&& (this.cant_ingresos_opsu >=0 || this.cant_ingresos_convenio >= 0)
  		){

  		let opsu = ((typeof this.cant_ingresos_opsu)=="number")? this.cant_ingresos_opsu : 0;
  		let convenio = ((typeof this.cant_ingresos_convenio)=="number")? this.cant_ingresos_convenio : 0;

  		let inscripcion = {
  			universidad: this.universidadActual.codigo,
  			carrera: this.carreraActual.carrera.codigo,
  			ano: this.ano,
  			periodo: this.periodo,
  			inscritos: {
  				opsu: opsu,
  				convenio: convenio
  			}
  		}

  		this.universidadesService.inscribir(inscripcion).subscribe(data =>{

  			if(data.success){
			    this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });

			    this.ingresosOff = true;
			    this.mostrarGuardar = false;
			    this.ingresosCarreraActual.find((element) =>{ return (element.universidad==this.universidadActual.codigo)
			    													&&(element.ano==this.ano)
			    													&&(element.periodo==this.periodo)
			    													&&(element.carrera==this.carreraActual.carrera.codigo)
			    											}).inscritos = inscripcion.inscritos;

          this.consultarIngresos();
  			}
  			else{
			    this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
  			}

  		});

  	}
  	else{



  	}
  }

  fechaCambio(){
    this.removerGrafica();
    this.graficaActiva = false;
    this.indicadorActivado = false;
    this.preguntarIndicador = false;
    this.ingresosOff = true;
    this.mostrarGuardar = false;
    this.ingresosCarreraActual = [];
    this.mostrarIngresos = false;
    this.mostrarEgresos = false;
    this.mostrarEgresos2 = false;
    this.mostrarEgresos3 = false;
    this.cant_ingresos_opsu = 0;
    this.cant_ingresos_convenio = 0;
    this.reportado = false;
  }


  evaluarIndicadorDescendente(){

        var trs = document.querySelectorAll("tr");
        for(let i = 1, j = trs.length; i<j; i++){

          let p = parseFloat(trs[i]["cells"][6]["innerText"]);

            if(p <= this.indicador.ve){
              trs[i]["cells"][7]["innerText"] = "Exito";
              trs[i].setAttribute("class","success");
            }
            else if(p >= this.indicador.vc){
              trs[i]["cells"][7]["innerText"] = "Critico";
              trs[i].setAttribute("class","danger");
            }
            else{
              trs[i]["cells"][7]["innerText"] = "Esperado";
              trs[i].setAttribute("class","warning");
            }


            if(i == trs.length-1){
              let span = document.createElement("span");
              span.setAttribute("class","glyphicon glyphicon-minus")
              trs[i]["cells"][8].innerHTML='';
              trs[i]["cells"][8].appendChild(span)
            }
            else{

              let n1 = parseFloat(trs[i]["cells"][6].innerText);
              let n2 = parseFloat(trs[i+1]["cells"][6].innerText);

              if(n2>n1){
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-arrow-down");
                span.setAttribute("style","color:#0F0;");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span)
              }
              if(n2<n1){
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-arrow-up");
                span.setAttribute("style","color: #F00;");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span);
              }
              if(n1==n2){
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-arrow-minus");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span);
              }


            }



        }


    this.drawOff = false;
  }




consultarEgresos(){

  this.preguntarIndicador = false;
  this.grafOff = true;
  this.removerGrafica();
  this.indicadorActivado = false;

    let ano = this.ano;
    let periodo = this.periodo;
    let univ = this.universidadActual.codigo;
    let carr = this.carreraActual.carrera.codigo;


    if(!this.ano || !this.periodo){
	    this.flashMessage.show("Debe indicar un año y un periodo", { cssClass: 'alert-danger', timeout: 2000 });    	
  		return false;
    }


    this.cargando.setAttribute("class","spinner");
  	this.universidadesService.consultarEgresos(univ, carr, ano, periodo).subscribe(data =>{
    this.cargando.setAttribute("class","nada");

  		if(data.success){
			this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });


        this.universidadesService.consultarIngresos(univ, carr, ano, periodo).subscribe(data =>{

          if(data.success){

          this.ingresosCarreraActual = data.data;

              this.ingresosCarreraActual.forEach((element) =>{
                element.egresados.porcentaje_graduandos = (element.egresados.graduacion/(element.inscritos.opsu+element.inscritos.convenio))*100;
                element.egresados.porcentaje_retiros = (element.egresados.retiro/(element.inscritos.opsu+element.inscritos.convenio))*100;
              });


          this.preguntarIndicador = true;

          }
          else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });
          }
        });



  		}
  		else{
			this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });

  			this.universidadesService.consultarIngresos(univ, carr, ano, periodo).subscribe(data =>{

  				if(data.success){

					this.ingresosCarreraActual = data.data;


					let ingreso = this.ingresosCarreraActual.find((element) =>{return (element.ano == ano)&&(element.periodo == periodo) })

			        if(!ingreso){
						this.mensajeImportante = "Disculpe, nunca existio una oferta ni inscripcion para este periodo";
			        	this.mensajero.click();
				        this.mostrarGuardar = false;
				        return false;
			        }
			        if( (!ingreso.inscritos.opsu) && (!ingreso.inscritos.convenio) ){

				        this.mensajeImportante = "No se encontraron ingresos para el año y periodo especificados. Si es el usuario indicado podrá cargarlos";
				        this.mensajero.click();
				        this.mostrarGuardar = false;
				        return false;			        		
			        }

			        this.ingresosCarreraActual.forEach((element) =>{
			        	element.egresados.nuevos_graduandos = 0;
			        	element.egresados.nuevos_retiros = 0;
			        });
			        this.mostrarEgresos = true;

  				}
  				else{

  				}
  			});

  		}
  	});


  }


  cargarAsignaciones(){

    this.cargando.setAttribute("class","spinner");

    let ano = this.ano;
    let periodo = this.periodo;
    let univ = this.universidadActual.codigo;
    let carr = this.carreraActual.carrera.codigo;

    this.asignacionesCarreraActual = [];

    this.snisService.buscarAsignaciones(univ, carr, ano, periodo).subscribe(data =>{
    this.cargando.setAttribute("class","nada");

      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });
        
        let orden1 = data.data.sort((a,b) =>{return b._id.periodo-a._id.periodo});
        let orden2 = orden1.sort((a,b) =>{return b._id.ano-a._id.ano});
        this.asignacionesCarreraActual = orden2;


        for(let i = 0, j = this.asignacionesCarreraActual.length; i<j; i++){

          let a = this.asignacionesCarreraActual[i].count;
          let b = this.ingresosCarreraActual[i].inscritos.opsu;

          this.ingresosCarreraActual[i].inscritos.porcentaje_opsu = ((b/a)*100).toFixed(2);
        }
    

        this.indicador = this.indicadores.find((element) =>{return element.codigo == '5'});
        this.mostrarAsignaciones = true;
        let ext = this;

        setTimeout(function(){ ext.evaluarIndicadorAscendente(); }, 500);
      }
      else{
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

  }


  actualizarGraduandos(el, ingreso){

  	console.log(el.value);
  	console.log(ingreso);

  	if( parseInt(el.value) > ingreso.max ){
	  	ingreso.egresados.nuevos_graduandos = parseInt(ingreso.max)-1;
  	}
  	else{
  		ingreso.egresados.nuevos_graduandos = parseInt(el.value);
  	}


  }
  actualizarRetiros(el, ingreso){

  	if( parseInt(el.value) > ingreso.max ){
	  	ingreso.egresados.nuevos_retiros = parseInt(ingreso.max)-1;
  	}
  	else{
  		ingreso.egresados.nuevos_retiros = parseInt(el.value);
  	}

  }

  seleccionarIndicador(cod){

    this.removerGrafica();
    this.graficaActiva = false;
    this.indicadorActivado = false;
    this.grafOff = true;

    this.indicador = this.indicadores.find((element) =>{return element.codigo == cod});
    console.log(this.indicador);

      let filtro = [];

    if(cod == '3'){

      let pass = false;

      if(this.ingresosCarreraActual.find((element) =>{return element.egresados.graduacion!=0})){
        pass = true;
      }


      if(pass) filtro = this.ingresosCarreraActual.filter((element) =>{return element.egresados.graduacion!=0});
      
    }
    if(cod == '4'){

      let pass = false;
      if(this.ingresosCarreraActual.find((element) =>{return element.egresados.retiro!=0})){
        pass = true;
      }

      if(pass) filtro = this.ingresosCarreraActual.filter((element) =>{return element.egresados.retiro!=0});

    }

    let orden1 = filtro.sort((a,b) =>{return b.periodo-a.periodo});
    let orden2 = orden1.sort((a,b) =>{return b.ano-a.ano});

    if(!filtro.length){
      this.flashMessage.show("Disculpe, no hay datos registrados para evaluar este tipo de indicador", { cssClass: 'alert-warning', timeout: 3000 });
      this.mostrarEgresos3 = false;
      this.mostrarEgresos2 = false;
    }
    else{

      this.ingresosCarreraActual = filtro;

      if(cod == '3'){
        this.viendoEgresosCarrera = true;
        this.mostrarEgresos3 = true;
        this.mostrarEgresos2 = false;

      }
      if(cod == '4'){
        this.viendoEgresosCarrera = true;
        this.mostrarEgresos3 = false;      
        this.mostrarEgresos2 = true;
      }

      let ext = this;
      if(this.indicador.tendencia=='Ascendente'){
        setTimeout(function(){ ext.evaluarIndicadorAscendente(); }, 500);
      }else{
        setTimeout(function(){ ext.evaluarIndicadorDescendente(); }, 500);
      }

    }
  }



  evaluarIndicadorAscendente(){

        var trs = document.querySelectorAll("tr");
        for(let i = 1, j = trs.length; i<j; i++){

          let p = parseFloat(trs[i]["cells"][6]["innerText"]);

            if(p >= this.indicador.ve){
              trs[i]["cells"][7]["innerText"] = "Exito";
              trs[i].setAttribute("class","success");
            }
            else if(p <= this.indicador.vc){
              trs[i]["cells"][7]["innerText"] = "Critico";
              trs[i].setAttribute("class","danger");
            }
            else{
              trs[i]["cells"][7]["innerText"] = "Esperado";
              trs[i].setAttribute("class","warning");
            }


            if(i == trs.length-1){
              console.log("PRIMERO");
              let span = document.createElement("span");
              span.setAttribute("class","glyphicon glyphicon-minus")
              trs[i]["cells"][8].innerHTML='';
              trs[i]["cells"][8].appendChild(span)
            }
            else{

              let n1 = parseFloat(trs[i]["cells"][6].innerText);
              let n2 = parseFloat(trs[i+1]["cells"][6].innerText);
              console.log(n1);
              console.log(n2);
              if(n2<n1){
                console.log("MENOR");
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-arrow-up");
                span.setAttribute("style","color:#0F0;");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span)
              }
              if(n2>n1){
                console.log("MAYOR");
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-arrow-down");
                span.setAttribute("style","color: #F00;");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span);
              }
              if(n1==n2){
                console.log("IGUAL");
                let span = document.createElement("span");
                span.setAttribute("class","glyphicon glyphicon-minus");
                trs[i]["cells"][8].innerHTML='';
                trs[i]["cells"][8].appendChild(span);
              }


            }



        }


    this.drawOff = false;
  }



  toggleGrafica(ano, per){

    if(document.querySelector("#myCanvas")){ 
      this.removerGrafica();
      this.graficaActiva = false;
      this.indicadorActivado = false;
      this.preguntarIndicador = true;

      if(this.indicador.codigo == '3'){
        this.mostrarEgresos3 = true;
        this.mostrarEgresos2 = false;
        this.mostrarIngresos = false;
        this.mostrarAsignaciones = false;
        this.viendoEgresosCarrera = true;
      }
      if(this.indicador.codigo == '4'){
        this.mostrarEgresos3 = false;      
        this.mostrarEgresos2 = true;
        this.mostrarIngresos = false;
        this.mostrarAsignaciones = false;
        this.viendoEgresosCarrera = true;
      }      
      if(this.indicador.codigo == '5'){
        this.mostrarAsignaciones = true;
        this.mostrarIngresos = true;
        this.mostrarEgresos3 = false;      
        this.mostrarEgresos2 = false;
        this.viendoEgresosCarrera = false;
      }




      this.grafOff = true;
      this.drawOff = true;
      let ext = this;
      if(this.indicador.tendencia=='Ascendente'){
        setTimeout(function(){ ext.evaluarIndicadorAscendente(); }, 500);
      }
      else{
        setTimeout(function(){ ext.evaluarIndicadorDescendente(); }, 500);
      }
    }
    else{
      this.preguntarIndicador = false;      
      this.last_ano = ano;
      this.last_per = per;
      let titulo = ""+this.indicador.nombre+" \n "+this.carreraActual.carrera.nombre;
      this.dibujarGrafica(titulo);
      this.graficaActiva = true;
      this.indicadorActivado = true;
      this.mostrarIngresos = false;
      this.mostrarAsignaciones = false;
      this.viendoEgresosCarrera = false; 
      this.grafOff = false;      
    }


  }


  removerGrafica(){
    if(this.graficaActiva){
      document.querySelector("#myCanvas").parentNode.removeChild(document.querySelector("#myCanvas"));
    }
    this.graficaActiva = false;
  }


  dibujarGrafica(info){

        let total = 0;

        let ingreso = this.ingresosCarreraActual.find((element) =>{return (element.ano==this.last_ano)&&(element.periodo==this.last_per)});


    if(this.indicador.codigo=="3"){


        let datos = [
          {
          etiqueta: "Ingresos",
          valor: (ingreso.inscritos.opsu+ingreso.inscritos.convenio)
          },
          {
          etiqueta: "Graduandos",
          valor: ingreso.egresados.graduacion
          }
        ];

        let porcentaje = ingreso.egresados.porcentaje_graduandos;

        this.stacked = [];
        if(porcentaje <= this.indicador.vc){
          this.indicador.resultado = ""+this.indicador.mensajeCritico+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"danger", label: "Indicador: Critico                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }    
        else if(porcentaje >= this.indicador.ve){
          this.indicador.resultado = ""+this.indicador.mensajeExito+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"success", label: "Indicador: Exito!                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }
        else{
          this.indicador.resultado = ""+this.indicador.mensajeAlerta+" "+((porcentaje).toFixed(2))+"%"      
          this.stacked.push({value: 100, type:"warning", label: "Indicador: Esperado                  Valor:"+((porcentaje).toFixed(2))+"%"});
        }



        this.modelChart(this.indicador.nombre, this.carreraActual.carrera.nombre);
        this.activeChart.data.porcentaje = porcentaje;
        this.activeChart.data.base = datos[0].valor;
        this.activeChart.data.palabra = "Ingresos: ";


        datos.forEach((element) =>{
          this.addDataToChart(element.valor, datos[0].valor, element.etiqueta, 'propio');
        })
    }
    if(this.indicador.codigo=="5"){

        let asignacion = this.asignacionesCarreraActual.find((element) =>{return (element._id.ano==this.last_ano)&&(element._id.periodo==this.last_per)});

        let datos = [
          {
          etiqueta: "Asignados OPSU",
          valor: asignacion.count
          },
          {
          etiqueta: "Ingresos OPSU",
          valor: ingreso.inscritos.opsu
          }
        ];

        let porcentaje = ((ingreso.inscritos.opsu/asignacion.count)*100);

        this.stacked = [];
        if(porcentaje <= this.indicador.vc){
          this.indicador.resultado = ""+this.indicador.mensajeCritico+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"danger", label: "Indicador: Critico                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }    
        else if(porcentaje >= this.indicador.ve){
          this.indicador.resultado = ""+this.indicador.mensajeExito+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"success", label: "Indicador: Exito!                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }
        else{
          this.indicador.resultado = ""+this.indicador.mensajeAlerta+" "+((porcentaje).toFixed(2))+"%"      
          this.stacked.push({value: 100, type:"warning", label: "Indicador: Esperado                  Valor:"+((porcentaje).toFixed(2))+"%"});
        }



        this.modelChart(this.indicador.nombre, this.carreraActual.carrera.nombre);
        this.activeChart.data.porcentaje = porcentaje;
        this.activeChart.data.base = datos[0].valor;
        this.activeChart.data.palabra = "Asignados: ";


        datos.forEach((element) =>{
          this.addDataToChart(element.valor, datos[0].valor, element.etiqueta, 'propio');
        })
    }
    if(this.indicador.codigo=="4"){


        let datos = [
          {
          etiqueta: "Ingresos",
          valor: (ingreso.inscritos.opsu+ingreso.inscritos.convenio)
          },
          {
          etiqueta: "Retiros",
          valor: ingreso.egresados.retiro
          }
        ];

        let porcentaje = ingreso.egresados.porcentaje_retiros;

        this.stacked = [];
        if(porcentaje >= this.indicador.vc){
          this.indicador.resultado = ""+this.indicador.mensajeCritico+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"danger", label: "Indicador: Critico                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }    
        else if(porcentaje <= this.indicador.ve){
          this.indicador.resultado = ""+this.indicador.mensajeExito+" "+((porcentaje).toFixed(2))+"%"
          this.stacked.push({value: 100, type:"success", label: "Indicador: Exito!                  Valor: "+((porcentaje).toFixed(2))+"%"});
        }
        else{
          this.indicador.resultado = ""+this.indicador.mensajeAlerta+" "+((porcentaje).toFixed(2))+"%"      
          this.stacked.push({value: 100, type:"warning", label: "Indicador: Esperado                  Valor:"+((porcentaje).toFixed(2))+"%"});
        }



        this.modelChart(this.indicador.nombre, this.carreraActual.carrera.nombre);
        this.activeChart.data.porcentaje = porcentaje;
        this.activeChart.data.base = datos[0].valor;
        this.activeChart.data.palabra = "Ingresos: ";


        datos.forEach((element) =>{
          this.addDataToChart(element.valor, datos[0].valor, element.etiqueta, 'propio');
        })


    }

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


  modelChart(nombre, carrera){

    let ctx = this.initChart();

    this.activeChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
              label: ""+nombre+" "+carrera,
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
                      if(tooltipItems.index==0){
                        return ""+data.palabra+""+data.base+" estudiantes";
                      }
                      else{
                        //return data.datasets[tooltipItems.datasetIndex].label +': '+((data.porcentaje).toFixed(2))+' %';
                        return ""+nombre;
                      }
                    },
                    footer: function(tooltipItems, data) {
                      if(tooltipItems[0].index==0){
                      }
                      else{
                        return ""+carrera+": "+((data.porcentaje).toFixed(2))+" %";
                      }
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

  addDataToChart(dato, total, etiqueta, opt){

    this.activeChart.data.labels.push(etiqueta);
    this.activeChart.data.datasets[0].data.push(Math.floor(dato));

    let colores = this.getColor(dato, total, opt, etiqueta);

    this.activeChart.data.datasets[0].backgroundColor.push(colores.color);
    this.activeChart.data.datasets[0].borderColor.push(colores.borderColor);

    this.activeChart.update();
  }  
  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getColor(dato, total, opt, etiqueta){

    let color = "";
    let borderColor = "";

    if(opt=="random"){

      let cadena = "rgba("+this.getRandomInt(0, 256)+","+this.getRandomInt(0, 256)+","+this.getRandomInt(0, 256)+",";
      color = ""+cadena+"0.2)";
      borderColor = ""+cadena+"1)";
    }
    if(etiqueta=="Ingresos"||etiqueta=='Asignados OPSU'){
      color = "rgba(0, 0, 255, 0.2)";
      borderColor = "rgba(0, 0, 255, 1)";      
    }
    else{

      if(this.indicador.tendencia=="Ascendente"){

        if((dato/total)*100 <= this.indicador.vc){
          color = "rgba(200, 30, 30, 0.2)"
          borderColor = "rgba(200, 30, 30, 1)"
        }
        else if((dato/total)*100 >= this.indicador.ve){
          color = "rgba(60, 255, 80, 0.2)"
          borderColor = "rgba(60, 255, 80, 1)" 
        }
        else{
          color = "rgba(255, 230, 60, 0.2)"
          borderColor = "rgba(255, 230, 60, 1)"
        }

      }
      else{

        if((dato/total)*100 >= this.indicador.vc){
          color = "rgba(200, 30, 30, 0.2)"
          borderColor = "rgba(200, 30, 30, 1)"
        }
        else if((dato/total)*100 <= this.indicador.ve){
          color = "rgba(60, 255, 80, 0.2)"
          borderColor = "rgba(60, 255, 80, 1)" 
        }
        else{
          color = "rgba(255, 230, 60, 0.2)"
          borderColor = "rgba(255, 230, 60, 1)"
        }

      }

    }

    let objeto = {color: color, borderColor: borderColor};
    return objeto;
  }









  guardarEgresos(e){

  	if(!e){
  		this.flashMessage.show("Verifique los egresos antes de reportar", { cssClass: 'alert-warning', timeout: 2000 });  		
  	}
  	else{

  	  let filtrados = this.ingresosCarreraActual.filter((element) =>{return (element.egresados.nuevos_retiros != 0)||(element.egresados.nuevos_graduandos != 0) });
  		if(!filtrados){
  			this.flashMessage.show("No puede reportar un egreso en blanco", { cssClass: 'alert-danger', timeout: 3000 });
  			return false;
  		}

  		let i = 1;
  		let ready = true;
  		let trs = document.querySelectorAll("tr");
  		this.ingresosCarreraActual.forEach((element) =>{

  			let viejos = element.egresados.retiro+element.egresados.graduacion;
  			let nuevos = element.egresados.nuevos_retiros+element.egresados.nuevos_graduandos;
  			let inscritos = element["inscritos"]["opsu"]+element["inscritos"]["convenio"];
  			if((viejos+nuevos)>inscritos){
  				trs[i].setAttribute("class","danger");
  				ready = false;
  			}
  			else{
  				trs[i].setAttribute("class","success");
  			}
  			i++;
  		});

  		if(!ready){
  			this.flashMessage.show("Algunos egresos exceden los estudiantes restantes en la cohorte. Por favor ajuste, no puede egresar mas estudiantes de los inscritos", { cssClass: 'alert-danger', timeout: 5000 });
  			return false;
  		}
  		else{


  			let egresos = {
  				universidad: this.universidadActual.codigo,
  				ano: this.ano,
  				periodo: this.periodo,
  				carrera: this.carreraActual.carrera.codigo,
  				egresados: []
  			}

  			filtrados.forEach((element) =>{

  				let egreso = {
  					ano: element.ano,
  					periodo: element.periodo,
  					graduacion: element.egresados.nuevos_graduandos,
  					retiro: element.egresados.nuevos_retiros
  				}
  				egresos.egresados.push(egreso);

  			});



        this.cargando.setAttribute("class","spinner");
        this.universidadesService.egresar(egresos).subscribe(data =>{
        this.cargando.setAttribute("class","nada");


  				if(data.success){  
            this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 5000 });
            this.reportado = true;
            this.consultarEgresos();


  				}
  				else{
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
            this.reportado = false;
  				}
  			});
  		}
  	}
  }
}
