import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
              private _snackBar: MatSnackBar,
              private _userService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: Data) 
  {
    
  }


  deleteBtn() {

      this._userService.deleteUser().subscribe(()=> {
       
        this.mensajeExito();
      })

  }

  noDeleteBtn() {
    this.dialogRef.close();
  }


  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con éxito', '', {
      duration: 2000
    })
  }
}
