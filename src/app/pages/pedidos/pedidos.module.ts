import { NgModule } from '@angular/core';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosPageComponent } from './pedidos-page/pedidos-page.component';
import { DetalhesPedidoPageComponent } from './detalhes-pedido-page/detalhes-pedido-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PedidosPageComponent, DetalhesPedidoPageComponent],
  imports: [
    SharedModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
