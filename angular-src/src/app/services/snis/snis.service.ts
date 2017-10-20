import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SnisService {

  constructor(private http: Http) { }
  
    obtenerSnis(){
        'use strict'
        return this.http.get('http://localhost:8080/snis/all')
            .map(res => res.json());
    }

}
