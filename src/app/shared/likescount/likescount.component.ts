import { Component, OnInit, Input } from '@angular/core';
import { IonButton,IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-likescount',
  templateUrl: './likescount.component.html',
  styleUrls: ['./likescount.component.scss'],
  standalone: true,
  imports: [IonButton,IonIcon]
})
export class LikescountComponent  implements OnInit {
@Input() count: number = 0;
@Input() liked: boolean = false;
  constructor() { }

  ngOnInit() {}

  toggleLike(){
    this.liked = !this.liked;
  }

}
