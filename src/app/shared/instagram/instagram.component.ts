import { Component, OnInit, Input } from '@angular/core';
import { DeleteContentComponent } from '../delete-content/delete-content.component';


@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
  standalone: true,
  imports: [ DeleteContentComponent],
})
export class InstagramComponent implements OnInit {
  @Input() contenido!: any;
  @Input() idpost!: any;

  constructor() {}

  ngOnInit() {}
}
