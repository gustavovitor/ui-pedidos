import { Component, OnInit } from '@angular/core';
import { StateChartControlService } from '../../../services/state-control/state-chart-control.service';
import { Produto, ProdutoItem } from '../../../core/model/produto/produto';
import { ProdutoCarrinhoModalComponent } from '../../../shared/produto-carrinho-modal/produto-carrinho-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-page',
  templateUrl: './carrinho-page.component.html',
  styleUrls: ['./carrinho-page.component.css']
})
export class CarrinhoPageComponent implements OnInit {

  constructor(public cartControl: StateChartControlService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
  }

  somarTotalCarrinho() {
    let total = 0;
    this.cartControl.pedido.produtoList.forEach(x => {
      total += x.qtdProduto * x.produto.preco;
    });
    return total;
  }

  abrirModalProduto(produto: ProdutoItem) {
    const ref = this.modalService.open(ProdutoCarrinhoModalComponent);
    ref.componentInstance.produtoItem = { ...produto };
    ref.result
      .then(response => {
        this.cartControl.pedido.produtoList.find(x => x.key === produto.key).qtdProduto = response.dados.produto.qtdProduto;
      })
      .catch(error => {

      });
  }

  finalizarCompra() {
    this.router.navigate(['pages/carrinho/finalizar']);
  }
}
