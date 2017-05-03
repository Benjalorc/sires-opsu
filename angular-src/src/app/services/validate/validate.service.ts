import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  
  validateRegister(user){
      if(user.cedula == undefined || user.nombre == undefined || user.apellido == undefined || user.username == undefined || user.password == undefined || user.sexo == undefined || user.f_nac == undefined){
          return false;
      }
      return true;
  }
  
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}