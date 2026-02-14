import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketLikeService {

  private socket: Socket;
  private url: string = environment.servicio[0].url;

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket']
    });
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(event, (data: T) => observer.next(data));
      return () => this.socket.off(event);
    });
  }
}