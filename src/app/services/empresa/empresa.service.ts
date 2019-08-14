import { Injectable } from '@angular/core';
import { BaseHttp } from '../security/base-http';
import { environment } from '../../../environments/environment';
import { Empresa } from '../../core/model/empresa/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: BaseHttp) { }

  URL = environment.WebServiceList.URLEmpresa;

  findById(id: number): Promise<Empresa> {
    return this.http.get<Empresa>(`${this.URL}/${id}`).toPromise();
  }

  findAll(): Promise<Array<Empresa>> {
    return this.http.get<Array<Empresa>>(`${this.URL}`).toPromise();
  }

  insert(object: Empresa): Promise<Empresa> {
    return this.http.post<Empresa>(this.URL, object).toPromise();
  }

  update(object: Empresa): Promise<Empresa> {
    return this.http.put<Empresa>(`${this.URL}/${object.id}`,
      object, {}).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }

}
