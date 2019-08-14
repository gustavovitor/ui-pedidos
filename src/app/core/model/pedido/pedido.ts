import { User } from '../security/auth-user';
import { Produto, ProdutoItem } from '../produto/produto';
import { Endereco } from '../util/endereco';

export class Pedido {
  id: number;
  usuario: User;
  produtoList = new Array<ProdutoItem>();
  enderecoEntrega = new Endereco();
}
