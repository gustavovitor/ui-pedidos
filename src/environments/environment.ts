const PrimaryWebService = 'http://localhost:8080/';

export const environment = {
  production: false,

  TokenWhitelistedDomains: [new RegExp('localhost:8080')],
  TokenBlacklistedRoutes: [new RegExp('\/oauth\/token')],

  WebServiceList: {
    URLAuth: PrimaryWebService + 'oauth/token',
    URLLogout: PrimaryWebService + 'token/revoke',
    URLEmpresa: PrimaryWebService + 'empresa',
    URLPedido: PrimaryWebService + 'pedido',
    URLProduto: PrimaryWebService + 'produto'
  },

  SuccessSummaryMessages: [
    'Uufs, consegui.',
    'Opa, deu certo!',
    'Beleza, consegui!'
  ],

  WarningSummaryMessages: [
    'Ei, atenção!',
    'Cuidado, olhe bem..',
    'Calma aí, falta algo?'
  ],

  ErrorSummaryMessages: [
    'Hm, algo deu errado.',
    'Vish, pegou fogo aqui.',
    'Pera, fiquei sobrecarregado!'
  ],

  InfoSummaryMessages: [
    'Ei, olhe aqui..',
    'Sabia dessa?'
  ]
};
