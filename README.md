# Documentação da Aplicação

## Introdução

Esta é uma aplicação Next.js de uma agenda de contatos que utiliza o Prisma para acesso ao banco de dados. É possível realizar as operações básicas de CRUD (criação, leitura, atualização e exclusão) de contatos e seus respectivos telefones. A rota para a aplicação localmente é: 
- front-end: [localhost:3000](http://localhost:3000/)
- api: [localhost:3000/api](http://localhost:3000/api)

## Pré-requisitos
Antes de rodar a aplicação, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)
- Yarn (versão 1 ou superior)
- Um banco de dados PostgreSQL 
- caso não tenha o postgres pode usar este para testes: 
```bash
postgres://davinti_user:mQpsbfy6xy2HymxO84VHSNO0T7GE4Rl7@dpg-chdp7qu7avj0djja90m0-a.oregon-postgres.render.com/davinti
```

Instalação

Para instalar as dependências, execute o comando:

```bash
yarn
```

Configuração

Crie um arquivo chamado .env na raiz do projeto e defina a variável DATABASE_URL com a URL de conexão do seu banco de dados PostgreSQL. Exemplo:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
```
Substitua user, password e mydatabase pelos valores correspondentes do seu banco de dados PostgreSQL.

### Você pode utilizar o database_url abaixo para conexão com banco que está dispónivel no render.com:
```bash
postgres://davinti_user:mQpsbfy6xy2HymxO84VHSNO0T7GE4Rl7@dpg-chdp7qu7avj0djja90m0-a.oregon-postgres.render.com/davinti
```
## Execução em Desenvolvimento

Para executar a aplicação em modo de desenvolvimento, execute o comando:

```bash
yarn dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Deployment
Para executar a aplicação em produção, primeiro gere os arquivos estáticos com o comando **yarn build**, e então execute o comando:

```bash
yarn start
```
Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Uso

A aplicação permite a realização das seguintes operações:

- Listar todos os contatos: GET /api/contato
- Criar um contato: POST /api/contato
- Ler um contato: GET /api/contato/:id
- Atualizar um contato: PATCH /api/contato/:id
- Deletar um contato: DELETE /api/contato/:id
