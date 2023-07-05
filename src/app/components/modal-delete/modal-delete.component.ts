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

  @ViewChild('passwordInput') public passwordInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.editPassword();
  }

  editPassword() {
    this.user = {
      EMAIL: this.data.EMAIL,
      PASSWORD: this.passwordInput.nativeElement.value,
    }
  }

  deleteBtn(): void {
    
    this._userService.deleteUser(this.user.EMAIL, this.user.PASSWORD).subscribe(
      {
        next: (resp: any) => {
          console.log( resp );
          
          this.dialogRef.close()
          this.mensajeExito();
          window.location.href = './index.html'
          
        }, error: (error: any) => {
          console.log( error );
          throw new Error('Error al eliminar el usuario');
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
