import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

//* Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http' 
import { SettingsService } from './services/app.service';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//* Providers
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { GetlistService } from './services/getlist.service';
// import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddEditUserComponent,
    ModalDeleteComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    GetlistService,
    CookieService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue:  JWT_OPTIONS },
    // { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
