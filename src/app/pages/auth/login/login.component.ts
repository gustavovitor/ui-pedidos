import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { ToastService } from '../../../services/util/toast.service';
import { ErrorHandlerService } from '../../../services/util/error-handler.service';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submited = false;

  constructor(private auth: AuthService,
              private toast: ToastService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  userForm = this.formBuilder.group({
    email: [null, Validators.compose([
      Validators.required
    ])],
    senha: [null, Validators.compose([
      Validators.required
    ])]
  });

  ngOnInit() {
    this.initialCheck();
  }

  initialCheck() {
    if(!this.auth.isAccessTokenInvalid) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.submited = true;
    this.auth.login(this.userForm.value)
      .then(() => {
        this.toast.success('Logado com sucesso');
        this.router.navigate(['/pages']);
        this.submited = false;
      })
      .catch(err => {
        this.submited = false;
        this.errorHandler.error(err);
      });
  }

}
