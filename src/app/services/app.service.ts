import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, TUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

//   listUser:TUser[] = 
//     [{ id: 1,
//       nombre : 'Steven',
//       apellido : 'Angel',
//       fechaNacimiento : new Date(),
//       email: 'steven@gmail.com',
//       cargo: 'Front end developer',
//       password: 'admin1234',
//     }]
// ; 

  constructor(
    private http: HttpClient,
  ) { }

  getUserList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserList`);
  }

  newUser(data: {EMAIL: string, PASSWORD: string}): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data, { headers: {"Content-Type": "application/json"} } );
  }

  updateUser(data: TUser): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateUser`, data, { headers: {"Content-Type": "application/json"} } );
  }

  deleteUser(data: {EMAIL: string, PASSWORD: string}): Observable<any> {
    
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, { body: data });
  }

  login(data: {EMAIL: string, PASSWORD: string}): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data, { headers: {"Content-Type": "application/json"} } )
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`);
  }

  
  // register(user: {EMAIL: string, PASSWORD: string}): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, user);
  // }


}
