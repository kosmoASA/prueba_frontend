import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/user';

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



    const userLogin: UserLogin = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD,
      CONFIRM_PASSWORD: this.form.value.CONFIRM_PASSWORD
    }

    if(userLogin.EMAIL === 'steven@gmail.com' && userLogin.PASSWORD === 'admin123'){
      //Redirecciono al home
      this.redirectHome();
    } else {
      // mostrar mensaje de error
      this.errorMessage();
      this.form.reset();
    }

  }


  errorMessage(){
    this._snackBar.open('El Usuario o Contraseña ingresados no son validos', 'Oppps!!', {
      duration: 5000,
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
