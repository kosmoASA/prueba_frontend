import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertidorNumeroRoutingModule } from './converter-num-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConverterComponent } from './converter.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NumberChangePipe } from './pipes/number-change.pipe';


@NgModule({
  declarations: [
    ConverterComponent,
    DialogComponent,
    NumberChangePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConvertidorNumeroRoutingModule
  ]
})
export class ConvertidorNumeroModule { }
