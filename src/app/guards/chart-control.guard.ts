import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateChartControlService } from '../services/state-control/state-chart-control.service';

@Injectable({
  providedIn: 'root'
})
export class ChartControlGuard implements CanActivate {

  constructor(private stateChartControl: StateChartControlService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.stateChartControl.empresaSelecionada) {
      this.router.navigate(['']);
    }
    return this.stateChartControl.empresaSelecionada;
  }
}
