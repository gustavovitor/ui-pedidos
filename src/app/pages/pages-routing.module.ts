import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/security/guard/auth.guard';
import { PagesComponent } from './pages.component';
import { ChartControlGuard } from '../guards/chart-control.guard';
import { DetalhesEmpresaPageComponent } from './components/detalhes-empresa-page/detalhes-empresa-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: {
      state: 'auth'
    }
  },
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      },
      {
        path: 'principal',
        loadChildren: './principal/principal.module#PrincipalModule'
      },
      {
        path: 'produtos',
        canActivate: [ChartControlGuard],
        loadChildren: './produtos/produtos.module#ProdutosModule'
      },
      {
        path: 'carrinho',
        loadChildren: './carrinho/carrinho.module#CarrinhoModule'
      },
      {
        path: 'pedidos',
        loadChildren: './pedidos/pedidos.module#PedidosModule'
      },
      {
        path: 'detalhes/:id',
        component: DetalhesEmpresaPageComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
