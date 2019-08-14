import { Injectable } from '@angular/core';
import { BaseHttp } from '../security/base-http';
import { environment } from '../../../environments/environment';
import { Produto, ProdutoItem } from '../../core/model/produto/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: BaseHttp) { }

  URL = environment.WebServiceList.URLProduto;


  findById(id: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.URL}/${id}`).toPromise();
  }

  findAll(): Promise<any> {
    return this.http.get<Array<Produto>>(`${this.URL}`).toPromise();
  }

  findAllByEmpresa(id: number): Promise<Array<Produto>> {
    return this.http.get<Array<Produto>>(`${this.URL}/empresa/${id}`).toPromise();
  }

  insert(object: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.URL, object).toPromise();
  }

  update(object: Produto): Promise<Produto> {
    return this.http.put<Produto>(`${this.URL}/${object.id}`,
      object, {}).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }

}
