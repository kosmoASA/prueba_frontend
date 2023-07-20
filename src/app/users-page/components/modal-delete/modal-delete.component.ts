import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, DeleteUser, TUser } from 'src/app/interfaces/user';
import { GetlistService } from '../../services/getlist.service';
import { SettingsService } from '../../services/app.service';

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

  
  deleteUser() {

    if(this.form.invalid) {
      return;
    }

    const userToDelete: DeleteUser = {
      EMAIL: this.form.value.EMAIL,
    }

    this._userService.deleteUser(userToDelete).subscribe(
      {
        next: (resp: any) => {
          this.mensajeExito(resp);
          this.dialogRef.close();
        },
        error: ({error}) => {
          this.mensajeErrorDelete(error);
        }
      }
    )
  }

  noDeleteBtn() {
    this.dialogRef.close();
  }


  mensajeExito(msg: any ) {
    this._snackBar.open(`${ msg.message }`, '', {
      duration: 4000,
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
