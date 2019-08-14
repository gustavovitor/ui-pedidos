import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AuthService } from './auth.service';

import { Observable, from as observableFromPromise } from 'rxjs';

export class NotAuthenticatedError {}

@Injectable()
export class BaseHttp extends HttpClient {
  constructor(private auth: AuthService,
              private httpHandler: HttpHandler) {
    super(httpHandler);
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.delete<T>(url, options));
  }

  get<T>(url: string, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.get<T>(url, options));
  }

  head<T>(url: string, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.head<T>(url, options));
  }

  options<T>(url: string, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.options<T>(url, options));
  }

  patch<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.patch<T>(url, body, options));
  }

  post<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.post<T>(url, body, options));
  }

  put<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.makeRequest<T>(() => super.put<T>(url, body, options));
  }

  /* Intercepta todas as requisições da feitas à API para checar antes o access_token. */
  private makeRequest<T>(func: Function): Observable<T> {
    if (this.auth.isAccessTokenInvalid) {
      /**
       * Chama um novo access_token caso o atual esteja inválido, checa
       * se o novo será válido e libera a requisição.
       * */
      const chamadaNovoAccessToken = this.auth.getNewAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalid) {
            throw new NotAuthenticatedError();
          }
          return func().toPromise()
            .then(data => {
              return Promise.resolve(data);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        });

      return observableFromPromise(chamadaNovoAccessToken);
    } else {
      return observableFromPromise(func().toPromise()
        .then(data => {
          return Promise.resolve(data);
        })
        .catch(err => {
          return Promise.reject(err);
        }));
    }
  }
}
