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
    
    if(this.authService.loggedIn() && (route.data['ruta'] == 'login' 
                                    || route.data['ruta'] == 'register'
                                    )){
      this.router.navigate(['/dashboard']);
      return false;
    }

    else if(!this.authService.loggedIn() && (route.data['ruta'] == 'login' 
                                          || route.data['ruta'] == 'register'
                                          )){
      return true;
    }
    else if(this.authService.loggedIn() && (route.data['ruta'] == 'dashboard' || route.data['ruta'] == 'profile' )){
      return true;
    }
    else if(!this.authService.loggedIn() 
            && (route.data['ruta'] == 'dashboard' ||
                route.data['ruta'] == 'profile' ||
                route.data['ruta'] == 'admin' ||
                route.data['ruta'] == 'universidades' ||
                route.data['ruta'] == 'liceos' ||
                route.data['ruta'] == 'carreras' ||
                route.data['ruta'] == 'estudiantes' ||
                route.data['ruta'] == 'pnevs' ||
                route.data['ruta'] == 'snis' ||
                route.data['ruta'] == 'indicadores' ||
                route.data['ruta'] == 'asignaciones' ||
                route.data['ruta'] == 'matriculauniv' ||
                route.data['ruta'] == 'ofertauniv'
               )
            ){
      this.router.navigate(['/login']);
      return false;
    }    
    else if(this.authService.loggedIn() 
            && (route.data['ruta'] == 'admin' ||
                route.data['ruta'] == 'universidades' ||
                route.data['ruta'] == 'liceos' ||
                route.data['ruta'] == 'carreras' ||
                route.data['ruta'] == 'estudiantes' ||
                route.data['ruta'] == 'pnevs' ||
                route.data['ruta'] == 'snis' ||
                route.data['ruta'] == 'indicadores' ||
                route.data['ruta'] == 'asignaciones' ||
                route.data['ruta'] == 'matriculauniv' ||
                route.data['ruta'] == 'ofertauniv'
               )
            ){
      if(this.authService.getUserType()._doc.tipo == 'invitado'){
        this.router.navigate(['/home']);
        return false;        
      }
      else{
        return true
      }
    }
    else{
      return true;
    }
    
  }

}
