import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from 'src/app/interfaces/user';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { SettingsService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const listUsers: TUser[] = [
  {
    nombre: "dadasda",
    apellido: "dadasda",
    fechaNacimiento: new Date(),
    email: "dadasda",
    cargo: "dadasda",
    password: "dadasda"
  }
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  //* Variables

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'fechaNacimiento',
    'email',
    'cargo',
    'password',
    'acciones'
  ];
 
  dataSource: MatTableDataSource<TUser>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, 
              private _userService: SettingsService,
              private _snackBar: MatSnackBar) 
  {
    this.dataSource = new MatTableDataSource(listUsers);
  }


  ngOnInit(): void {
    this.getUser();
  }

  //* Metodos

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditUser() {
    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUser() {
    this._userService.getUserList().subscribe(data => {
      console.log( data );
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteUser(id:number) {
    this._userService.deleteUser(id).subscribe(()=>{});
    this.getUser();
    this.mensajeExito();
  }

  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con éxito', '', {
      duration: 2000
    })
  }
}


