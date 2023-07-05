import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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

  public user:any;

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
              private _snackBar: MatSnackBar,
              private _userService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    
  }

  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>;


  editPassword() {
    this.user = {
      EMAIL: this.data.EMAIL,
      PASSWORD: this.tagInput.nativeElement.value,
    }
  }

  deleteBtn() {
    
    this._userService.deleteUser(this.user.EMAIL, this.user.PASSWORD).subscribe(
      {
        next: (resp: any) => {
          console.log( resp );
          
          window.location.href = './index.html'
          this.dialogRef.close()
          this.mensajeExito();
          
        }, error: (error: any) => {
          console.log( error );
          
        }
      }
    )

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
