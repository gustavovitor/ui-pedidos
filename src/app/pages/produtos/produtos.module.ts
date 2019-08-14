import { NgModule } from '@angular/core';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProdutosPageComponent],
  imports: [
    SharedModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
