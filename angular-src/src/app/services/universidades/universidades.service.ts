import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniversidadesService {

  constructor(private http: Http) { }
  
    validateUniversity(universidad){
      'use strict'
      let avaible = Object.getOwnPropertyNames(universidad);
      let pass = true;

      avaible.forEach((element) =>{
        if(universidad[element] == undefined || universidad[element] == '' || universidad[element] == null){
          pass = false
        }
        else{

        }
      });

      return pass;
    }  
  
    getUniversities(){
        'use strict'
        return this.http.get('http://localhost:8080/universidades/all')
          .map(res => res.json());
    }
    
    getUniversity(univ_code){
      'use strict'
      return this.http.get('http://localhost:8080/universidades/buscar/'+univ_code)
            .map(res => res.json());
    }

    registrarUniversidad(universidad){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/universidades/registrar', universidad, {headers: headers})
            .map(res => res.json());
    }
    

}
