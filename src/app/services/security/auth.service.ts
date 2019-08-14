import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUserForm, User } from '../../core/model/security/auth-user';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.loadToken();
  }

  URL = environment.WebServiceList.URLAuth;
  jwtPayLoad: any;
  user: User;

  /* loadToken é responsável por carregar o token do localstorage caso já haja um, e injeta-o no serviço. */
  private loadToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.saveToken(token);
    }
  }

  /* saveToken injeta o token no serviço. */
  private saveToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  /** login responsável pelo login e armazenamento do token.
   * @param user interface utilizada para facilitar o login do tipo {@link AuthUserForm} */
  login(user: AuthUserForm): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic b2F1dGgyLWNsaWVudC1hcGk6KlkqJWJYUSM8NSxwfltWazliYiYmWDlyc3c3Vn5KYF8=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${user.email}&password=${user.senha}&grant_type=password`;
    return this.http.post<any>(this.URL, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.saveToken(res.access_token);
      })
      .catch(err => {
        if(err.status === 400) {
          if(err.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(err);
      });
  }

  /** getNewAccessToken realiza uma requisição na API para renovar o access_token. */
  getNewAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic b2F1dGgyLWNsaWVudC1hcGk6KlkqJWJYUSM8NSxwfltWazliYiYmWDlyc3c3Vn5KYF8=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    return this.http.post<any>(this.URL, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.saveToken(res.access_token);
        return Promise.resolve(null);
      })
      .catch(err => {
        return Promise.reject(null);
      });
  }

  /** isAccessTokenInvalid checa se o token é inválido. */
  get isAccessTokenInvalid() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /** hasAuthority checa se o token atual tem permissão para determinada ação. */
  hasAuthority(permission: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permission);
  }

  /** cleanAccessToken remove o token do localStorage. */
  cleanAccessToken() {
    localStorage.removeItem('access_token');
    this.jwtPayLoad = null;
  }
}
