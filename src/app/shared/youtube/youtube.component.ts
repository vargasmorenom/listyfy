import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent  implements OnInit {
  @Input() idconten!:String;
  constructor() { }

  ngOnInit() {}

}
