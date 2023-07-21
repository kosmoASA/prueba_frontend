import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/user';
import { LoginService } from './services/login.service';

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
              private _loginService: LoginService,
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

    this._loginService.login(userLogin).subscribe({
      next: (resp: any) => {
        this.mensajeExitoLogin(resp);
        this.redirectHome();
      },
      error: ( error: any ) => {
        this.mensajeErrorLogin(error)
      }
    })
  }


  mensajeErrorLogin(error: any ) {
    this._snackBar.open(`Error: ${ error.message }`, 'Oppps!!!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  mensajeExitoLogin(msg: any) {
    this._snackBar.open(`${ msg.message }`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  redirectHome(){
    this.loading = true;

    const navHome = timer(1000);
    navHome.subscribe(() => this.router.navigate(['users']));

  }


}
