import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarImagesComponent {

  

  constructor(public dialogRef: MatDialogRef<ModalEliminarImagesComponent>) 
  {
    
  }


  deleteImage() {
    this.dialogRef.close(true);
  }

  noDelete() {
    this.dialogRef.close(false);
  }
}
