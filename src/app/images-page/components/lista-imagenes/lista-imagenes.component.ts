import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataTable } from 'src/app/interfaces/images';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver'
import { getListService } from '../../services/get-list.service';
import { ApiService } from '../../services/api.service';
import { ModalEliminarImagesComponent } from '../modal-eliminar/modal-eliminar.component';


@Component({
  selector: 'app-lista-imagenes',
  templateUrl: './lista-imagenes.component.html',
  styleUrls: ['./lista-imagenes.component.css']
})


export class ListaImagenesComponent {

  //* Variables
  dataList: DataTable[] = [];
  
  displayedColumns: string[] = ['FECHA', 'ENLACE', 'ID_IMAGEN', 'descargar', 'eliminar'];
  dataSource!: MatTableDataSource<DataTable>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _getListService: getListService,
              private _apiService: ApiService,
              public dialog: MatDialog, ) 
  {

  }
  
  ngOnInit() {
    this._getListService.ListDataSubject$.subscribe((data: any) => {
      this.dataList = data;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this._getListService.refreshListImage();
  }
  
  onDownload( enlace: string ) { // Habilita la descarga de la imagen
    this._apiService.downloadImage( enlace )
      .pipe(tap(console.log))
      .subscribe((resp: any) => {
        const fileName = enlace.toString();
          saveAs(resp, fileName)
      })
  }


  onDelete(ID_IMAGE: string) { // Abre el modal de eliminar, para realizar la acción

    const dialogRef = this.dialog.open(ModalEliminarImagesComponent, {
      width: '400px',
    });

    dialogRef.beforeClosed().subscribe(dialogStatus => {
      
      if(dialogStatus !== true) return;

      this._apiService.deleteImage(ID_IMAGE).subscribe({
        next: (resp:any) => {
          console.log( resp )
          this._getListService.mensajeExito(resp);
          this._getListService.refreshListImage();
        },
        error: (error: any) => {
          console.log( error )
        }
      })
    });

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
