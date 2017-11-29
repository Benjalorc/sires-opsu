import { Component, OnInit, TemplateRef } from '@angular/core';
import { SnisService } from '../../../services/snis/snis.service';
import { EstudiantesService } from '../../../services/estudiantes/estudiantes.service';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';



@Component({
  selector: 'app-admin-ind',
  templateUrl: './admin-ind.component.html',
  styleUrls: ['./admin-ind.component.css']
})

export class AdminIndComponent implements OnInit {
 

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

  indicadorActual: any;

  constructor(private indicadoresService: IndicadoresService,
              private snisService: SnisService,
              private estudiantesService: EstudiantesService,
              private router: Router,
              private flashMessage : FlashMessagesService
            ){ 
  }

  ngOnInit(){
  
    eval("window.yo = this");

    this.indicadorActual = {};

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

  }

  updateDanger(ev){
    if(ev.target.value >= this.warningRange){ 
      ev.target.value = Number.parseInt(this.warningRange)-1;
      return Number.parseInt(this.warningRange)-1;
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
    if(ev.target.value <= this.warningRange){
      ev.target.value = Number.parseInt(this.warningRange)+1;
      return Number.parseInt(this.warningRange)+1;
    }
      return Number.parseInt(ev.target.value);
  }

 


}
