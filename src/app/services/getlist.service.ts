import { Injectable } from '@angular/core';
import { SettingsService } from './app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  usuarios : TUser[];
  dataSource!: MatTableDataSource<TUser>;


  constructor(private _userService: SettingsService,
              private _snackBar: MatSnackBar,
              private _cookieService: CookieService,
              private _liveAnnouncer: LiveAnnouncer) 
  {
    this.usuarios = [];
   
  }

  ngAfterViewInit () {

  }


  getUserListData() : void {
    this._userService.getUserList().subscribe(resp => {
      this.usuarios = resp.data;
      this.dataSource = new MatTableDataSource(this.usuarios);
      
      // localStorage.setItem('access_token', resp.token);
      this._cookieService.set('access_token', resp.token);
    })
  }

  

  //Implementar mensaje de error
  mensajeErrorLista(error: any ) {
    this._snackBar.open(`Error al obtener la lista de Usuarios: ${ error.message }`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    })
  }
}
