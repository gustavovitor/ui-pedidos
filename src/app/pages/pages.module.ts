import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { DetalhesEmpresaPageComponent } from './components/detalhes-empresa-page/detalhes-empresa-page.component';

@NgModule({
  imports: [
    SharedModule,

    PagesRoutingModule
  ],
  bootstrap: [PagesComponent],
  declarations: [PagesComponent, MenuComponent, DetalhesEmpresaPageComponent]
})
export class PagesModule { }
