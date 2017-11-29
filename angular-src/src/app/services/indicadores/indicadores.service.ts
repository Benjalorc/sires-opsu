import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IndicadoresService {

  constructor(private http: Http) { }


  listarIndicadores(){
	'use strict'
    return this.http.get('http://localhost:8080/indicadores/listar')
    	.map(res => res.json());
  }

  obtenerIndicador(cod){
  'use strict'
    return this.http.get('http://localhost:8080/indicadores/buscar/'+cod)
      .map(res => res.json());
  }  

  obtenerIndicadores(){
  'use strict'
    return this.http.get('http://localhost:8080/indicadores/listar')
      .map(res => res.json());
  }

  actualizar(obj){
    'use strict';

    let headers = new Headers();
    headers.append('Content-Type','application/json');

    console.log(obj);
    return this.http.put('http://localhost:8080/indicadores/actualizar', obj, {headers: headers})
        .map(res => res.json());
  }


}
