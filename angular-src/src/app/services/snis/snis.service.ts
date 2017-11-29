import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SnisService {

  constructor(private http: Http) { }

  	validateSni(sni){

      console.log(sni);
      'use strict'
      let avaible = Object.getOwnPropertyNames(sni);
      let pass = true;
  
      avaible.forEach((element) =>{
        if(sni[element] == undefined || sni[element] == '' || sni[element] == null){
          pass = false
        }
      });
      
      avaible = Object.getOwnPropertyNames(sni.opciones);
      
      avaible.forEach((element) =>{
        if(sni.opciones[element] == undefined || sni.opciones[element] == '' || sni.opciones[element] == null){
          pass = false;
        }
      });
      return pass;
    }
  
    obtenerSnis(){
        'use strict'
        return this.http.get('http://localhost:8080/snis/all')
            .map(res => res.json());
    }

    obtenerSnisIndicadores(){
        'use strict'
        return this.http.get('http://localhost:8080/snis/ind')
            .map(res => res.json());
    }    

    buscarAsignaciones(univ, carr, ano, periodo){
        'use strict'
        return this.http.get('http://localhost:8080/snis/asignaciones/'+univ+'/'+carr+'/'+ano+'/'+periodo)
            .map(res => res.json());
    }

    registrarSni(sni){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/snis/agregar', sni, {headers: headers})
            .map(res => res.json());
    }

}
