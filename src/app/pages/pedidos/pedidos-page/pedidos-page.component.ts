import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../core/model/pedido/pedido';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-page',
  templateUrl: './pedidos-page.component.html',
  styleUrls: ['./pedidos-page.component.css']
})
export class PedidosPageComponent implements OnInit {

  constructor(private pedidoService: PedidoService,
              private authService: AuthService,
              public router: Router) { }

  pedidos: Array<Pedido>;

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.findAllByUser(this.authService.jwtPayLoad.userId)
      .then(response => {
        this.pedidos = response;
      })
      .catch(error => {

      });
  }

  somarTotalCarrinho(pedido: Pedido) {
    let total = 0;
    pedido.produtoList.forEach(x => {
      total += x.qtdProduto * x.produto.preco;
    });
    return total;
  }

}
