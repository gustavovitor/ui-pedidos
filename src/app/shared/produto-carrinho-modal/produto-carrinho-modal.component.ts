import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto, ProdutoItem } from '../../core/model/produto/produto';

@Component({
  selector: 'app-produto-carrinho-modal',
  templateUrl: './produto-carrinho-modal.component.html',
  styleUrls: ['./produto-carrinho-modal.component.css']
})
export class ProdutoCarrinhoModalComponent implements OnInit {
  @Input() produtoItem: ProdutoItem;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
