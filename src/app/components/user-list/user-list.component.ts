import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { GetlistService } from 'src/app/services/getlist.service';
import { SettingsService } from 'src/app/services/app.service';
import { map, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  //* Variables
  loading = false;

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
              private router: Router,
              ) 
  {
    
    
  }


  ngOnInit(): void {
    this.getUser();
  }

  //* Metodos

   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._getlistService.dataSource.filter = filterValue.trim().toLowerCase();
  
  }

  getUser() {
    this._getlistService.getUserListData();  
  }

  onUser(user: TUser | null, event: string) {
        

    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width: '600px',
      data: { 
        user: user,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getUser();
      }
    });
  }

  
  deleteUser() {
    
    const dialogDelete = this.dialog.open(ModalDeleteComponent, {
      width: '250px'
      
    })

    dialogDelete.afterClosed().subscribe(result => {
    
      this.getUser();
      
    });

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


