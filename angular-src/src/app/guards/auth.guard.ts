import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService} from '../services/auth/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  
  
  constructor(private authService: AuthService,
              private router: Router
    ){
  }
  
  canActivate(route: ActivatedRouteSnapshot){
    
    if(this.authService.loggedIn() && (route.data['ruta'] == 'login' || route.data['ruta'] == 'register')){
      this.router.navigate(['/dashboard']);
      return false;
    }
    else if(!this.authService.loggedIn() && (route.data['ruta'] == 'login' || route.data['ruta'] == 'register')){
      return true;
    }
    else if(this.authService.loggedIn() && (route.data['ruta'] == 'dashboard' || route.data['ruta'] == 'profile' || route.data['ruta'] == 'admin' )){
      return true;
    }
    else if(!this.authService.loggedIn() && (route.data['ruta'] == 'dashboard' || route.data['ruta'] == 'profile' || route.data['ruta'] == 'admin' )){
      this.router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
    
  }

}
