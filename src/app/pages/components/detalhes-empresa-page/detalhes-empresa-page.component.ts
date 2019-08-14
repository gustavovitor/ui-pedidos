import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from '../../../core/model/empresa/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa/empresa.service';

@Component({
  selector: 'app-detalhes-empresa-page',
  templateUrl: './detalhes-empresa-page.component.html',
  styleUrls: ['./detalhes-empresa-page.component.css']
})
export class DetalhesEmpresaPageComponent implements OnInit {

  empresa: Empresa;

  constructor(private activatedRoute: ActivatedRoute,
              private empresaService: EmpresaService,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.carregarEmpresa(id);
    } else {
      this.router.navigate(['']);
    }
  }

  carregarEmpresa(id: number) {
    this.empresaService.findById(id)
      .then(response => {
        this.empresa = response;
      })
      .catch(error => {

      });
  }

}
