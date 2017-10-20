import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PnevsService {

  constructor(private http: Http) { }
  
    obtenerPnevs(){
        'use strict'
        return this.http.get('http://localhost:8080/pnevs/all')
            .map(res => res.json());
    }

}
