import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MunicipiosService {

  constructor(private http: Http) { }
  
    obtenerMunicipios(){
        'use strict'
        return this.http.get('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/municipios/buscar')
            .map(res => res.json());
    }

}
