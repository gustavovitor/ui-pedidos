import { Component, OnInit } from '@angular/core';
import { StateChartControlService } from '../services/state-control/state-chart-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(public stateChartControl: StateChartControlService,
              private router: Router) { }

  ngOnInit() {
  }

  navegarDetalhesEmpresa() {
    this.router.navigate(['pages/detalhes', this.stateChartControl.empresa.id]);
  }

}
