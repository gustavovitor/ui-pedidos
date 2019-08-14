import { Injectable } from '@angular/core';
import { Pedido } from '../../core/model/pedido/pedido';
import { Produto, ProdutoItem } from '../../core/model/produto/produto';
import { Empresa } from '../../core/model/empresa/empresa';
import { AuthService } from '../security/auth.service';
import { PedidoService } from '../pedido/pedido.service';
import { ToastService } from '../util/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class StateChartControlService {

  constructor(private authService: AuthService,
              private pedidoService: PedidoService) { }

  pedido = new Pedido();
  empresa: Empresa;

  productKey = 0;

  get empresaSelecionada() {
    return this.empresa != null;
  }

  public selecionarEmpresa(empresa: Empresa) {
    this.pedido = new Pedido();
    this.empresa = empresa;
  }

  public incluirProduto(produto: ProdutoItem) {
    produto.key = this.productKey++;
    this.pedido.produtoList.push(produto);
  }

  public excluirProduto(produto: ProdutoItem) {
    this.pedido.produtoList.splice(this.pedido.produtoList.findIndex(x => x.key === produto.key), 1);
  }

  public concluirPedido(): Promise<Pedido> {
    return this.pedidoService.insert(this.pedido)
      .then(response => {
        this.selecionarEmpresa(null);
        return response;
      })
      .catch(error => {
        return error;
      });
  }
}
