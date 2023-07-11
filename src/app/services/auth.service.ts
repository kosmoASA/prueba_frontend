import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _cookieService: CookieService, private jwtHelper: JwtHelperService) { 
  
  }
  
  getToken() {
    const access_token = this._cookieService.get('access_token'); 
    return access_token;
  }

  setToken(token: string) {
    this._cookieService.set('access_token', token);
  }


  deleteToken() {
    this._cookieService.delete('access_token');
  }

  // isLogged():boolean {
    
  //   const token = localStorage.getItem('access_token');

  //   if(this.jwtHelper.isTokenExpired(token) || !token ) {
  //     return false;
  //   }

  //   return true;
  // }

  
}
