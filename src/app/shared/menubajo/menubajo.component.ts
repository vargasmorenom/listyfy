import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { menuactivo } from 'src/app/configs/menuSession';
import { IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar, IonItemOptions } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menubajo',
  templateUrl: './menubajo.component.html',
  styleUrls: ['./menubajo.component.scss'],
  standalone: true,
  imports: [IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar],
})
export class MenubajoComponent implements OnInit {
  public page!: string;
  public menuactivo: any = '';
  public valform!: Boolean;
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
    this.menuItems = this.getMenuBySession();
  }

  isActive(url: string): boolean {
    return this.routes.url === url;
  }

  getMenuBySession(): any[] {
    const isLogged = this.authService.checkToken();
    return menuactivo.filter((item) => {
      if (item.visibility === 'public') return true;
      if (item.visibility === 'auth') return isLogged;
      if (item.visibility === 'guest') return !isLogged;
      return false;
    });
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
