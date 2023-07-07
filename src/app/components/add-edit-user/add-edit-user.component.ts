import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Data, TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';
import { GetlistService } from 'src/app/services/getlist.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
  
  //* Variables

  cargo: string[] = ['Lead Manager', 'Front end developer', 'Backend developer', 'Otro'];
  form: FormGroup;
  maxDate: Date;
  

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>, 
              private fb: FormBuilder,
              private _userService: SettingsService,
              public _getlistService: GetlistService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Data) 
  {

    this.form = this.fb.group({
      NOMBRE: ['', [ Validators.required]],
      APELLIDO: ['', [ Validators.required ]],
      EMAIL: ['', [ Validators.required, Validators.email ]],
      CARGO: ['', [ Validators.required]],
      PASSWORD: ['', [ Validators.required, Validators.minLength(8) ]],   
      FECHA_NACIMIENTO: ['', [ Validators.required]],
      
    });

    this.maxDate = new Date();


    if ( this.data.event === 'update' && this.data.user !== null) {
      
      this.form.reset({
        NOMBRE : this.data.user.NOMBRE,
        APELLIDO : this.data.user.APELLIDO,
        FECHA_NACIMIENTO : this.data.user.FECHA_NACIMIENTO,
        EMAIL : this.data.user.EMAIL,
        CARGO : this.data.user.CARGO,
        PASSWORD : this.data.user.PASSWORD,

      })

      
    }
  }



  //* Metodos

  

  cancelarBoton() {
    this.dialogRef.close();
  }

  submitAddEditPersona() {

    if(this.form.invalid) {
      return;
    }

    const usuario:TUser = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      EMAIL: this.form.value.EMAIL,
      CARGO: this.form.value.CARGO,
      PASSWORD: this.form.value.PASSWORD,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
    }


    if ( this.data.event === 'new') {
       this._userService.newUser(usuario).subscribe(() => {

         this.dialogRef.close();
         this._getlistService.getUserListData();    
                
      })
    } else {
        this._userService.updateUser(usuario).subscribe(
        {
          next: (resp: any) => {
            
            this.dialogRef.close();
            this._getlistService.getUserListData(); 
          }, error: (error: any) => {
            console.log( error.error);
            
          }
        }
      )
    }

  }
 
}


