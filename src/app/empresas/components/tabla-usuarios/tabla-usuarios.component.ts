import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/empresas/interfaces/main';
import { ListaUsuariosService } from 'src/app/empresas/services/lista-usuarios.service';
import { AgregarEmpresaComponent } from '../agregar-empresa/agregar-empresa.component';
import { AgregarUsuarioComponent } from '../agregar-usuario/agregar-usuario.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnChanges{

  
  //* Variables
  @Input() public idEmpresa! : string;
  listaUsuarios: Usuario[] = [];
  

  displayedColumns: string[] = ['ID', 'NAME', 'SURNAME', 'acciones'];

  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _listaUsuariosService: ListaUsuariosService,
               private dialog: MatDialog)
  {

  }

  ngOnChanges() {
    this._listaUsuariosService.filterUsersByCompany(this.idEmpresa);
    this._listaUsuariosService.getUsuariosFiltrados().subscribe((data: any) => {
     
      this.listaUsuarios = data;
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  
  
  
  onEditUser(user: Usuario | null, event: string) {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '400px',
      data: {
        user: user,
        event: event
      }
    });
    
    dialogRef.afterClosed().subscribe(() => {
      const mensaje = 'Editar';
      this._listaUsuariosService.mensajeExito(mensaje);
    })
  }
  
  
  onDeleteUser(id: string){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((dialogStatus: boolean) => {
      const mensaje = 'Eliminar';
      if(dialogStatus !== true) return;

      this._listaUsuariosService.deleteUser(id);
      this._listaUsuariosService.filterUsersByCompany(id);
      this._listaUsuariosService.mensajeExito(mensaje)
      ;
    })
  }


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
