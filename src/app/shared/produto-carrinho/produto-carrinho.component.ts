import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto, ProdutoItem } from '../../core/model/produto/produto';
import { ToastService } from '../../services/util/toast.service';

@Component({
  selector: 'app-produto-carrinho',
  templateUrl: './produto-carrinho.component.html',
  styleUrls: ['./produto-carrinho.component.css']
})
export class ProdutoCarrinhoComponent implements OnInit {
  @Input() produtoItem: ProdutoItem;
  @Output() adicionadoAoCarrinho = new EventEmitter();

  constructor(private toast: ToastService) { }

  ngOnInit() {
  }

  adicionarQtd() {
    if (this.produtoItem.qtdProduto) {
      this.produtoItem.qtdProduto++;
    } else {
      this.produtoItem.qtdProduto = 1;
    }
  }

  removerQtd() {
    this.produtoItem.qtdProduto--;
    if (this.produtoItem.qtdProduto === 0) {
      this.produtoItem.qtdProduto = 0;
    }
  }

  adicionarProdutoAoCarrinho() {
    this.adicionadoAoCarrinho.emit({
      produto: this.produtoItem
    });
  }

}
