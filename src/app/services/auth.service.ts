import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _cookieService: CookieService) { 
  
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


  
}
