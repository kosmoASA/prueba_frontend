import { Injectable, ViewChild } from '@angular/core';
import { SettingsService } from './app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  usuarios : TUser[];
  dataSource!: MatTableDataSource<TUser>;
 


  constructor(private _userService: SettingsService,
              private _snackBar: MatSnackBar) 
  {
    this.usuarios = [];
  }



  getUserListData() : void {
    this._userService.getUserList().subscribe(resp => {
      this.usuarios = resp.data;
      this.dataSource = new MatTableDataSource(this.usuarios);

    })


  }


  //Implementar mensaje de error
  mensajeErrorLista(error: any ) {
    this._snackBar.open(`Error al obtener la lista de Usuarios: ${ error.message }`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
