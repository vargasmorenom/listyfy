import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent  implements OnInit {
  public imgelogo:string;

  constructor() {
    this.imgelogo = environment.servicio[0].logo;
   }

  ngOnInit() {}

}
