import { Injectable } from '@angular/core';
import { HttpClient,  HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostedModel } from '../interfaces/posted';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostedsService {
   private url:string;

  constructor(private http: HttpClient) { 
    this.url = environment.servicio[0].url;
  }

  createPosted(posted: any): Observable<HttpResponse<any>> {

    return this.http.post<any>(this.url + 'newpost', posted, {
      observe: 'response',
    });

  }
}
