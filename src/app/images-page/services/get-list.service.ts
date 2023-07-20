import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class getListService {

  private ListDataSubject = new BehaviorSubject<any>([]);
  public ListDataSubject$ = this.ListDataSubject.asObservable();

  constructor(private _apiService: ApiService,
              private _snackBar: MatSnackBar) 
  { 

  }


  refreshListImage() {
    this._apiService.getFileList().subscribe({
      next: (resp: any) => {
        this.ListDataSubject.next(resp.data)
      },
      error: (error: any ) => {
        console.log( error )
      }
    })
  }


  mensajeExito(msg: any ) {
    this._snackBar.open(`${ msg.message }`, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  mensajeError(error: any ) {
    this._snackBar.open(`ERROR: ${ error.message }`, 'Oppps!!!', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}


