import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../core/model/pedido/pedido';

@Component({
  selector: 'app-detalhes-pedido-page',
  templateUrl: './detalhes-pedido-page.component.html',
  styleUrls: ['./detalhes-pedido-page.component.css']
})
export class DetalhesPedidoPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private router: Router) { }

  pedido: Pedido;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.carregarPedido(id);
    } else {
      this.router.navigate(['']);
    }
  }

  carregarPedido(id: number) {
    this.pedidoService.findById(id)
      .then(response => {
        this.pedido = response;
      })
      .catch(error => {});
  }

  somarTotalCarrinho(pedido: Pedido) {
    let total = 0;
    pedido.produtoList.forEach(x => {
      total += x.qtdProduto * x.produto.preco;
    });
    return total;
  }
}
