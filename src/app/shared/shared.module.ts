import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './util/confirmation-modal/confirmation-modal.component';
import { ProdutoCarrinhoModalComponent } from './produto-carrinho-modal/produto-carrinho-modal.component';
import { ProdutoCarrinhoComponent } from './produto-carrinho/produto-carrinho.component';

@NgModule({
  declarations: [ConfirmationModalComponent, ProdutoCarrinhoModalComponent, ProdutoCarrinhoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgBootstrapFormValidationModule,
    AngularFontAwesomeModule,

    NgbModalModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgBootstrapFormValidationModule,
    AngularFontAwesomeModule,

    NgbModalModule,

    ProdutoCarrinhoModalComponent,
  ],
  entryComponents: [
    ConfirmationModalComponent,
    ProdutoCarrinhoModalComponent
  ]
})
export class SharedModule { }
