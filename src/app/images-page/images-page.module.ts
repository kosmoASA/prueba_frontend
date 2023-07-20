import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesPageRoutingModule } from './images-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImagesPageComponent } from './images-page.component';
import { ListaImagenesComponent } from './components/lista-imagenes/lista-imagenes.component';
import { ModalAgregarComponent } from './components/modal-agregar/modal-agregar.component';
import { ModalEliminarImagesComponent } from './components/modal-eliminar/modal-eliminar.component';

@NgModule({
  declarations: [
    ImagesPageComponent,
    ListaImagenesComponent,
    ModalAgregarComponent,
    ModalEliminarImagesComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImagesPageRoutingModule
  ]
})
export class ImagesPageModule { }
