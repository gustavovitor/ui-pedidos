import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) {}

  success(msg: string) {
    this.toast.success(msg, environment.SuccessSummaryMessages[
      Math.floor(Math.random() * environment.SuccessSummaryMessages.length)
      ]);
  }

  warning(msg: string) {
    this.toast.warning(msg, environment.WarningSummaryMessages[
      Math.floor(Math.random() * environment.WarningSummaryMessages.length)
      ]);
  }

  info(msg: string) {
    this.toast.info(msg, environment.InfoSummaryMessages[
      Math.floor(Math.random() * environment.InfoSummaryMessages.length)
      ]);
  }

}
