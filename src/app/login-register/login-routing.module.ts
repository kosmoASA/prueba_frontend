import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
 
  { path:"", component: LoginComponent, children: [
    { path: "register", component: RegisterComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full'},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }