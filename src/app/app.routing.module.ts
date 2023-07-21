import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login-register/login.component';
import { RegisterComponent } from './login-register/register/register.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirigir al modulo login
  { path: 'login', children:[
    {path: '', loadChildren: () => import('./login-register/login.module').then(x => x.LoginModule)}] 
  },
  { path: 'users', children: [
    {path: '', loadChildren: () => import('./users-page/users-page.module').then(x => x.UsersPageModule)}], 
  },
  { path: 'images', children: [
    {path: '', loadChildren: () => import('./images-page/images-page.module').then(x => x.ImagesPageModule)}], 
  },
  { path: 'converter', children: [
    {path: '', loadChildren: () => import('./convertidor-numero/converter-num.module').then(x => x.ConvertidorNumeroModule)}]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }