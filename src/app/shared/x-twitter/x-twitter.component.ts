import { IonButton } from '@ionic/angular/standalone';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-x-twitter',
  templateUrl: './x-twitter.component.html',
  styleUrls: ['./x-twitter.component.scss'],
  standalone:true,
  imports:[IonButton]
})
export class XTwitterComponent  implements OnInit {
  @Input() idconten!:String;
  @Input() iduser!:String;


  constructor() {

   }

  ngOnInit() {}

  borrar(){}

}
