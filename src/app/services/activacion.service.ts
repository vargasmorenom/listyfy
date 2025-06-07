import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivacionService {

  private url:string;
  constructor(public http:HttpClient) {
    this.url = environment.servicio[0].url;
  }



    seachActivation(datos:any):Observable<any>{

      return this.http.put(this.url + 'activacion', datos );

    }

}
