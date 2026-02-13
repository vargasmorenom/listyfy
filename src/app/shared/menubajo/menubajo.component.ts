import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { menuactivo } from 'src/app/configs/menuSession';
import { IonTabButton, IonIcon, IonLabel, IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menubajo',
  templateUrl: './menubajo.component.html',
  styleUrls: ['./menubajo.component.scss'],
  standalone: true,
  imports: [IonTabButton, IonIcon, IonLabel, IonTabBar],
})
export class MenubajoComponent implements OnInit {
  public page!: string;
  public menuactivo: any = '';
  public valform!: boolean;
  @Input() estado: boolean = false;
  hideFooter = false;
  lastScrollTop = 0;
  readonly SCROLL_THRESHOLD = 40;
  token: string | null = null;
  menuItems: any[] = [];

  constructor(
    private navCtrl: NavController,
    private routes: Router,
    private storage: StorageService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLogged => {
      this.menuItems = menuactivo.filter((item) => {
        if (item.visibility === 'public') return true;
        if (item.visibility === 'auth') return isLogged;
        if (item.visibility === 'guest') return !isLogged;
        return false;
      });
    });
  }

  isActive(url: string): boolean {
    return this.routes.url === url;
  }

  ruta(valor: string, id: string) {
    if (this.isActive(valor)) return;
    if (id) {
      this.navCtrl.navigateForward(valor, {
        queryParams: { id: id },
      });
    } else {
      this.navCtrl.navigateForward(valor);
    }
  }

  onScroll(event: any) {}
}
