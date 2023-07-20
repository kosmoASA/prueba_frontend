import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TUser, UserLogin } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(private http: HttpClient) { }

  login(data: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data, 
    { headers: {'Content-Type': 'application/json', credentials: "include"} });
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`);
  }

  getPositionList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getPositionList`);
  }

  newUser(data: TUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data, { headers: {"Content-Type": "application/json"} } );
  }
}
