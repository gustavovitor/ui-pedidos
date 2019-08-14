import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'empresa',
    pathMatch: 'full'
  },
  {
    path: 'empresa',
    children: [
      {
        path: ':id',
        component: ProdutosPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
