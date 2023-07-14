import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUser, TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { GetlistService } from 'src/app/services/getlist.service';
import { SettingsService } from 'src/app/services/app.service';
import { BehaviorSubject, Observable, concatMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  //* Variables
  loading = false;
  usuarios : TUser[] = [];
  dataSource!: MatTableDataSource<TUser>;

  private UserSubject$ = new BehaviorSubject<any>([]);
  
  displayedColumns: string[] = [
    'NOMBRE',
    'APELLIDO',
    'FECHA_NACIMIENTO',
    'EMAIL',
    'ID_CARGO',
    'PASSWORD',
    'acciones'
  ];
 

  constructor(public dialog: MatDialog, 
              public _getlistService: GetlistService,
              public _authService: AuthService,
              private _snackBar: MatSnackBar,
              private _userService: SettingsService,
              private router: Router) 
  {
    
  }

  

  //* Metodos

  ngOnInit() {
    this.UserSubject$.subscribe((data: TUser[] )=> {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
    })

    this.refreshListData();
  }


  refreshListData() {
    
    this._userService.getUserList().subscribe(resp => {
      this.UserSubject$.next(resp.data);
    })

  }

   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }

  handleUpdateOrCreate(event: string, userData$: Observable<any>) {
    userData$.pipe(
      concatMap((resp1: any): Observable<any> => {
        if(!resp1) this.mensajeError(event);
        return this.UserSubject$;
      })
    )
    .subscribe({
      next: (resp2: any) => {
        this.refreshListData()
      },
      error: (error) => {
        this.mensajeError(error)
      }
    })
  }


  onUser(user: TUser | null, event: string) {

    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width: '600px',
      data: { 
        user: user,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe((usuario)=> {

      if(event === 'new') {
        const newUserData$ = this._userService.newUser(usuario);
        this.handleUpdateOrCreate('crear', newUserData$)
      };

      if(event === 'update') {
        const updateUserData$ = this._userService.updateUser(usuario);
        this.handleUpdateOrCreate('actualizar', updateUserData$)
      };

      this.refreshListData();
    })

  }

  
  deleteUser() {
    
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      height: '300px',
      width: '300px'
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.refreshListData();
    });
  }

  logoutUser() {
    this._userService.logout().subscribe({
      next: (resp: any) => {
        
        this._authService.deleteToken();
        this.redirectLogin();
      },
      error: (err: any) => {
        console.log( err.error )
      }
    })
  }
  

  redirectLogin(){
    this.loading = true;
    const navLogin = timer(1000);
    navLogin.subscribe(() => this.router.navigate(['login']));
  }

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


