import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosPageComponent } from './pedidos-page/pedidos-page.component';
import { DetalhesPedidoPageComponent } from './detalhes-pedido-page/detalhes-pedido-page.component';

const routes: Routes = [
  {
    path: '',
    component: PedidosPageComponent
  },
  {
    path: ':id',
    component: DetalhesPedidoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
