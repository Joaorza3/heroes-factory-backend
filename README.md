# Hero Factory

Aplicação desenvolvida em NestJS para gestão de heróis. Possui Docker Compose para o banco de dados MySQL e integrações com Prisma para persistência.

## Sumário

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
2. [Estrutura de Pastas](#estrutura-de-pastas)  
3. [Configuração do Ambiente](#configuração-do-ambiente)  
4. [Iniciando a Aplicação](#iniciando-a-aplicação)  
5. [Rodando Testes](#rodando-testes)  
6. [Entendendo o Projeto](#entendendo-o-projeto)  
7. [Endpoints Principais](#endpoints-principais)

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/) (via Docker)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

---

## Estrutura de Pastas

- **`src`**  
  Contém os módulos da aplicação, incluindo:
  - `heroes` (controller, service e DTOs)
  - `prisma.service.ts` (conexão com banco via Prisma)
  - `app.module.ts` (módulo raiz)

- **`prisma`**  
  - Migrations e arquivo `schema.prisma`.
  - `seed.ts` (script para popular dados iniciais).

- **`test`**  
  - Testes de integração (`heroes.service.integration.spec.ts`) e config do Jest E2E (`jest-e2e.json`).

- **`docker-compose.yml`**  
  - Configura dois serviços MySQL (um para desenvolvimento e outro para testes).

---

## Configuração do Ambiente

1. **Instale o Node.js (versão LTS recomendada).**  
2. **Renomeie/Crie seu `.env` a partir de `.env.sample`.**  
   - Ajuste as variáveis (`DATABASE_URL`, `CLIENT_URL`, etc.) conforme necessário.
3. **(Opcional) Ajuste `.env.test`** se desejar rodar testes em outro local/porta.

Exemplo de `.env`:
```bash
DATABASE_URL="mysql://root:rootpassword@localhost:3306/heroes_factory"
CLIENT_URL="http://localhost:3000"
```

---

## Iniciando a Aplicação

1. **Suba o banco MySQL**:
   ```bash
   docker-compose up -d
   ```
   Isso iniciará dois contêineres: `mysql` (porta 3306) e `mysql-test` (porta 3307).

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute migrations**:
   ```bash
   npx prisma migrate dev
   ```
   Isso aplicará as migrations na base `heroes_factory`.

4. **Opcional: popular dados**:
   ```bash
   npm run db:seed
   ```

5. **Inicie a aplicação**:
   ```bash
   npm run start:dev
   ```
   Por padrão, o servidor roda na porta `3001`.

---

## Rodando Testes

1. **Prepare banco de testes**:
   ```bash
   npm run db:integration:prepare
   ```
   Esse comando garante que o schema de teste seja criado no contêiner `mysql-test`.

2. **Rode os testes**:
   ```bash
   npm run test
   ```
   Para testes E2E (integração):
   ```bash
   npm run test:integration
   ```

---

## Entendendo o Projeto

- **NestJS** é utilizado como framework HTTP com estrutura modular (módulo de heróis).
- **Prisma** permite definir o modelo no arquivo `schema.prisma`. Ele gera o client para interagir com o banco.
- **Banco de Dados**: MySQL em contêiner Docker.  
- **Docker Compose**: Define os serviços `mysql` e `mysql-test`.

---

## Endpoints Principais

A rota base para o módulo de heróis é `/heroes`. Exemplos de uso:

1. **Criar Herói**  
   - **POST** `/heroes`  
   - Body (JSON):
     ```json
     {
       "name": "Tony Stark",
       "nickname": "Iron Man",
       "date_of_birth": "1963-03-01T00:00:00.000Z",
       "universe": "Marvel",
       "main_power": "Intelligence",
       "avatar_url": "https://exemplo.com/avatar.jpg"
     }
     ```

2. **Listar Heróis**  
   - **GET** `/heroes?name=Tony&skip=0`  
   - Suporta filtros como `name`, `universe`, `isActive`, `cursor`, `skip`.

3. **Obter Herói**  
   - **GET** `/heroes/:id`

4. **Atualizar Herói**  
   - **PATCH** `/heroes/:id`

5. **Ativar/Desativar Herói**  
   - **PATCH** `/heroes/:id/activate`  
   - **PATCH** `/heroes/:id/deactivate`

6. **Deletar Herói**
    - **DELETE** `/heroes/:id`

A maioria das respostas segue um padrão de saída:
```json
{
  "id": "string",
  "name": "string",
  "nickname": "string",
  "date_of_birth": "string",
  "universe": "string",
  "main_power": "string",
  "avatar_url": "string",
  "is_active": true,
  "created_at": "string",
  "updated_at": "string"
}
```

---

Para mais detalhes sobre a lógica de negócio, consulte os arquivos em `src/heroes`.  