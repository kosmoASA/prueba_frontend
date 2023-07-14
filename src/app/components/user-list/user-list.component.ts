import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { GetlistService } from 'src/app/services/getlist.service';
import { SettingsService } from 'src/app/services/app.service';
import { BehaviorSubject, timer } from 'rxjs';
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

  private UserSubject = new BehaviorSubject<any>([]);
  public userSubject$ = this.UserSubject.asObservable();
  
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
              private _userService: SettingsService,
              private router: Router) 
  {
    
  }

  

  //* Metodos

  ngOnInit() {
    this.UserSubject.subscribe((data: TUser[] )=> {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
    this.refreshListData(true);
  }


  refreshListData(event: any) {
    console.log( event )
    if(event) {
      this._userService.getUserList().subscribe(resp => {
        console.log( resp )
        this.UserSubject.next(resp.data);
      })

    }

  }

   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }


  onUser(user: TUser | null, event: string) {

    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width: '600px',
      data: { 
        user: user,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshListData(true);
    })
  }

  
  deleteUser() {
    
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      height: '350px',
      width: '400px',
      
    })

    dialogRef.afterClosed().subscribe(() => {
      this.refreshListData(true);
    })
  }

  logoutUser() {
    this._userService.logout().subscribe({
      next: (resp: any) => {
        console.log( resp );
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


}


