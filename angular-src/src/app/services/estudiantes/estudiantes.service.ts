import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EstudiantesService {

  constructor(private http: Http) { }
  
    validateStudent(estudiante){
      'use strict'
      let avaible = Object.getOwnPropertyNames(estudiante);
      let pass = true;
  
      avaible.forEach((element) =>{
        if(estudiante[element] == undefined || estudiante[element] == '' || estudiante[element] == null){
          pass = false
        }
        else{
        }
      });
      return pass;
    }
    
    getStudents(){
        'use strict'
        return this.http.get('http://localhost:8080/estudiantes/all')
            .map(res => res.json());
    }
    
    registrarEstudiante(estudiante){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/estudiantes/registrar', estudiante, {headers: headers})
            .map(res => res.json());
    }

}
