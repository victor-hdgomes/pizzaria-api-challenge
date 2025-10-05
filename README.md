# API NestJS - Pizzaria

Esta é a API backend do projeto **Pizzaria Web Challenge**, construída com **NestJS** e **TypeScript**. Ela fornece endpoints para gerenciar pedidos, pizzas e usuários.

O projeto já inclui um arquivo `.env.example` para configuração das variáveis de ambiente.

---

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/victor-hdgomes/pizzaria-api-challenge
cd https://github.com/victor-hdgomes/pizzaria-api-challenge
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
```

3. Configure as variáveis de ambiente:

* Copie o arquivo `.env.example` para `.env` e preencha as variáveis necessárias:

```bash
cp .env.example .env
```

4. Rode o servidor de desenvolvimento:

```bash
npm run start:dev
# ou
yarn start:dev
# ou
pnpm start:dev
```

O servidor estará rodando no endereço padrão: [http://localhost:3000](http://localhost:3000)

---

## Comandos Úteis

* Rodar o projeto em produção:

```bash
npm run start:prod
```

* Rodar testes unitários:

```bash
npm run test
```

* Rodar testes E2E:

```bash
npm run test:e2e
```

* Gerar cobertura de testes:

```bash
npm run test:cov
```
