import { NgModule } from '@angular/core';

import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoPageComponent } from './carrinho-page/carrinho-page.component';
import { SharedModule } from '../../shared/shared.module';
import { FinalizarCompraPageComponent } from './finalizar-compra-page/finalizar-compra-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarrinhoPageComponent, FinalizarCompraPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CarrinhoRoutingModule
  ]
})
export class CarrinhoModule { }
