import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParroquiasService {

  constructor(private http: Http) { }
  
    obtenerParroquias(){
        'use strict'
        return this.http.get('http://localhost:8080/parroquias/buscar')
            .map(res => res.json());
    }

}
