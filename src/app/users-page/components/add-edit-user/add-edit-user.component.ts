import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, concat, forkJoin, iif, of } from 'rxjs';
import { concatMap, every, map, startWith } from 'rxjs/operators';
import { Cargo, Data, ListaDeCargos, TUser } from 'src/app/interfaces/user';
import { SettingsService } from '../../services/app.service';
import { GetlistService } from '../../services/getlist.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent {

  //* Variables
  form: FormGroup;
  cargoOptions: Cargo[];
  filteredOptions!: Observable<Cargo[]>;

  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>,
              private fb: FormBuilder,
              private _userService: SettingsService,
              public _getlistService: GetlistService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Data)
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


    if ( this.data.event === 'update' && this.data.user !== null) {

      this.form.reset({
        NOMBRE : this.data.user.NOMBRE,
        APELLIDO : this.data.user.APELLIDO,
        FECHA_NACIMIENTO : this.data.user.FECHA_NACIMIENTO,
        EMAIL : this.data.user.EMAIL,
        ID_CARGO : this.form.value.CARGO,
        PASSWORD : this.data.user.PASSWORD,

      })
    }

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
    this._userService.getPositionList().subscribe((data: ListaDeCargos) => {
      this.cargoOptions = data.data;
    })
  }

  getIdCargo(dataId: string): number{
    const id = dataId.split('-')[0];
    return Number(id);
  }

  cancelarBoton() {
    this.dialogRef.close();
  }

  // handleUpdateOrCreate(userData$: Observable<any>) {


  //   userData$.pipe(
  //     concatMap((resp1: any): Observable<any> => {
  //       if(!resp1) {
  //         this.mensajeError(resp1)
  //       }
  //       return resp1
        
  //     })
  //   )
  //   .subscribe({
  //     next: (resp2: any) => {
  //       console.log( resp2 )
  //       // this.refreshListData();
  //     },
  //     error: (error) => {
  //       this.mensajeError(error)
  //     }
  //   })
  // }


  submitModalUser() {

    if(this.form.invalid) {
      return;
    }

    const usuario:TUser = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      EMAIL: this.form.value.EMAIL,
      ID_CARGO: this.getIdCargo(this.form.value.ID_CARGO),
      PASSWORD: this.form.value.PASSWORD,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
    }

    // if(this.data.event === 'new') {
    //   const newUserData$ = this._userService.newUser(usuario);
    //   this.handleUpdateOrCreate(newUserData$)

    // };

    // if(this.data.event === 'update') {
    //   const updateUserData$ = this._userService.updateUser(usuario);
    //   this.handleUpdateOrCreate(updateUserData$)
    // };
    

    if ( this.data.event === 'new') {
      this._userService.newUser(usuario).subscribe(
        {
          next: (resp: any) => {
            this.dialogRef.close();
            this.mensajeExito(resp);
          },
          error: ({error}) => {
            this.mensajeError(error);
          }
        }
      )
    } else {
        this._userService.updateUser(usuario).subscribe(
        {
          next: ( resp: any) => {

            this.dialogRef.close();
            this.mensajeExito(resp);
          },
          error: ({error}) => {
            this.mensajeError(error);
          }
        }
      )
    }

  }


  mensajeError(error: any ) {
    this._snackBar.open(`Error: ${ error.message }`, 'Oppps!!!', {
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


