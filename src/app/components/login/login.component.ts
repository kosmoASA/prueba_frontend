import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { timer } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private _userService: SettingsService,
              private _authService: AuthService,
              private router: Router)
  {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]] ,
      PASSWORD: ['', [Validators.required, Validators.minLength(8)]],
      CONFIRM_PASSWORD: ['', [Validators.required, Validators.minLength(8)]],

    })

    
  }



  //* Metodos

  login() {

    if(this.form.invalid) {
      return;
    }

    if(this.form.value.PASSWORD !== this.form.value.CONFIRM_PASSWORD ) {
      this._snackBar.open('Las contraseñas no coinciden', 'Oppps!!', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      return;
    }

    const userLogin: UserLogin = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    }

    this._userService.login(userLogin).subscribe({
      next: (resp: any) => {
        console.log( resp );
        this._authService.setToken(resp.token);
        this.redirectHome();
      },
      error: ({ error }) => {
        this.mensajeErrorLogin(error)
      }
    })
  }


  mensajeErrorLogin(error: any ) {
    this._snackBar.open(`Error: ${ error.message }`, 'Oppps!!!', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  redirectHome(){
    this.loading = true;

    const navHome = timer(1000);
    navHome.subscribe(() => this.router.navigate(['home']));

  }


}
