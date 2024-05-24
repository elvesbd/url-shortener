# Encurtador de URLs

Este é um projeto de API REST construído com Node.js utilizando o framework NestJS e banco de dados PostgreSQL com ORM TypeORM.

## Sobre o Sistema

O objetivo deste sistema é fornecer um serviço de encurtamento de URLs. Os usuários podem enviar URLs longas para serem encurtadas, e o sistema retorna uma versão encurtada da URL.

## Funcionalidades Implementadas

- Cadastro e autenticação de usuários
- Encurtamento de URLs para no máximo 6 caracteres
- Registro de URLs encurtadas por usuários autenticados
- Listagem, edição e exclusão de URLs encurtadas por usuários autenticados
- Contabilização de acessos a URLs encurtadas
- Marcação lógica de registros deletados no banco de dados
- Estrutura de tabelas no banco relacional
- Autenticação de e-mail e senha com retorno de Bearer Token
- Redirecionamento de URLs encurtadas

## Requisitos

- Node.js
- PostgreSQL
- Docker-compose

## Variáveis de Ambiente

As seguintes variáveis de ambiente devem ser configuradas:

- `PORT`: 3000
- `JWT_SECRET`: NOkP94rH23q6H7a06yI/jdqv0PEELBHOVwS3Z8bnoRw=
- `POSTGRES_HOST`: localhost
- `POSTGRES_PORT`: 5432
- `POSTGRES_DB`: short-urls
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: postgres
- `BASE_URL`: http://localhost:3000/url/

## Endpoints

### Autenticação

- `POST /auth/login`: Realiza login e retorna um Bearer Token

### URLs Encurtadas

- `POST /urls/shorten`: Encurta uma URL
- `GET /urls/user`: Lista URLs encurtadas pelo usuário autenticado
- `PUT /urls/:shortUrl`: Atualiza a URL de destino de uma URL encurtada
- `DELETE /urls/:shortUrl`: Deleta uma URL encurtada

### Redirecionamento

- `GET /urls/:shortUrl`: Redireciona o usuário para a URL original e contabiliza o acesso

## Como Rodar o Projeto

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure as variáveis de ambiente
4. Inicie o banco de dados PostgreSQL com Docker-compose: `docker-compose up -d`
5. Execute as migrações do banco de dados: `npm run typeorm:migration:run`
6. Inicie o servidor com `npm run start:dev`

## Testes

Execute os testes unitários com o comando: `npm run test`

## Documentação da API

Acesse a documentação da API em `/api-docs` após iniciar

## Versão do Node.js

A versão do Node.js utilizada neste projeto está especificada no arquivo `.nvmrc` como `>=20`. Certifique-se de que está usando uma versão compatível.
