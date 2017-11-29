import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PnevsService {

  constructor(private http: Http) { }

    validatePnev(pnev){
      'use strict'
      let avaible = Object.getOwnPropertyNames(pnev);
      let pass = true;
  
      avaible.forEach((element) =>{
        if(pnev[element] == undefined || pnev[element] == '' || pnev[element] == null){
          pass = false
        }
      });
      
      avaible = Object.getOwnPropertyNames(pnev.resultados);
      
      avaible.forEach((element) =>{
        if(pnev.resultados[element] == undefined || pnev.resultados[element] == '' || pnev.resultados[element] == null){
          pass = false;
        }
      });
      return pass;
    }

  
    obtenerPnevs(){
        'use strict'
        return this.http.get('http://localhost:8080/pnevs/all')
            .map(res => res.json());
    }

    obtenerPnevsCorto(){
        'use strict'
        return this.http.get('http://localhost:8080/pnevs/allshort')
            .map(res => res.json());
    }

    registrarPnev(pnev){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/pnevs/agregar', pnev, {headers: headers})
            .map(res => res.json());
    }

}
