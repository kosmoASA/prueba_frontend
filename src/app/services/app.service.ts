import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, TUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = 'http://kosmetikon.myqnapcloud.com:8769';

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

  newUser(data: TUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data, { headers: {"Content-Type": "application/json"} } );
  }

  updateUser(data: TUser): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateUser`, data, { headers: {"Content-Type": "application/json"} } );
  }

  deleteUser(emailUser: string, passwordUser: string): Observable<any> {
    const data = {EMAIL: emailUser, PASSWORD: passwordUser}
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, { body: data});
  }


// NOTA 
// se ha puesto en todos los casos this.http.post
// se debe cambiar por GET, POST, PUT, DELETE en cada caso
// ejemplo getUserList deberia ser: 
//  return this.http.get<any[]>(`${this.baseUrl}/settings/saveDBDataInEnvFile`);
// ejemplo newUser deberia ser: 
//  return this.http.post<any>(`${this.baseUrl}/settings/saveDBDataInEnvFile`, { data: data });
// 
// NOTA
// el parametro data se tendra que poner por el tipo definido.

// coordinar esta información con el Equipo de backend la URL de la nube


}
