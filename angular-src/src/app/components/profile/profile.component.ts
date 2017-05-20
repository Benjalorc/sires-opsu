import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user:Object;
  userBackup:Object;
  edit: boolean;
  mainActioned: boolean;
  
  constructor(private validateService: ValidateService,
              private authService : AuthService, 
              private router : Router, 
              private flashMessage: FlashMessagesService,) {   }

  ngOnInit() {
    
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, 
    err => { 
      console.log(err);
      return false; 
    });
    this.edit = false;
    this.mainActioned = false;
  }
  
  respaldar(user){
    this.userBackup = {
      "cedula": user.cedula,
      "nombre": user.nombre,
      "apellido": user.apellido,
      "username": user.username,
      "password": user.password,
      "email": user.email,
      "sexo": user.sexo,
      "f_nac": user.f_nac
    }
  }
  reestablecer(userBackup){
    
    this.user=userBackup;
  }
  
  enableEdit(){
    this.respaldar(this.user);
    this.edit = true;
    this.mainActioned = true;
  }
  cancelEdit(){
    this.reestablecer(this.userBackup);
    this.edit = false;
    this.mainActioned = false;
  }
  
  editUser(user){
    'use strict';
    const upUser = {
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      sexo: user.sexo
    }
    let go = true;

    if(!this.validateService.validateEmail(upUser.email)){
      
      this.flashMessage.show('Correo invalido!', { cssClass: 'alert-danger', timeout: 3000 });
      go = false;
    }
    
    if(!this.validateService.validateUpdate(upUser)){
      
      this.flashMessage.show('Rellene todos los campos!', { cssClass: 'alert-danger', timeout: 3000 });
      go = false;
    }
    if(go){

      this.authService.updateUser(upUser).subscribe(data => {
            
            if(data.success){
              this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
              this.edit = false;
            }
            else{
              this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
              this.cancelEdit();
            }
            this.mainActioned = false;
      },
      err =>{
        console.log(err);
        this.reestablecer(this.userBackup);
        this.mainActioned = false;
        return false;
      });
    }
  }
  
  deleteUser(user){
    if(confirm('¿Se encuentra seguro de querer eliminar su usuario?')){
      this.authService.deleteUser(user._id).subscribe(data => {
      
        if(data.success){
          this.authService.logout();
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  
}