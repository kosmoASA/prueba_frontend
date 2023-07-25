import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataUser, Usuario } from 'src/app/empresas/interfaces/main';
import { ListaUsuariosService } from 'src/app/empresas/services/lista-usuarios.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  //* Variables
  form: FormGroup;


  constructor (private fb: FormBuilder,
               private dialogRef: MatDialogRef<AgregarUsuarioComponent>,
               private _listaUsuarioService: ListaUsuariosService,
               @Inject(MAT_DIALOG_DATA) public data: DataUser)
  {
    this.form = this.fb.group({
      NAME_USER: ['', [Validators.required]],
      SURNAME_USER: ['', [Validators.required]]
    })
  }



  ngOnInit(): void {

    if ( this.data.event === 'update' && this.data.user !== null) {

      this.form.reset({
        NAME_USER: this.data.user.NAME_USER,
        SURNAME_USER: this.data.user.SURNAME_USER,
      });
    }
  }


  agregarUsuario() {
    if(this.form.invalid) {
      return;
    }

    const dataUser : Usuario = {
      ID_EMPRESA: this.data.idEmp,
      ID_USER: uuidv4(),
      NAME_USER: this.form.value.NAME_USER,
      SURNAME_USER: this.form.value.SURNAME_USER,
    };

    if (this.data.event === 'new') {
      this._listaUsuarioService.addUser(dataUser);
      this._listaUsuarioService.filterUsersByCompany(this.data.idEmp);
      this.dialogRef.close();
    }

    if (this.data.event === 'update') {
      this._listaUsuarioService.editUser(dataUser);
      this._listaUsuarioService.filterUsersByCompany(this.data.idEmp);
      this.dialogRef.close();
    }


  }

  cancelarAgregar() {
    this.dialogRef.close()
  }

}
