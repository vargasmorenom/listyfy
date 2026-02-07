import { Component, OnInit, Input } from '@angular/core';
import { IonCol, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss'],
  imports: [IonCol, IonIcon],
  standalone: true,
})
export class SocialmediaComponent implements OnInit {
  @Input() red: number = 0;
  constructor() {}

  ngOnInit() {}
}
