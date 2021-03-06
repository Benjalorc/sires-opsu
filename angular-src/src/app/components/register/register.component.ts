import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {IMyOptions, IMyDate, IMyDateModel} from 'mydatepicker';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  cedula: String;
  nombre: String;
  apellido: String;
  username: String;
  password: String;
  email: String;
  sexo: String;
  f_nac: Object;
  
  myDatePickerOptions: IMyOptions = {
        // other options...
        markCurrentDay: false,
        markCurrentMonth: false,
        markCurrentYear: false,
        dateFormat: 'yyyy-mm-dd',
        minYear: 1900,
        maxYear: new Date().getFullYear() - 15
  };
  
  
  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router
              ){
  }
  
  ngOnInit() {
    this.f_nac  = { date: { year: 0, month: 0, day: 0 } }
  }
  
  
  onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }
  
  clearDate() {

  }
  
  onRegisterSubmit(){
      
    const user = {
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      password: this.password,
      email: this.email,
      sexo: this.sexo,
      f_nac: this.f_nac
    }
    
    let go = true;
    
    if(!this.validateService.validateRegister(user)){
      
      this.flashMessage.show('Rellene todos los campos!', { cssClass: 'alert-danger', timeout: 3000 });
      go = false;
    }
    
    if(!this.validateService.validateEmail(user.email)){
      
      this.flashMessage.show('Correo invalido!', { cssClass: 'alert-danger', timeout: 3000 });
      go = false;
    }

    if(go){

      this.flashMessage.show('Sus datos estan siendo verificados', { cssClass: 'alert-info', timeout: 3000 });

      //REGISTRAR USUARIO
      this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/register']);
        }
      });
    }//Cierre de condicional
    
  }//Cierre de onRegisterSubmit
  
}