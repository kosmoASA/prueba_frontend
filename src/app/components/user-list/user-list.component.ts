import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { SettingsService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';


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
              ) 
  {

    
  }


  ngOnInit(): void {
    this.getUser();
    
  }

  //* Metodos

   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUser() {
    this._userService.getUserList().subscribe(resp => {
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

  
  deleteUser(user:TUser | null, event: string) {
    
    const dialogDelete = this.dialog.open(ModalDeleteComponent, {
      width: '250px',
      data: {
        user: user,
        event: event,
      }
    })

    dialogDelete.afterClosed().subscribe(result => {
      
      this.getUser();
      
    });

  }

  
}


