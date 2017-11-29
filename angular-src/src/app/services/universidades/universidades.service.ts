import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UniversidadesService {

  constructor(private http: Http, private authService: AuthService) { }
  
    validateUniversity(universidad){
      'use strict'
      let avaible = Object.getOwnPropertyNames(universidad);
      let pass = true;

      console.log(universidad);
      avaible.forEach((element) =>{
        if(universidad[element] == undefined || universidad[element] == '' || universidad[element] == null){
          console.log(universidad[element]);
          pass = false;
        }
      });
      if(!universidad.servicios.length){ pass = false;}
      if(universidad.capacidad < 0){ pass = false;}
      
      return pass;
    }

    validarOferta(oferta){
      'use strict'

      let pass = true;
      for(let prop in oferta){
        if(oferta[prop] == undefined || oferta[prop] == "" || oferta[prop] == null){
          pass=false
        }
      }
    
      return pass;
    }
  
    getUniversities(){
        'use strict'
        return this.http.get('http://localhost:8080/universidades/all')
          .map(res => res.json());
    }    

    getUniversitiesByState(estado){
        'use strict'
        return this.http.get('http://localhost:8080/universidades/'+estado)
          .map(res => res.json());
    }

    getUniversitiesByMun(mun){
        'use strict'
        return this.http.get('http://localhost:8080/universidades/getbymun/'+mun)
          .map(res => res.json());
    }    

    getUniversitiesByParr(parr){
        'use strict'
        return this.http.get('http://localhost:8080/universidades/getbyparr/'+parr)
          .map(res => res.json());
    }    
    
    getUniversity(univ_code){
      'use strict'
      return this.http.get('http://localhost:8080/universidades/buscar/'+univ_code)
            .map(res => res.json());
    }

    actualizarCarreras(univ, carrera){
        'use strict';

        let obj = {universidad: univ, carrera: carrera};
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:8080/universidades/actualizarCarreras', obj, {headers: headers})
            .map(res => res.json());
    }    

    agregarCarrera(univ, carrera){
        'use strict';

        let obj = {universidad: univ, carrera: carrera};
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:8080/universidades/agregarCarrera', obj, {headers: headers})
            .map(res => res.json());
    }

    eliminarCarrera(univ, carrera){
        'use strict';

        let obj = {universidad: univ, carrera: carrera};
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:8080/universidades/eliminarCarrera', obj, {headers: headers})
            .map(res => res.json());
    }


    registrarUniversidad(universidad){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/universidades/registrar', universidad, {headers: headers})
            .map(res => res.json());
    }

    actualizarUniversidad(univ, datos){
        'use strict';

        let obj = {univ: univ, datos: datos};
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:8080/universidades/actualizarUniversidad', obj, {headers: headers})
            .map(res => res.json());      
    }    

    eliminarUniversidad(univ){
        'use strict';
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.delete('http://localhost:8080/universidades/eliminar', new RequestOptions({ headers: headers, body: {univ: univ}}))
            .map(res => res.json());      
    }


    obtenerHistorialOfertas(univ, carr, ano, periodo){
      'use strict'
      return this.http.get('http://localhost:8080/ofertaunivs/buscar/'+univ+'/'+carr+'/'+ano+'/'+periodo)
          .map(res => res.json());
    }   

    cargarOferta(oferta){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let usuario = this.authService.getUserType();
      let obj = {oferta: oferta, usuario: usuario};
      return this.http.post('http://localhost:8080/ofertaunivs/agregar', obj, {headers: headers})
            .map(res => res.json());
    }         

    actualizarOfertaUniversidad(oferta){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.put('http://localhost:8080/ofertaunivs/actualizar', oferta, {headers: headers})
            .map(res => res.json());
    }

    consultarIngresos(univ, carr, ano, periodo){
      'use strict'
      return this.http.get('http://localhost:8080/ofertaunivs/buscar/'+univ+'/'+carr+'/'+ano+'/'+periodo)
          .map(res => res.json());
    }    

    consultarEgresos(univ, carr, ano, periodo){
      'use strict'
      return this.http.get('http://localhost:8080/ofertaunivs/egresos/'+univ+'/'+carr+'/'+ano+'/'+periodo)
          .map(res => res.json());
    }

    inscribir(inscripcion){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let usuario = this.authService.getUserType();
      let obj = {inscripcion: inscripcion, usuario: usuario};
      return this.http.put('http://localhost:8080/ofertaunivs/inscribir', obj, {headers: headers})
            .map(res => res.json());
    }

    egresar(egresos){
      'use strict'
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let usuario = this.authService.getUserType();
      let obj = {egresos: egresos, usuario: usuario};
      var req = this.http.put('http://localhost:8080/ofertaunivs/egresar', obj, {headers: headers});
      console.log(req);
      return req.map(res => res.json());
    } 



}