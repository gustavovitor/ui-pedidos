import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateToken();
  }

  validateToken() {
    if(this.auth.isAccessTokenInvalid) {
      return this.auth.getNewAccessToken()
        .then(() => {
          if(this.auth.isAccessTokenInvalid) {
            this.router.navigate(['/auth']);
            return Promise.resolve(false);
          }
          return Promise.resolve(true);
        })
        .catch(() => {
          this.router.navigate(['/auth']);
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(true);
    }
  }
}
