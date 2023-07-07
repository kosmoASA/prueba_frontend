import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';
import { GetlistService } from 'src/app/services/getlist.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              public _getlistService: GetlistService,
              private _userService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]],
      PASWWORD: ['', Validators.required],
    })

    this.form.patchValue({ EMAIL: data.email })
  }

  
  deleteBtn() {
    const userToDelete = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD,
    }

    this._userService.deleteUser(userToDelete).subscribe((data) => {
      console.log( data );
      this.mensajeExito();
      this.dialogRef.close();
      this._getlistService.getUserListData();
    })

  }

  noDeleteBtn() {
    this.dialogRef.close();
  }


  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
