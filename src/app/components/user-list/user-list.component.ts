import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from 'src/app/interfaces/user';


const listUsers: TUser[] = [
  {
    nombre: "Steven",
    apellido: "Angel",
    fechaNacimiento: new Date(),
    email: "steven@gmail.com",
    cargo: "Presidente",
    password: "admin123",
  },
  {
    nombre: "Mayis",
    apellido: "Sierra",
    fechaNacimiento: new Date(),
    email: "mayis@gmail.com",
    cargo: "gerente",
    password: "admin123",
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

  constructor() {
    this.dataSource = new MatTableDataSource(listUsers)
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
}

