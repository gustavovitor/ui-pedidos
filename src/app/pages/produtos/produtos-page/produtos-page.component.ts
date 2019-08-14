import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../services/produto/produto.service';
import { Produto, ProdutoItem } from '../../../core/model/produto/produto';
import { StateChartControlService } from '../../../services/state-control/state-chart-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoCarrinhoModalComponent } from '../../../shared/produto-carrinho-modal/produto-carrinho-modal.component';
import { ToastService } from '../../../services/util/toast.service';

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.css']
})
export class ProdutosPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private produtoService: ProdutoService,
              private controleCarrinho: StateChartControlService,
              private modalService: NgbModal,
              private toast: ToastService) { }

  produtos: Array<Produto>;
  produtosFilter: Array<Produto>;
  filterInput: string;

  ngOnInit() {
    const idEmpresa = this.activatedRoute.snapshot.params.id;
    if (idEmpresa) {
      this.carregarProdutos(idEmpresa);
    }
  }

  carregarProdutos(idEmpresa: number) {
    this.produtoService.findAllByEmpresa(idEmpresa)
      .then(response => {
        this.produtos = response;
        this.produtosFilter = response;
      })
      .catch(error => {
        console.log(error);
      });
  }

  abrirModalProduto(produto: Produto) {
    const ref = this.modalService.open(ProdutoCarrinhoModalComponent);
    ref.componentInstance.produtoItem = {
      produto: { ...produto }
    };
    ref.result
      .then(response => {
        if (response.result) {
          this.controleCarrinho.incluirProduto(response.dados.produto);
          this.toast.success('Produto adicionado ao carrinho.');
        }
      })
      .catch(error => {
      });
  }

  filter() {
    this.produtos = this.produtosFilter;

    const searchText = this.filterInput.trim().toLowerCase();
    if (searchText) {
      this.produtos = this.produtos.filter(x => x.nome.toLowerCase().includes(searchText));
    } else {
      this.produtos = this.produtosFilter;
    }
  }
}
