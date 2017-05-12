import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user:Object;

  constructor(private authService : AuthService, private router : Router, private flashMessage: FlashMessagesService,) {   }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, 
    err => { 
      console.log(err);
      return false; 
    });
  }
  
  deleteUser(){
      this.authService.deleteUser(this.user).subscribe(users => {
    
      this.authService.logout();
      this.flashMessage.show('El usuario ha sido eliminado', { cssClass: 'alert-danger', timeout: 5000 });
      this.router.navigate(['/login']);
      return false;
      
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
