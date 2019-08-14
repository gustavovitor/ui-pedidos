import { Component, OnInit, ViewChild } from '@angular/core';
import { StateChartControlService } from '../../../services/state-control/state-chart-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../shared/util/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/util/toast.service';
import { LogoutService } from '../../../services/security/logout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private stateChartControl: StateChartControlService,
              private modalService: NgbModal,
              private router: Router,
              private toast: ToastService,
              private logoutService: LogoutService) { }

  navbarOpen = false;

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  navigateToInit() {
    if (this.stateChartControl.empresaSelecionada) {
      this.open();
    } else {
      this.router.navigate(['']);
    }
  }

  open() {
    const ref = this.modalService.open(ConfirmationModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    ref.componentInstance.message = 'Se você for para o inicio, perderá o carrinho na empresa ' +
      this.stateChartControl.empresa.nome + ', confirma?';
    ref.result.then(response => {
      if (response) {
        this.stateChartControl.selecionarEmpresa(null);
        this.router.navigate(['']);
      }
    }).catch(error => {
      });
  }

  navigateToProdutos() {
    if (this.stateChartControl.empresaSelecionada) {
      this.router.navigate(['pages/produtos/empresa', this.stateChartControl.empresa.id]);
    } else {
      this.toast.info('Você não selecionou nenhuma empresa, por favor, selecione!');
      this.router.navigate(['']);
    }
  }

  logout() {
    this.logoutService.logout();
  }

}
