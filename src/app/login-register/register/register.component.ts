import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, map, startWith } from 'rxjs';
import { Cargo, ListaDeCargos, TUser, UserLogin } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/login-register/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  cargoOptions: Cargo[];
  filteredOptions!: Observable<Cargo[]>;

  maxDate: Date;

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private _loginService: LoginService,
              private router: Router) 
  {
    this.form = this.fb.group({
      NOMBRE: ['', [ Validators.required]],
      APELLIDO: ['', [ Validators.required ]],
      EMAIL: ['', [ Validators.required, Validators.email ]],
      ID_CARGO: ['', [ Validators.required]],
      PASSWORD: ['', [ Validators.required, Validators.minLength(8) ]],   
      FECHA_NACIMIENTO: ['', [ Validators.required]],
    });

    this.cargoOptions = [];
    this.maxDate = new Date();
  }


  //* Metodos

  ngOnInit () {
    this.getCargo();

    this.filteredOptions = this.form.controls['ID_CARGO'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): Cargo[] {
    const filterValue = value.toLowerCase();
    return this.cargoOptions.filter(option => option.CARGO.toLowerCase().includes(filterValue));
  }


  getCargo () {
    this._loginService.getPositionList().subscribe((data: ListaDeCargos) => {
      this.cargoOptions = data.data;
    })
  }

  getIdCargo(dataId: string): number{
    const id = dataId.split('-')[0];
    return Number(id);
  }
  

  async registerUser() {

    if(this.form.invalid) {
      return;
    }

    const userRegister: TUser = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      EMAIL: this.form.value.EMAIL,
      ID_CARGO: this.getIdCargo(this.form.value.ID_CARGO),
      PASSWORD: this.form.value.PASSWORD,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
    }

    try {

      const register$ = this._loginService.newUser(userRegister);
      const addRegister = await lastValueFrom(register$);

      this.mensajeExito();
      this.router.navigate(['login']);

    } catch (error) {

      this.mensajeErrorRegistro(error);
      
    }


    // this._userService.newUser(userRegister).subscribe(
    //   { 
    //     next: (resp: any) => {
    //       console.log( 'el usuario ha sido registrado con éxito' );
    //       this.mensajeExito();
    //       this.router.navigate(['login']);
    //     },
    //     error: ( error ) => {
    //       this.mensajeErrorRegistro(error);
    //     }
    //   }
    // )
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

  mensajeErrorRegistro ( error: any ) {
    this._snackBar.open(`Error al registrar usuario: ${ error.message }`, 'Oppps!!', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
