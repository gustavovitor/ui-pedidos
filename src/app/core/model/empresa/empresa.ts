import { Endereco } from '../util/endereco';

export class Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  ie: string;
  dataAbertura: Date;
  email: string;
  endereco: Endereco;
  fone: string;

  quantidadeProdutos ? = 0;
}
