import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toast: ToastrService) { }

  error(err: any) {
    let msg: string;
    if(typeof err === 'string') {
      msg = err;
    } else {
      msg = this.errorFilter(err);
    }
    this.showErrorToast(msg);
  }

  /* Filtra os erros para saber o seu tipo e a mensagem que deve retornar. */
  private errorFilter(err: any) {
    let msg: string;
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        msg = 'Estamos com problemas para se comunicar com o servidor.';
      }
    }
    return msg;
  }

  /* Mostra a mensagem de erro tratada. */
  private showErrorToast(msg: string) {
    this.toast.error(msg, environment.ErrorSummaryMessages[
      Math.floor(Math.random() * environment.ErrorSummaryMessages.length)
      ]);
  }
}
