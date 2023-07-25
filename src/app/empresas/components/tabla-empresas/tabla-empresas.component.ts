import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/empresas/interfaces/main';
import { ListaEmpresaService } from 'src/app/empresas/services/lista-empresa.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AgregarEmpresaComponent } from '../agregar-empresa/agregar-empresa.component';

@Component({
  selector: 'app-tabla-empresas',
  templateUrl: './tabla-empresas.component.html',
  styleUrls: ['./tabla-empresas.component.css']
})
export class TablaEmpresasComponent {

  //* Variables
  listaEmpresas: Empresa[] = [];

  displayedColumns: string[] = ['ID', 'NAME', 'PHONE', 'acciones'];

  dataSource!: MatTableDataSource<Empresa>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _listaEmpresaService: ListaEmpresaService,
               public dialog: MatDialog,) 
  {

  }

  ngOnInit() {
    this._listaEmpresaService.listDataEmpresa$.subscribe(( data: any) => {
      this.listaEmpresas = data;
      this.dataSource = new MatTableDataSource(this.listaEmpresas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  // Renderizara la tabla si le dan click
  @Output() idEmpresa: EventEmitter<any> = new EventEmitter();

  getUserTable(idEmpresa: string) {
    this.idEmpresa.emit(idEmpresa)
  }
  
 

  onEditEmpresa(empresa: Empresa | null, event: string){ 
    const dialogRef = this.dialog.open(AgregarEmpresaComponent, {
      width: '400px',
      data: {
        empresa: empresa,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      const mensaje = 'Editar';
      this._listaEmpresaService.mensajeExito(mensaje);
    })

  }


  onDeleteEmpresa(id: string ){ 
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe((dialogStatus: boolean) => {
      const mensaje = 'Eliminar';
      if(dialogStatus !== true) return;
      
      this._listaEmpresaService.deleteEmpresa(id);
      this._listaEmpresaService.mensajeExito(mensaje);
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
