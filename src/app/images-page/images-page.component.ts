import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getListService } from './services/get-list.service';
import { ApiService } from './services/api.service';
import { ModalAgregarComponent } from './components/modal-agregar/modal-agregar.component';
;

@Component({
  selector: 'app-ventana-images',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.css']
})
export class ImagesPageComponent {

  constructor(public dialog: MatDialog,
              private _getListService: getListService,
              private _apiService: ApiService)
  {

  }

  ngOnInit () {
    this._getListService.refreshListImage()
  }


  onAddImage() { //Abre el modal de Agregar Imagen

    const dialogRef = this.dialog.open(ModalAgregarComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {

      this._getListService.refreshListImage();

    });
    
  }
}
