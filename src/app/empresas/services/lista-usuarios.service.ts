import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interfaces/main';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

  private ListDataUsuario = new BehaviorSubject<any>([]);
  public listDataUsuario$ = this.ListDataUsuario.asObservable();

  private UsuariosFiltrados = new BehaviorSubject<any>([]);
  public UsuariosFiltrados$ = this.UsuariosFiltrados.asObservable();

  constructor(private _snackBar: MatSnackBar) {

  }


  addUser(user: Usuario) {

    const usersList = this.ListDataUsuario.getValue();
    usersList.push(user);

    this.ListDataUsuario.next(usersList);
  }


  editUser(userToEdit: Usuario) {
    const usersList = this.ListDataUsuario.getValue();
    const indice = usersList.findIndex((data: any) => data.ID_EMPRESA = userToEdit.ID_USER);

    if(indice !== -1) {
      usersList[indice] = {...usersList[indice], ...userToEdit};
      this.ListDataUsuario.next(usersList);
    }

  }


  deleteUser (idToDelete: string) {
    const usersList = this.ListDataUsuario.getValue();
    const usersFiltered = usersList.filter((data: any) => data.ID_USER !== idToDelete);

    this.ListDataUsuario.next(usersFiltered);
  }


  filterUsersByCompany(idUser: string) {
    const usersList = this.ListDataUsuario.getValue();
    const usersFiltered = usersList.filter((users:any) => users.ID_EMPRESA === idUser);
    this.UsuariosFiltrados.next(usersFiltered);
  }

  getUsuariosFiltrados(): Observable<any> {
    return this.UsuariosFiltrados$;
  }


  mensajeExito(message: string) {
    this._snackBar.open(`El usuario se pudo ${ message } con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  
  





}
