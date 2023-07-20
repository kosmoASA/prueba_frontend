import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login-register/login.component';
import { RegisterComponent } from './login-register/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'users', loadChildren: () => import('./users-page/users-page.module').then(x => x.UsersPageModule), canActivate: [authGuard]},

  { path:'images', loadChildren: () => import('./images-page/images-page.module').then(x => x.ImagesPageModule), canActivate:[authGuard]},

  { path:'converter', loadChildren: () => import('./convertidor-numero/converter-num.module').then(res => res.ConvertidorNumeroModule), canActivate:[authGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }