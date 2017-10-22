import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
  ano: any;
  mes: any;
  dia: any;
  f_nac: Object;
  
  toSetup: Boolean;
  
  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router
              ){
  }
  
  ngOnInit() {
  
    this.toSetup = true;

  }

  asignarAnos(){
    if(this.toSetup){
      let anoActual = new Date().getFullYear();
      let anos = document.querySelector('#ano');
      
      for (let i = 100; i>5; i--){
        let opcion = document.createElement("option");
        opcion.setAttribute("value",""+(anoActual-i));
        opcion.innerHTML = ""+(anoActual-i);
        anos.appendChild(opcion);
      }
      this.toSetup = false;
    }

  }

  
  asignarDias() {
    
    if(this.mes == undefined || this.mes == "" || this.ano == undefined || this.ano == "") return;
    
    let dia = document.querySelector("#dia")
    dia.innerHTML = "";
  
    let dias = 0;
    
    if(this.mes == "4" || this.mes == "6" || this.mes == "9" || this.mes == "11"){
      dias = 30;
    }
    
    if(this.mes == "1" || this.mes == "3" || this.mes == "5" || this.mes == "7" || this.mes == "8" || this.mes == "10" || this.mes == "12"){
      dias = 31;
    }
    
    if(this.mes == "2"){
       if ((((this.ano%100)!=0)&&((this.ano%4)==0))||((this.ano%400)==0)){
         dias = 29;
       }
       else{
         dias = 28;
       }
    }
    
    let firstOption = document.createElement("option");
    firstOption.setAttribute("value","");
    firstOption.setAttribute("selected","selected");
    dia.appendChild(firstOption);
    
    for (let i = 1; i<=dias; i++){
      let opcion = document.createElement("option");
      opcion.setAttribute("value",""+i);
      opcion.innerHTML = ""+i;
      dia.appendChild(opcion);
    }
    
  }
  
  onRegisterSubmit(){
    
    this.f_nac = new Date(this.ano, this.mes, this.dia, 0, 0, 0, 0);
      
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