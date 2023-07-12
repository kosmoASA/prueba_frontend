import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Data, TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';
import { GetlistService } from 'src/app/services/getlist.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent {
  
  //* Variables
 
  cargoOptions: string[] = ['Lead Manager', 'Front end developer', 'Backend developer', 'Otro'];

  filteredOptions: string[];

  form: FormGroup;
  maxDate: Date;
  

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>, 
              private fb: FormBuilder,
              private _userService: SettingsService,
              public _getlistService: GetlistService,
              private _snackBar: MatSnackBar,
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
    this.filteredOptions = [];
    
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

  ngOnInit () {
    this.filteredOptions = this.cargoOptions;

    this.form.get('CARGO')?.valueChanges.subscribe(resp => {
      this.filterDataCargo(resp);
    })
  }

  filterDataCargo( cargoData: string ) {
    this.filteredOptions = this.cargoOptions.filter( item => {
      return item.toLowerCase().indexOf(cargoData.toLowerCase()) >= 0;
    })

  }

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
          next: ( resp: any) => {
            
            this.dialogRef.close();
            this._getlistService.getUserListData(); 
          }, error: ({error}) => {
            this.mensajeErrorUpdate(error);
          }
        }
      )
    }

  }


  mensajeErrorUpdate(error: any ) {
    this._snackBar.open(`Error: ${ error.message }`, 'Oppps!!!', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  

}


