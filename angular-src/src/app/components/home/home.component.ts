import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn: Boolean;

  constructor(public authService: AuthService,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    
    if(this.authService.loggedIn()){
      this.loggedIn = true;
    }
  }

}
