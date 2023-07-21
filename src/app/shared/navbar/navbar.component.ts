import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LoginService } from 'src/app/login-register/services/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    
  constructor(private _loginService: LoginService,
              private _authService: AuthService, 
              private _snackBar: MatSnackBar,
              private router: Router) 
  {

  }

  logoutUser() {
    this._loginService.logout().subscribe({
      next: (resp: any) => {
        
        this._authService.deleteToken();
        this.mensajeExito(resp)
      },
      error: (error: any) => {
        this.mensajeError(error)
      },
      complete: () => {
        const navLogin = timer(1000);
        navLogin.subscribe(() => this.router.navigate(['login']));
      }
    })
  }
  

  // redirectLogin(){
  //   this.loading = true;
    
  // }

  mensajeError(error: any ) {
    this._snackBar.open(`Error: ${ error }`, 'Oppps!!!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  mensajeExito(msg: any ) {
    this._snackBar.open(`${ msg.message }`, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
