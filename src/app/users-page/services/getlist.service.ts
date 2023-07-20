import { Injectable } from '@angular/core';
import { SettingsService } from './app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from '../../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  private UserSubject = new BehaviorSubject<any>([]);
  public userSubject$ = this.UserSubject.asObservable();
  
  constructor(private _userService: SettingsService,
    private _snackBar: MatSnackBar) 
    {
    
    }
    
  
  refreshListData() {
    this._userService.getUserList().subscribe({
      next: (resp: any) => {
        this.UserSubject.next(resp.data);
      },
      error: (error: any) => {
        this.mensajeErrorLista(error)
      }
    })
  }

  mensajeErrorLista(error: any ) {
    this._snackBar.open(`Error al obtener la lista de Usuarios: ${ error.message }`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    })
  }
}
