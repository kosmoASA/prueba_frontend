import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { tokenGuard } from './guards/token.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent , canActivate: [tokenGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'home', 
    loadChildren: () => import('./components/user-list/user-list.module').then(x => x.UserListModule), 
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }