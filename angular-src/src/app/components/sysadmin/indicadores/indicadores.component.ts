import { Component, OnInit, TemplateRef } from '@angular/core';
import { SnisService } from '../../../services/snis/snis.service';
import { EstudiantesService } from '../../../services/estudiantes/estudiantes.service';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  cargando: HTMLElement;


  activeChart: any;

  dangerRange: any;
  warningRange: any;
  successRange: any;

  etiqueta: any;
  esperando: any;
  recibido: any;

  snis: any;
  estudiantes: any;

  ano: any;
  grafica: any;
  datos: any;

  perspectiva: string;
  indicadoresOff: Boolean;
  indicadores: any;
  listadoIndicadores: any;
  indicador: string;
  indicadorActual: any;
  indicadorAscendenteSeleccionado: Boolean;
  indicadorDescendenteSeleccionado: Boolean;

  stacked: any[] = [];
  type: string;

  
  constructor(private snisService: SnisService,
              private estudiantesService: EstudiantesService,
              private router: Router,
              private flashMessage : FlashMessagesService,
              private indicadoresService: IndicadoresService
            ){ 
  }

  
  ngOnInit(){
  
    eval("window.yo = this");
    this.cargando = document.getElementById("spinner");

    this.indicadoresOff = true;
    this.perspectiva = "";

    this.indicadores = [];
    this.indicador = "";
    this.indicadorActual = {};
    this.indicadoresService.listarIndicadores().subscribe(data =>{

    	if(data.success){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });
          this.listadoIndicadores = data.data;
    	}
    	else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });
    	}

    });


    this.dangerRange = 30;
    this.warningRange = 60;
    this.successRange = 90;

    this.etiqueta = "";
    this.esperando = 0;
    this.recibido = 0;

    this.snis = false;
    this.estudiantes = false;

    this.ano = new Date().getFullYear();
    this.grafica = "";
    this.datos = {};

  	this.stacked = [];

  	this.stacked.push({value: this.dangerRange, type:"danger", label: "Critico"});
  	this.stacked.push({value: this.successRange-this.dangerRange, type:"warning", label:"Alerta"});
  	this.stacked.push({value: 100-this.successRange, type:"success", label: "Exito!"});

  	this.indicadorActual.vc = this.dangerRange;
  	this.indicadorActual.vm = this.successRange-this.dangerRange;
  	this.indicadorActual.ve = this.successRange;

  }

  restaurar(){
  	this.indicadoresOff = true;
  	this.indicadores = [];
    this.indicadorActual = {};
	  this.indicador = "";
	  this.perspectiva = "";
    this.indicadorAscendenteSeleccionado = false;
  	this.indicadorDescendenteSeleccionado = false;

  }


  montarIndicadores(){

  	this.indicadores = this.listadoIndicadores.filter((element) =>{return element.perspectiva == this.perspectiva});
  	if(this.indicadores.length){
  		this.indicadoresOff = false;
  	}
  	else{
        this.flashMessage.show("Disculpe, no se encontraron indicadores en esa perspectiva", { cssClass: 'alert-warning', timeout: 3000 });
		this.indicadoresOff = true;
  	}
  }

  seleccionarIndicador(){

  	this.indicadorActual = this.indicadores.find((element) =>{return element.codigo == this.indicador})
    console.log(this.indicadorActual);

    if(this.indicadorActual.tendencia=="Ascendente"){
      this.indicadorAscendenteSeleccionado = true;
      this.indicadorDescendenteSeleccionado = false;


      this.successRange = this.indicadorActual.ve;
      this.dangerRange = this.indicadorActual.vc;


      this.stacked = [];

      this.stacked.push({value: this.dangerRange, type:"danger", label: "Critico"});
      this.stacked.push({value: this.successRange-this.dangerRange, type:"warning", label:"Alerta"});
      this.stacked.push({value: 100-this.successRange, type:"success", label: "Exito!"});

      this.indicadorActual.vc = this.dangerRange;
      this.indicadorActual.vm = this.successRange-this.dangerRange;
      this.indicadorActual.ve = this.successRange;

    }
    else{
      this.indicadorDescendenteSeleccionado = true;
      this.indicadorAscendenteSeleccionado = false;


      this.successRange = this.indicadorActual.ve;
      this.dangerRange = this.indicadorActual.vc;


      this.stacked = [];

      this.stacked.push({value: this.successRange, type:"success", label: "Exito"});
      this.stacked.push({value: this.dangerRange-this.successRange, type:"warning", label:"Alerta"});
      this.stacked.push({value: 100-this.dangerRange, type:"danger", label: "Critico"});

      this.indicadorActual.vc = this.dangerRange;
      this.indicadorActual.vm = this.dangerRange-this.successRange;
      this.indicadorActual.ve = this.successRange;

    }

  }

  actualizarIndicador(){

  	let obj = {
  		cod: this.indicadorActual.codigo,
  		ve: this.indicadorActual.ve,
  		vc: this.indicadorActual.vc,
      mensajeExito: this.indicadorActual.mensajeExito,
      mensajeAlerta: this.indicadorActual.mensajeAlerta,
      mensajeCritico: this.indicadorActual.mensajeCritico
  	}

  	console.log(obj);

  	this.indicadoresService.actualizar(obj).subscribe(data =>{

  		if(data.success){
	        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
  		}
  		else{
	        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
  		}

  	});

  }


  updateProgressBar(){

    this.stacked = [];

    this.stacked.push({value: this.dangerRange, type:"danger", label: "Critico"});
    this.stacked.push({value: this.successRange-this.dangerRange, type:"warning", label:"Alerta"});
    this.stacked.push({value: 100-this.successRange, type:"success", label: "Exito!"});

    this.indicadorActual.vc = this.dangerRange;
    this.indicadorActual.vm = this.successRange-this.dangerRange;
    this.indicadorActual.ve = this.successRange;
  }  

  updateProgressBarDescend(){

      this.stacked = [];

      this.stacked.push({value: this.successRange, type:"success", label: "Exito"});
      this.stacked.push({value: this.dangerRange-this.successRange, type:"warning", label:"Alerta"});
      this.stacked.push({value: 100-this.dangerRange, type:"danger", label: "Critico"});

      this.indicadorActual.vc = this.dangerRange;
      this.indicadorActual.vm = this.dangerRange-this.successRange;
      this.indicadorActual.ve = this.successRange;

  }


  updateDanger(ev){
    if(ev.target.value >= this.successRange){ 
      ev.target.value = Number.parseInt(this.successRange)-1;
      return Number.parseInt(this.successRange)-1;
    }
      return Number.parseInt(ev.target.value);
  }
  updateDangerDescend(ev){
    if(ev.target.value <= this.successRange){ 
      ev.target.value = Number.parseInt(this.successRange)+1;
      return Number.parseInt(this.successRange)+1;
    }
      return Number.parseInt(ev.target.value);
  }

  updateWarning(ev){

    if(ev.target.value <= this.dangerRange){ 
      ev.target.value = Number.parseInt(this.dangerRange)+1;
      return Number.parseInt(this.dangerRange)+1;
    }

    if(ev.target.value >= 90){
      ev.target.value = 90-1;
      return 90-1; 
    }

    return Number.parseInt(ev.target.value);
  }

  updateSuccess(ev){
    if(ev.target.value <= this.dangerRange){
      ev.target.value = Number.parseInt(this.dangerRange)+1;
      return Number.parseInt(this.dangerRange)+1;
    }
      return Number.parseInt(ev.target.value);
  }
  updateSuccessDescend(ev){
    if(ev.target.value >= this.dangerRange){
      ev.target.value = Number.parseInt(this.dangerRange)-1;
      return Number.parseInt(this.dangerRange)-1;
    }
      return Number.parseInt(ev.target.value);
  }

}
