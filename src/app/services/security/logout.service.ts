import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseHttp } from './base-http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(private auth: AuthService,
              private http: BaseHttp,
              private router: Router) { }

  URL = environment.WebServiceList.URLLogout;

  logout() {
    return this.http.delete(this.URL, { withCredentials: true }).toPromise()
      .then(() => {
        this.auth.cleanAccessToken();
        this.router.navigate(['auth']);
      })
      .catch(() => null);
  }
}
