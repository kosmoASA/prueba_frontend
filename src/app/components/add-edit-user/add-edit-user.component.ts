import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TUser } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';

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
  operacionTitulo: string = 'Agregar ';
  id: number | undefined;


  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>, 
              private fb: FormBuilder,
              private _userService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: TUser) 
  {

    this.form = this.fb.group({
      nombre: ['', [ Validators.required]],
      apellido: ['', [ Validators.required ]],
      email: ['', [ Validators.required, Validators.email ]],
      cargo: ['', [ Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8) ]],   
      fechaNacimiento: ['', [ Validators.required]],
      
    });

    this.maxDate = new Date();

    this.id = data.id;
  }


  //* Metodos

  ngOnInit() {
    this.esEditar(this.id);
  }

  cancelarBoton() {
    this.dialogRef.close(false);
  }

  submitAddEditPersona() {

    if(this.form.invalid) {
      return;
    }

    const usuario:TUser = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      password: this.form.value.password,
      fechaNacimiento: this.form.value.fechaNacimiento,
    }
    
    this._userService.newUser(usuario).subscribe(() => {
      
      this.dialogRef.close(true);
      
    })
  }

  esEditar(id: number | undefined) {
    if(id !== undefined){
      this.operacionTitulo = 'Editar ';
    }
  }
}
