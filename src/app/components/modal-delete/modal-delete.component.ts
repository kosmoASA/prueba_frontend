import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, DeleteUser, TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';
import { GetlistService } from 'src/app/services/getlist.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              public _getlistService: GetlistService,
              private _userService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]],
    });

  }

  
  deleteBtn() {

    if(this.form.invalid) {
      return;
    }

    const userToDelete: DeleteUser = {
      EMAIL: this.form.value.EMAIL,
    }
    console.log( userToDelete )

    this._userService.deleteUser(userToDelete).subscribe({
      next: (resp: any) => {
        this.dialogRef.close();
        this.mensajeExito();
        this._getlistService.getUserListData();
      },
      error: ({error}) => {
        this.mensajeErrorDelete(error);
      }
  
    })

  }

  noDeleteBtn() {
    this.dialogRef.close();
  }


  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con éxito', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  mensajeErrorDelete(error: any ) {
    this._snackBar.open(`Error: ${ error.message }`, 'Oppps!!!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
