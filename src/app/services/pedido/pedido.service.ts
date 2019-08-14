import { Injectable } from '@angular/core';
import { BaseHttp } from '../security/base-http';
import { environment } from '../../../environments/environment';
import { Pedido } from '../../core/model/pedido/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: BaseHttp) { }

  URL = environment.WebServiceList.URLPedido;


  findById(id: number): Promise<Pedido> {
    return this.http.get<Pedido>(`${this.URL}/${id}`).toPromise();
  }

  findAll(): Promise<any> {
    return this.http.get<Array<Pedido>>(`${this.URL}`).toPromise();
  }

  findAllByUser(id: number): Promise<any> {
    return this.http.get<Array<Pedido>>(`${this.URL}/usuario/${id}`).toPromise();
  }

  insert(object: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(this.URL, object).toPromise();
  }

  update(object: Pedido): Promise<Pedido> {
    return this.http.put<Pedido>(`${this.URL}/${object.id}`,
      object, {}).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }

}
