import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketLikeService } from './socket-like.service';
import { LikeUpdate } from '../interfaces/LikeUpdate';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private url: string;

  constructor(
    private socketService: SocketLikeService,
    private http: HttpClient
  ) {
    this.url = environment.servicio[0].url;
  }

  // HTTP - dar o quitar like
  toggleLikeHttp(idPost: string, idUser: string): Observable<any> {
    return this.http.post<any>(this.url + 'likes', { idPost, idUser });
  }

  // HTTP - obtener likes de un post y si el usuario ya dio like
  getLikes(idPost: string, idUser?: string): Observable<any> {
    return this.http.post<any>(this.url + 'likes', { idPost, idUser });
  }

  // WebSocket - dar o quitar like
  toggleLike(idPost: string, idUser: string): void {
    this.socketService.emit('likePost', { idPost, idUser });
  }

  onLikeUpdated(): Observable<LikeUpdate> {
    return this.socketService.on<LikeUpdate>('like:updated');
  }

  onLikeError(): Observable<{ error: string }> {
    return this.socketService.on<{ error: string }>('like:error');
  }
}
