import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrinhoPageComponent } from './carrinho-page/carrinho-page.component';
import { FinalizarCompraPageComponent } from './finalizar-compra-page/finalizar-compra-page.component';
import { ChartControlGuard } from '../../guards/chart-control.guard';

const routes: Routes = [
  {
    path: '',
    component: CarrinhoPageComponent
  },
  {
    path: 'finalizar',
    canActivate: [ChartControlGuard],
    component: FinalizarCompraPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrinhoRoutingModule { }
