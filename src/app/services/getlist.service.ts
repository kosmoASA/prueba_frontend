import { Injectable } from '@angular/core';
import { SettingsService } from './app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  
  
  constructor(private _userService: SettingsService,
    private _snackBar: MatSnackBar) 
    {
    
    }
    
  
  

  //Implementar mensaje de error - PENDIENTE
  mensajeErrorLista(error: any ) {
    this._snackBar.open(`Error al obtener la lista de Usuarios: ${ error.message }`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    })
  }
}
