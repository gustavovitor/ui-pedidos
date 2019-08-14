import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/security/auth.service';
import { BaseHttp } from '../services/security/base-http';
import { AuthGuard } from '../services/security/guard/auth.guard';
import { LogoutService } from '../services/security/logout.service';
import {CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {CUSTOM_ERRORS} from './validation-messages/validation-messages';
import { StateChartControlService } from '../services/state-control/state-chart-control.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    NgbModule,

    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot(),
  ],
  declarations: [],
  providers: [
    HttpClient,
    BaseHttp,

    AuthService,
    LogoutService,
    AuthGuard,

    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    },

    StateChartControlService
  ]
})
export class CoreModule { }
