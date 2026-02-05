import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { menuactivo } from 'src/app/configs/menuSession';
import { IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-menubajo',
  templateUrl: './menubajo.component.html',
  styleUrls: ['./menubajo.component.scss'],
  standalone: true,
  imports:[IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar]
})
export class MenubajoComponent  implements OnInit {
  public page!:string;
  public menuactivo: any = '';
  public valform!: Boolean;
  @Input() estado: boolean = false;

  constructor(private routes: Router, public storage: StorageService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this.storage.exists('usuario')){
        const currentRouteSnapshot = this.activatedRoute.snapshot;
        this.page = currentRouteSnapshot.url.join('/');
    
        let valdata = this.asignarImagenes(menuactivo,true);
        this.menuactivo = this.menuActivoFiltrado(valdata,true);
    }

        
  
  }


menuActivoFiltrado(data:any,val:boolean) { return data.filter((item:any) => item.state === true); }

 asignarImagenes(menu: any[],valida:boolean) {
  return menu.map(item => {
    let imageUrl = '';
      if (item.url === 2) {
      const isuser = this.storage.get('usuario');
      const image = this.storage.get(isuser.id);
      imageUrl = image.profilePic[0].small;
    } 
      

    return { ...item, image: imageUrl };
  });
}

  ruta(valor:number){
    switch(valor){
      case 1:
     this.routes.navigate(['/']);
     break;
      case 2:
     this.routes.navigate(['/perfil']);
       break;
      case 3:
     this.routes.navigate(['/login']);
       break;
      case 4:
     this.routes.navigate(['/register']);
      break;
      case 5:
     this.routes.navigate(['/newlist']);
    }
  }

}
