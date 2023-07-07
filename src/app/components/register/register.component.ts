import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user';
import { SettingsService } from 'src/app/services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private _userService: SettingsService,
              private router: Router) 
  {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]] ,
      PASSWORD: ['', [Validators.required, Validators.minLength(8)]],
      CONFIRM_PASSWORD: ['', [Validators.required, Validators.minLength(8)]],

    })
  }


  registerUser() {
    if(this.form.invalid) {
      return;
    }

    if(this.form.value.PASSWORD !== this.form.value.CONFIRM_PASSWORD ) {
      this.mensajeError();
      return;
    }

    const userRegister: UserLogin = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD,
    }

    this._userService.login(userRegister).subscribe({ //Hay que cambiar la petición por newUser
      next: (resp: any) => {
        console.log( 'el usuario fue registrado con éxito' );
        this.mensajeExito();
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        console.log( err.error )
      }
    })
  }


  mensajeExito () {
    this._snackBar.open('El usuario ha sido registrado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  mensajeError () {
    this._snackBar.open('Las contraseñas no coinciden', 'Oppps!!', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
