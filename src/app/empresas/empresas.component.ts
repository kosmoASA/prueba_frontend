import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEmpresaComponent } from './components/agregar-empresa/agregar-empresa.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ListaEmpresaService } from './services/lista-empresa.service';
import { Empresa, Usuario } from './interfaces/main';
import { ListaUsuariosService } from './services/lista-usuarios.service';

@Component({
  selector: 'app-empresas-principal',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasPrincipalComponent {

  //* Variables

  public listaUsuarios: any[] = []
  public idEmpresa!: string;

  constructor (public dialog: MatDialog,
               private _listaEmpresaService: ListaEmpresaService,
               private _listaUsuariosService: ListaUsuariosService,
               ) 
  {
  
  }

  getIdEmpresa(idEmpresa: string) {
    this.idEmpresa = idEmpresa;
  }
  

  onAgregarEmpresa( empresa: Empresa | null, event: string){ // Abre el modal para agregar empresa
    const dialogRef = this.dialog.open(AgregarEmpresaComponent, {
      width: '400px',
      data: {
        empresa: empresa,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      const mensaje = 'Agregar';
      this._listaEmpresaService.mensajeExito(mensaje);
    });
  }

  

  onAgregarUsuario(user: Usuario | null, event: string){ // Abre el modal para agregar usuario
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '400px',
      data: {
        idEmp: this.idEmpresa,
        user: user,
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      const mensaje = 'Agregar';
      this._listaUsuariosService.mensajeExito(mensaje);
    });

  }
}
