import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { GetlistService } from 'src/app/services/getlist.service';


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
 

  constructor(public dialog: MatDialog, 
              public _getlistService: GetlistService,
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

  
}


