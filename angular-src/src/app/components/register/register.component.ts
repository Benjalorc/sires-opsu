import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {IMyOptions} from 'mydatepicker';


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
  f_nac: Date;
  
  private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        minYear: 1900,
        maxYear: new Date().getFullYear()
    };
 
  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router
              ){ 
  }

  ngOnInit() {

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
    
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Rellene todos los campos!', { cssClass: 'alert-danger', timeout: 3000 });
    }
    
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Correo invalido!', { cssClass: 'alert-danger', timeout: 1000 });
    }

    //REGISTRAR USUARIO
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Se ha registrado exitosamente. Ya puede iniciar sesion', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      }
      else{
        this.flashMessage.show('Algo salio mal con su registro!', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
        console.log(user);
      }
    })
    
  }
  
  
}
