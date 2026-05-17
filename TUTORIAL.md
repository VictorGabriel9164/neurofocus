# NeuroFocus — Backend: Tutorial de Instalação

## Pré-requisitos

- **Node.js 20+** → https://nodejs.org
- **PostgreSQL 15+** → https://www.postgresql.org/download/

---

## Passo 1 — Criar o banco no PostgreSQL

Abra o terminal e conecte ao PostgreSQL:

```bash
# Mac/Linux
psql -U postgres

# Windows (SQL Shell instalado com o PostgreSQL)
# Abra o "SQL Shell (psql)" pelo menu iniciar
```

Dentro do psql, execute:

```sql
CREATE DATABASE neurofocus;
\q
```

---

## Passo 2 — Instalar as dependências

Abra o terminal dentro da pasta `neurofocus-backend`:

```bash
cd neurofocus-backend
npm install
```

---

## Passo 3 — Configurar o arquivo .env

Copie o arquivo de exemplo:

```bash
# Mac/Linux
cp .env.example .env

# Windows
copy .env.example .env
```

Abra o `.env` e edite:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/neurofocus"
JWT_SECRET="qualquer_texto_longo_e_secreto_aqui"
PORT=3001
```

> Substitua `SUA_SENHA` pela senha do seu PostgreSQL.

---

## Passo 4 — Gerar o Prisma e criar as tabelas

```bash
npx prisma generate
npx prisma db push
```

Você deve ver: `✓ Your database is now in sync with your Prisma schema.`

---

## Passo 5 — Iniciar o servidor

```bash
npm run dev
```

Saída esperada:
```
✅ NeuroFocus API rodando em http://localhost:3001
```

Teste abrindo no navegador: http://localhost:3001/health

---

## Referência das rotas da API

> Rotas marcadas com 🔒 precisam do header `Authorization: Bearer TOKEN`

### Autenticação

| Método | Rota | Body | Descrição |
|--------|------|------|-----------|
| POST | `/api/auth/registrar` | `{ name, email, password }` | Criar conta |
| POST | `/api/auth/login` | `{ email, password }` | Login (retorna token) |
| GET | `/api/auth/me` 🔒 | — | Dados do usuário logado |

**Resposta do login/registrar:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "name": "João", "email": "joao@email.com" }
}
```

---

### Tarefas 🔒

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tasks` | Listar todas |
| GET | `/api/tasks?status=PENDENTE` | Filtrar por status |
| GET | `/api/tasks?period=today` | Filtrar por período |
| GET | `/api/tasks/today` | Tarefas de hoje |
| GET | `/api/tasks/tomorrow` | Tarefas de amanhã |
| GET | `/api/tasks/upcoming` | Próximas tarefas |
| GET | `/api/tasks/:id` | Buscar uma tarefa |
| POST | `/api/tasks` | Criar tarefa |
| PUT | `/api/tasks/:id` | Editar tarefa |
| PATCH | `/api/tasks/:id/concluir` | Marcar concluída/pendente |
| DELETE | `/api/tasks/:id` | Deletar tarefa |

**Valores de `status`:** `PENDENTE` · `CONCLUIDA` · `ATRASADA`
**Valores de `period`:** `today` · `tomorrow` · `upcoming`

**Body para criar tarefa:**
```json
{
  "title": "Resolver exercícios página 45",
  "subject": "Matemática",
  "description": "Exercícios do capítulo 3 (opcional)",
  "dueDate": "2026-05-18T10:00:00.000Z"
}
```

**Body para marcar concluída:**
```json
{ "concluida": true }
```

---

### Progresso 🔒

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/progress` | Resumo geral |
| GET | `/api/progress/periodo?periodo=hoje` | Por período |
| GET | `/api/progress/materias` | Por matéria |
| GET | `/api/progress/materias?periodo=semana` | Por matéria + período |

**Valores de `periodo`:** `hoje` · `semana` · `mes`

**Exemplo de resposta do resumo geral:**
```json
{
  "resumo": {
    "concluidas": 8,
    "emAndamento": 3,
    "atrasadas": 1,
    "total": 12,
    "percentualConcluido": 67
  }
}
```

**Exemplo de resposta de matérias:**
```json
{
  "materias": [
    {
      "materia": "Matemática",
      "concluidas": 5,
      "emAndamento": 2,
      "atrasadas": 1,
      "total": 8,
      "percentualConcluido": 63
    }
  ]
}
```

---

## Comandos úteis

```bash
# Ver tabelas e dados pelo navegador (interface visual)
npx prisma studio

# Recriar tabelas do zero (APAGA todos os dados)
npx prisma db push --force-reset

# Ver o banco de dados pelo terminal
psql -U postgres -d neurofocus
```

---

## Solução de problemas

**"Erro ao conectar ao banco"**
- Confirme que o PostgreSQL está rodando
- Verifique a senha no `.env`

**"Port 3001 already in use"**
```bash
# Mac/Linux
kill -9 $(lsof -ti:3001)
```

**"Cannot find package '@prisma/client'"**
```bash
npm install
npx prisma generate
```
