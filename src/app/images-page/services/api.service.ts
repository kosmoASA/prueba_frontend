import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTable } from '../../interfaces/images';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://kosmetikon.myqnapcloud.com:44444';


  constructor(private http: HttpClient) { }

  getFileList(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/getImageList`);
  }

  newFile(data: any): Observable<any> {
    return this.http.post<DataTable[]>(`${this.baseURL}/newImage`, data);
  }

  deleteImage(dataID: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/deleteImage`, { body: {ID_IMAGEN: dataID}});
  }

  downloadImage(enlace: string): Observable<any> {
    const imageURL = `${this.baseURL}/images/${ enlace }`
    return this.http.get(imageURL, {responseType: 'blob'})
  }

}
