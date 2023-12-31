import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { SharedModule } from '../shared/shared.module';

//* Componentes
import { UserListComponent } from './components/user-list/user-list.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { UsersPageComponent } from './users-page.component';
import { AuthService } from '../services/auth.service';
import { SettingsService } from './services/app.service';
import { GetlistService } from './services/getlist.service';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserListComponent,
    AddEditUserComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersPageRoutingModule
  ],
  providers: [
    AuthService,
    SettingsService,
    GetlistService
  ]
})
export class UsersPageModule { }
