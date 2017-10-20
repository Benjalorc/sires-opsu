import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EstudiantesService {

  constructor(private http: Http) { }
  
    getStudents(){
        'use strict'
        return this.http.get('http://localhost:8080/estudiantes/all')
            .map(res => res.json());
    }

}
