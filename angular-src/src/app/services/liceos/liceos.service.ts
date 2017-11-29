import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LiceosService {

  constructor(private http: Http) { }
  
    validateLiceo(liceo){
      'use strict'
      let pass = true;

      for(let prop in liceo){
        if(liceo[prop] == undefined || liceo[prop] == '' || liceo[prop] == null || !liceo[prop].length){
          pass = false;
        }
      }
      return pass;
    }  
  
    getLiceos(){
        'use strict'
        return this.http.get('http://localhost:8080/liceos/all')
          .map(res => res.json());
    }
    
    getLiceo(lic_code){
      'use strict'
      return this.http.get('http://localhost:8080/liceos/buscar/'+lic_code)
            .map(res => res.json());
    }

    registrarLiceo(liceo){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/liceos/registrar', liceo, {headers: headers})
            .map(res => res.json());
    }
    

}
