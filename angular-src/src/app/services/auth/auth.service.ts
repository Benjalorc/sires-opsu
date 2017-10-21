import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
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
        return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
            .map(res => res.json());
    }

     authenticateUser(user){
        'use strict'
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
            .map(res => res.json());
    }
    
    getProfile(){
        'use strict'
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get('http://localhost:8080/users/profile',{headers: headers})
            .map(res => res.json());
    }
    
    
    updateUser(user){
        'use strict';
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.put('http://localhost:8080/users/update', user, {headers: headers})
            .map(res => res.json());
    }    
    
    deleteUser(userId){
        'use strict';
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete('http://localhost:8080/users/delete', new RequestOptions({ headers: headers, body: {id: userId}}))
            .map(res => res.json());
    }
    
    loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    
    loggedIn() {
        this.loadToken();
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