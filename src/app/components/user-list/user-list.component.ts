import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { SettingsService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  //* Variables

  displayedColumns: string[] = [
    'NOMBRE',
    'APELLIDO',
    'FECHA_NACIMIENTO',
    'EMAIL',
    'CARGO',
    'PASSWORD',
    'acciones'
  ];
 
  dataSource!: MatTableDataSource<TUser>;
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, 
              private _userService: SettingsService,
              private _snackBar: MatSnackBar) 
  {

    
  }


  ngOnInit(): void {
    this.getUser();
    
  }

  //* Metodos

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUser() {
    this._userService.getUserList().subscribe(resp => {
      console.log( resp.data );
      
      this.dataSource = new MatTableDataSource(resp.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getUser();
      }
    });
  }

  // get listUser() {
  //   return this._userService.listUser;
  // }


  deleteUser(email: string) {
    this._userService.deleteUser(email).subscribe(()=>{});
    this.getUser();
    this.mensajeExito();
  }

  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con éxito', '', {
      duration: 2000
    })
  }
}


