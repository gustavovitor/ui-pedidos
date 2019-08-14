import { Component, OnInit } from '@angular/core';
import { StateChartControlService } from '../../../services/state-control/state-chart-control.service';
import { IBGEService, Municipio, UF } from '../../../services/util/ibge-service';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/util/error-handler.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/util/toast.service';
import { ProdutoItem } from '../../../core/model/produto/produto';
import { ConfirmationModalComponent } from '../../../shared/util/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class SelectItem<T> {
  object: T;
  value: any;
  label: string;
}

@Component({
  selector: 'app-finalizar-compra-page',
  templateUrl: './finalizar-compra-page.component.html',
  styleUrls: ['./finalizar-compra-page.component.css']
})
export class FinalizarCompraPageComponent implements OnInit {

  constructor(public cartControl: StateChartControlService,
              private ibge: IBGEService,
              private formBuilder: FormBuilder,
              private erroHandler: ErrorHandlerService,
              private router: Router,
              private toast: ToastService,
              private modalService: NgbModal) { }

  ufs: Array<SelectItem<UF>>;
  municipios: Array<SelectItem<Municipio>>;
  submited = false;

  enderecoEntregaForm = this.formBuilder.group({
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    numero: [null, Validators.required],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required]
  });

  ngOnInit() {
    this.carregarUFs();
  }

  somarTotalCarrinho() {
    let total = 0;
    this.cartControl.pedido.produtoList.forEach(x => {
      total += x.qtdProduto * x.produto.preco;
    });
    return total;
  }

  carregarUFs() {
    this.ibge.getUFs()
      .then(response => {
        this.ufs = [];
        response.forEach(x => {
          this.ufs.push({
            object: x,
            label: x.nome,
            value: x.nome
          });
        });
      })
      .catch(error => {

      });
  }

  carregarMunicipios() {
    this.enderecoEntregaForm.get('cidade').setValue(null);
    const codigoUF = this.ufs.find(x => x.object.nome === this.enderecoEntregaForm.get('estado').value).object.id;
    this.ibge.getMunicipios(codigoUF)
      .then(response => {
        this.municipios = [];
        response.forEach(x => {
          this.municipios.push({
            object: x,
            value: x.nome,
            label: x.nome
          });
        });
      })
      .catch(error => {

      });
  }

  concluirPedido() {
    this.submited = true;
    this.cartControl.pedido.enderecoEntrega = this.enderecoEntregaForm.value;

    this.cartControl.concluirPedido()
      .then(() => {
        this.router.navigate(['']);
        this.toast.success('Pedido finalizado com sucesso!');
      })
      .catch(error => {
        this.erroHandler.error(error);
        this.submited = false;
      });
  }

  excluirItem(produtoItem: ProdutoItem) {
    if (this.cartControl.pedido.produtoList.length === 1) {
      this.open();
    } else {
      this.cartControl.excluirProduto(produtoItem);
    }
  }

  open() {
    const ref = this.modalService.open(ConfirmationModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    ref.componentInstance.message = 'Ao excluir este produto, o pedido será cancelado na empresa ' +
      this.cartControl.empresa.nome + ', confirma?';
    ref.result.then(response => {
      if (response) {
        this.cartControl.selecionarEmpresa(null);
        this.router.navigate(['']);
      }
    }).catch(error => {
    });
  }
}
