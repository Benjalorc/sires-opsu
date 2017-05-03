import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

    authToken: any;
    user: any;

  constructor(private http: Http) { }

    registerUser(user){
        'use strict'
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/users/register', user, {headers: headers})
            .map(res => res.json());
    }


     authenticateUser(user){
        'use strict'
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/users/authenticate', user, {headers: headers})
            .map(res => res.json());
    }
    
    getProfile(){
        'use strict'
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get('http://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/users/profile', {headers: headers})
            .map(res => res.json());
    }
    
    loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    
    loggedIn() {
        this.loadToken();
        //console.log(tokenNotExpired('id_token'));
        return tokenNotExpired('id_token');
    }
    
    storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    
    logout(){
        this.authToken = null;
        this.user = null;
        window.localStorage.clear();
    }

}