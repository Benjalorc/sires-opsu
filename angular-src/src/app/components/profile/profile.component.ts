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
      console.log(this.user);
    }, 
    err => { 
      console.log(err);
      return false; 
    });
  }
  
  deleteUser(user){
    if(confirm('¿Se encuentra seguro de querer eliminar su usuario?')){
      this.authService.deleteUser(user._id).subscribe(data => {
        
        document.querySelector("nav").focus();
      
        if(data.success){
          this.authService.logout();
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/login']);
        }else{
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  
}