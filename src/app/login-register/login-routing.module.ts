import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
 
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: ''},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
