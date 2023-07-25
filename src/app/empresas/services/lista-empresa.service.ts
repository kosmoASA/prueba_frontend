import { Injectable } from '@angular/core';
import { listaEmpresa } from '../interfaces/main';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ListaEmpresaService {

  private ListDataEmpresa = new BehaviorSubject<any>([]);
  public listDataEmpresa$ = this.ListDataEmpresa.asObservable();


  constructor(private _snackBar: MatSnackBar) {
    
  }

  addEmpresa (empresa: listaEmpresa) {

    const companiesList = this.ListDataEmpresa.getValue();
    companiesList.push(empresa);

    this.ListDataEmpresa.next(companiesList);
    
  }


  editEmpresa (empresaToEdit: listaEmpresa) {
    const companiesList = this.ListDataEmpresa.getValue();
    const indice = companiesList.findIndex((data: any) => data.ID_EMPRESA = empresaToEdit.ID_EMPRESA);

    if(indice !== -1) {
      companiesList[indice] = {...companiesList[indice], ...empresaToEdit};
      this.ListDataEmpresa.next(companiesList);
    }

  }

  deleteEmpresa (idToDelete: string) {
    const companiesList = this.ListDataEmpresa.getValue();
    const newData = companiesList.filter((data: any) => data.ID_EMPRESA !== idToDelete);

    this.ListDataEmpresa.next(newData);
  }
  

  mensajeExito(message: string) {
    this._snackBar.open(`La empresa se pudo ${ message } con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
