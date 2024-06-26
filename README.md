## Descrição

Api desenvolvida em [Nest](https://github.com/nestjs/nest) para simular operações bancarias simples.

## Instalação

```bash
$ npm install
```

## Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testar

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Utilização

Para utilização é necessário realizar o cadastro de usuários e efetuar o login
- Cadastro - usuarios/cadastrar (POST)
- Login - usuarios/login (POST)

Para realizar operações é necessário cadastrar uma conta
- Cadastro - contas/cadastrar (POST)

Para realizar Transações
- Pagar - transacoes/pagar (POST)
- Pagar com Imagem - transacoes/pagarComImagem (POST)

Para Gerar extrato de operações
- Relatório - relatorios/transacoesByBody ou relatorios/transacoesByQuery (GET)

## Licença

[MIT licensed](LICENSE).
