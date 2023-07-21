import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { GetlistService } from '../../services/getlist.service';


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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
              public _getlistService: GetlistService) 
  {
    
  }



  //* Metodos

  ngOnInit() {
    this._getlistService.userSubject$.subscribe((data: TUser[] )=> {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
    });

    this._getlistService.refreshListData();
  }

   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  onUser(user: TUser | null, event: string) {

    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width: '600px',
      data: { 
        user: user,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(()=> {

      this._getlistService.refreshListData();

    })

  }

  
  deleteUser() {
    
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      height: '300px',
      width: '300px'
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this._getlistService.refreshListData();
    });
  }


  
}


