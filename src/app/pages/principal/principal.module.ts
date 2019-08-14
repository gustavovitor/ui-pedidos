import { NgModule } from '@angular/core';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PrincipalPageComponent],
  imports: [
    SharedModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
