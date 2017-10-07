import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniversidadesService {

  constructor(private http: Http) { }
  
    validateUniversity(universidad){
      'use strict'
      if(universidad.codigo == '' 
      || universidad.nombre == '' 
      || universidad.municipio == '' 
      || universidad.municipio == undefined 
      || universidad.capacidad == '' 
      || universidad.poblacion == ''){
        return false;
      }
      else{
        return true;
      }
    }  
  
    getUniversities(){
        'use strict'
        return this.http.get('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/universidades/all')
            .map(res => res.json());
    }
    
    getUniversity(univ_code){
      'use strict'
      return this.http.get('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/universidades/buscar/'+univ_code)
            .map(res => res.json());
    }

}
