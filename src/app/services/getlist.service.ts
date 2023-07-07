import { Injectable, ViewChild } from '@angular/core';
import { SettingsService } from './app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TUser } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  usuarios : TUser[];
  dataSource!: MatTableDataSource<TUser>;
 


  constructor(private _userService: SettingsService) 
  {
    this.usuarios = [];
  }



  getUserListData() : void {
    this._userService.getUserList().subscribe(resp => {
      this.usuarios = resp.data;
      this.dataSource = new MatTableDataSource(this.usuarios);

    })
  }
}
