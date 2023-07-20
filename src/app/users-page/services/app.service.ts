import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cargo, Data, DeleteUser, TUser, UserLogin } from '../../interfaces/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(
    private http: HttpClient,
  ) { }

  getUserList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserList`);
  }

  newUser(data: TUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data, { headers: {"Content-Type": "application/json"} } );
  }

  updateUser(data: TUser): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateUser`, data, 
    { headers: {"Content-Type": "application/json"} } );
  }

  deleteUser(data: DeleteUser): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, 
    { body: data});
  }  

  getPositionList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getPositionList`);
  }

}
