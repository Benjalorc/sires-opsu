import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarrerasService {

  constructor(private http: Http) { }
  
  getCareers(){
        'use strict'
        return this.http.get('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/carreras/all')
            .map(res => res.json());
    }

}
