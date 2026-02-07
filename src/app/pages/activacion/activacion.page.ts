import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ActivacionService } from 'src/app/services/activacion.service';

@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.page.html',
  styleUrls: ['./activacion.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    SessionComponent,
    CommonModule,
    FormsModule,
  ],
})
export class ActivacionPage implements OnInit {
  public imagen: string = '';
  public val: string;
  public user: string;
  public validastate: boolean = false;
  public mensaje: string = '';

  constructor(
    private param: ActivatedRoute,
    private navegar: Router,
    private activacion: ActivacionService
  ) {
    this.val = this.param.snapshot.paramMap.get('id')!;
    this.user = this.param.snapshot.paramMap.get('user')!;
    this.imagen = '484091569012201.gif';
    this.validarUser(this.user, this.val);
    if (this.validastate) {
      this.imagen = '484091569012201.gif';
      this.mensaje = 'Felicitaciones tu cuenta esta activa ';
      setInterval(() => {
        this.navegar.navigate(['login']);
      }, 10000);
    } else {
      this.imagen = 'VQqjQDiECNtjlCc9A1Tqtj1AyUUSkisXHymq.gif';
      this.mensaje = 'se genera un error en la activacion, solicita una nueva activacion ';
      setInterval(() => {
        this.navegar.navigate(['login']);
      }, 10000);
    }
  }

  validarUser(user: string, id: string) {
    const data = {
      token: id,
      username: user,
    };
    this.activacion.seachActivation(data).subscribe((datos: any) => {
      if (datos.acknowledged === true) {
        this.validastate = true;
      }
    });
  }
  ngOnInit() {}
}
