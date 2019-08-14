import { Empresa } from '../empresa/empresa';

export class Produto {
  id?: number;
  nome: string;
  imgUrl?: string;
  descricao: string;
  preco: number;
  empresa: Empresa;
}

export class ProdutoItem {
  produto: Produto;
  key: number;
  qtdProduto = 0;
}
