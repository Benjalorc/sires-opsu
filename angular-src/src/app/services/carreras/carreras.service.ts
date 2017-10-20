import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarrerasService {

  constructor(private http: Http) { }
  
  validateCareer(carrera){
    'use strict'
    let avaible = Object.getOwnPropertyNames(carrera);
    let pass = true;

    avaible.forEach((element) =>{
      if(carrera[element] == undefined || carrera[element] == '' || carrera[element] == null){
        pass = false
      }
      else{
      }
    });
    return pass;
  }

  getCareers(){
        'use strict'
        return this.http.get('http://localhost:8080/carreras/all')
            .map(res => res.json());
    }

  getCareer(carr_code){
  	'use strict'
  	 return this.http.get('http://localhost:8080/carreras/buscar/'+carr_code)
  	 	.map(res => res.json());

  }

  registrarCarrera(carrera){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/carreras/registrar', carrera, {headers: headers})
            .map(res => res.json());
    }

}
