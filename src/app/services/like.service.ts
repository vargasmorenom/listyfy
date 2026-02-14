import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketLikeService } from './socket-like.service';
import { LikeUpdate } from '../interfaces/LikeUpdate';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

    constructor(private socketService: SocketLikeService) {}

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
