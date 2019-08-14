import { EmpresaService } from '../../../services/empresa/empresa.service';
import { ProdutoService } from '../../../services/produto/produto.service';

export class StartDatabase {
  constructor(private empresaService: EmpresaService,
              private produtoService: ProdutoService) {
  }

  startAll() {
    this.empresaService.insert({
      nome: 'Fritz',
      cnpj: '81.107.234/0001-34',
      ie: '418.333.738.333',
      dataAbertura: new Date(),
      email: 'teste@admin.com',
      fone: '(99) 9 9999-9999',
      endereco: {
        bairro: 'Triz',
        cep: '85850000',
        cidade: 'Alabama',
        estado: 'Sweet',
        logradouro: 'Street Qualquer',
        numero: 'A14'
      }
    })
      .then(response => {
        this.produtoService.insert({
          nome: 'Salame',
          descricao: 'Salame colonial..',
          empresa: response,
          imgUrl: 'https://http2.mlstatic.com/salame-puro-tipo-italiano-defumado-D_NQ_NP_845401-MLB25717307140_062017-F.jpg',
          preco: 12.99
        });

        this.produtoService.insert({
          nome: 'Picanha',
          descricao: 'Picanha fresca..',
          empresa: response,
          imgUrl: 'https://assets.xtechcommerce.com/uploads/images/medium/3edfb858732c38adfd6850483fd8cd2a.jpg',
          preco: 59.25
        });

        this.produtoService.insert({
          nome: 'Maionese',
          descricao: 'Maionese Hemmer..',
          empresa: response,
          imgUrl: 'https://emporiohemmer.com.br/arquivos/produtos/imagens_adicionais/maionese-com-alho-290g-hemmer-1.jpg',
          preco: 6.99
        });

        this.produtoService.insert({
          nome: 'Ketchup',
          descricao: 'Ketchup Heinz..',
          empresa: response,
          imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/7103q7KedjL._SL1500_.jpg',
          preco: 6.99
        });

        this.produtoService.insert({
          nome: 'Contra-filé',
          descricao: 'Contra-filé fresco..',
          empresa: response,
          imgUrl: 'https://swiftbr.vteximg.com.br/arquivos/ids/158130-1200-800/contra-file-swift-mais-kg-a-615481.jpg?v=636499721579930000',
          preco: 23.99
        });

        console.log('Item inserido. ' + 'Campeão');
      });

    this.empresaService.insert({
      nome: 'Pizzaria King',
      cnpj: '47.011.961/0001-65',
      ie: '418.381.738.638',
      dataAbertura: new Date(),
      email: 'teste@admin.com',
      fone: '(99) 9 9999-9999',
      endereco: {
        bairro: 'Texas',
        cep: '85850000',
        cidade: 'Alabama',
        estado: 'Sweet',
        logradouro: 'Street Qualquer',
        numero: 'A14'
      }
    })
      .then(response => {
        this.produtoService.insert({
          nome: 'Pizza',
          descricao: 'Pizza grande..',
          empresa: response,
          imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/a9/f9/82/grande-pizza.jpg',
          preco: 32.99
        });

        this.produtoService.insert({
          nome: 'Pizza',
          descricao: 'Pizza pequena..',
          empresa: response,
          imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/a9/f9/82/grande-pizza.jpg',
          preco: 22.99
        });

        console.log('Item inserido. ' + 'Jack');
      });
  }

  startProdutos() {
    this.empresaService.findAll()
      .then(response => {
        response.forEach(x => {
          this.produtoService.insert({
            nome: 'Ketchup',
            descricao: 'Ketchup Heinz..',
            empresa: x,
            imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/7103q7KedjL._SL1500_.jpg',
            preco: 6.99
          });

          this.produtoService.insert({
            nome: 'Picanha',
            descricao: 'Picanha fresca..',
            empresa: x,
            imgUrl: 'https://assets.xtechcommerce.com/uploads/images/medium/3edfb858732c38adfd6850483fd8cd2a.jpg',
            preco: 52.25
          });

          this.produtoService.insert({
            nome: 'Contra-filé',
            descricao: 'Contra-filé fresco..',
            empresa: x,
            imgUrl:
              'https://swiftbr.vteximg.com.br/arquivos/ids/158130-1200-800/contra-file-swift-mais-kg-a-615481.jpg?v=636499721579930000',
            preco: 23.99
          });
        });
      });
  }
}
