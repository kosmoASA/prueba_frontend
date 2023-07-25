import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataEmpresa, Empresa, listaEmpresa } from 'src/app/empresas/interfaces/main';
import { v4 as uuidv4 } from 'uuid';
import { ListaEmpresaService } from '../../services/lista-empresa.service';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.css']
})
export class AgregarEmpresaComponent implements OnInit{

  //* Variables

  form: FormGroup;

  constructor (private fb: FormBuilder,
               private dialogRef: MatDialogRef<AgregarEmpresaComponent>,
               private _listaEmpresaService: ListaEmpresaService,
               @Inject(MAT_DIALOG_DATA) public data: DataEmpresa)
  {
    this.form = this.fb.group({
      NAME_EMPRESA: ['', [Validators.required]],
      PHONE_EMPRESA: ['', [Validators.required, Validators. minLength(10)]]
    })
    
  }


  ngOnInit(): void {

   if ( this.data.event === 'update' && this.data.empresa !== null) {

      this.form.reset({
        NAME_EMPRESA: this.data.empresa.NAME_EMPRESA,
        PHONE_EMPRESA: this.data.empresa.PHONE_EMPRESA,
      });
    }
    
  }


  agregarEmpresa(){

    if(this.form.invalid) {
      return;
    }

    let dataEmpresa : Empresa = {
      ID_EMPRESA: uuidv4(),
      NAME_EMPRESA: this.form.value.NAME_EMPRESA,
      PHONE_EMPRESA: this.form.value.PHONE_EMPRESA,
    };
    
    if (this.data.event === 'new') {
      this._listaEmpresaService.addEmpresa(dataEmpresa);
      this.dialogRef.close();
    }

    if (this.data.event === 'update') {
      this._listaEmpresaService.editEmpresa(dataEmpresa);
      this.dialogRef.close();
    }
    
    
  }


  cancelarAgregar() {
    this.dialogRef.close();
  }
}
