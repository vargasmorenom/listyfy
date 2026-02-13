import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenubajoComponent } from './../../shared/menubajo/menubajo.component';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { login } from 'src/app/configs/login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { generarToken } from 'src/app/utilities/generarToken';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonInputPasswordToggle,
  IonCard,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    FormsModule,
    ReactiveFormsModule,
    IonInputPasswordToggle,
    MenubajoComponent,
  ],
})
export class LoginPage implements OnInit {
  backgroundClasses: string[] = ['background-1', 'background-2', 'background-3'];
  currentBackgroundClass: string = this.backgroundClasses[0];
  currentIndex: number = 0;

  public formCreate: any;
  public form: FormGroup;
  private url: string;
  public logo: string;
  isMenuHidden!: true;

  constructor(
    public router: Router,
    public formUl: DynamicFormService,
    public messToast: ToastrService,
    public loginservice: LoginService,
    public storage: StorageService,
    private auth: AuthService
  ) {
    this.formCreate = login;
    this.url = environment.servicio[0].key;
    this.form = this.formUl.createForm(this.formCreate);
    this.logo = environment.servicio[0].logo;
    this.startBackgroundRotation();
  }

  startBackgroundRotation(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundClasses.length;
      this.currentBackgroundClass = this.backgroundClasses[this.currentIndex];
    }, 10000);
  }

  ngOnInit() {}

  encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, this.url).toString();
  }

  enviar() {
    const data = {
      username: this.form.value.username,
      password: this.encrypt(this.form.value.password),
    };

    this.loginservice.LoginUser(data).subscribe((datos) => {
      if (datos.status === 200) {
        const token = generarToken();
        const usuario = { user: datos.body.usuario, id: datos.body.id, valores: token };
        this.storage.set('usuario', usuario);
        this.auth.login(token);
        this.storage.set(datos.body.id, datos.body.perfil);
        this.messToast.success('Bienvenido a ListyFy : ' + ' ' + this.form.value.username);
        setTimeout(() => {
          this.router.navigateByUrl('/', {replaceUrl: true})
        }, 2000);
      } else {
        this.messToast.warning('Se presenta un error en el login');
      }
    });
  }
}
