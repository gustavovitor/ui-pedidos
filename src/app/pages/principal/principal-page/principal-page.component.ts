import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { StartDatabase } from '../../../core/model/util/start-database';
import { Empresa } from '../../../core/model/empresa/empresa';
import { ProdutoService } from '../../../services/produto/produto.service';
import { StateChartControlService } from '../../../services/state-control/state-chart-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {

  constructor(private empresaService: EmpresaService,
              private produtoService: ProdutoService,
              private stateChartControl: StateChartControlService,
              private router: Router) { }

  filterInput: string;
  empresas: Array<Empresa>;
  empresasFilter: Array<Empresa>;

  ngOnInit() {
    const database = new StartDatabase(this.empresaService, this.produtoService);
    // database.startAll();
    if (this.stateChartControl.empresaSelecionada) {
      this.stateChartControl.selecionarEmpresa(null);
    }

    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.empresaService.findAll()
      .then(response => {
        this.empresas = response;
        this.empresasFilter = response;
        this.carregarProdutos();
      })
      .catch(error => {

      });
  }

  carregarProdutos() {
    this.empresas.forEach(x => {
      this.produtoService.findAllByEmpresa(x.id)
        .then(response => {
          x.quantidadeProdutos = response.length;
        });
    });
  }

  filter() {
    this.empresas = this.empresasFilter;

    const searchText = this.filterInput.trim().toLowerCase();
    if (searchText) {
      this.empresas = this.empresas.filter(x => x.nome.toLowerCase().includes(searchText));
    } else {
      this.empresas = this.empresasFilter;
    }
  }

  selecionarEmpresa(empresa: Empresa) {
    this.stateChartControl.selecionarEmpresa(empresa);
    this.router.navigate(['/pages/produtos/empresa', empresa.id]);
  }

}
