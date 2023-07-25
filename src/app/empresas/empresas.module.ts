import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { AgregarEmpresaComponent } from './components/agregar-empresa/agregar-empresa.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { TablaEmpresasComponent } from './components/tabla-empresas/tabla-empresas.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { EmpresasPrincipalComponent } from './empresas.component';


@NgModule({
  declarations: [
    AgregarEmpresaComponent,
    AgregarUsuarioComponent,
    DialogDeleteComponent,
    TablaEmpresasComponent,
    TablaUsuariosComponent,
    EmpresasPrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmpresasRoutingModule
  ]
})
export class EmpresasPrincipalModule { }
