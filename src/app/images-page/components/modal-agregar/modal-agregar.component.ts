import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { getListService } from '../../services/get-list.service';


@Component({
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.css']
})

export class ModalAgregarComponent {

  //* Variables
  
  form: FormGroup;
  maxDate: Date;
  files: File[] = [];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<ModalAgregarComponent>,
              private _apiService: ApiService,
              private _getListService: getListService,
              // private _snackBar: MatSnackBar
              )
  {
    this.form = this.fb.group({
      imagen : [null, [Validators.required]],
      fecha: ['', [Validators.required]],
    });

    this.maxDate = new Date();
  }



  agregarImagen() {

    if(this.form.invalid) {
      return;
    }
    
    const data = this.form.value;
    const formData = new FormData();
    formData.append('ARCHIVO', data.imagen);

    
    this._apiService.newFile(formData).subscribe({
      next: (resp: any) => {
        this._getListService.mensajeExito(resp);
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.log( error )
        this._getListService.mensajeError(error);
      }
    })

  }

  onSelect(event: any) {
    // console.log(event);
    this.form.patchValue({imagen: event.addedFiles[0]})
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  

}
