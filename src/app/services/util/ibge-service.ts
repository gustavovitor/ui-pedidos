import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class UF {
  id: number;
  nome: string;
  sigla: string;
}

export class Municipio {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class IBGEService {

  constructor(private http: HttpClient) {
  }

  URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  URLMun = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  getUFs(): Promise<Array<UF>> {
    return this.http.get<any>(`${this.URL}`).toPromise()
      .then(response => {
        return Promise.resolve(response);
      });
  }

  getMunicipios(idUF: number): Promise<Array<Municipio>> {
    return this.http.get<any>(`${this.URLMun}/estados/${idUF}/municipios`).toPromise()
      .then(response => {
        return Promise.resolve(response);
      });
  }

  getMunicipioById(idMunicipio: number): Promise<Municipio> {
    return this.http.get<any>(`${this.URLMun}/${idMunicipio}`).toPromise()
      .then(response => {
        return Promise.resolve(response);
      });
  }
}
