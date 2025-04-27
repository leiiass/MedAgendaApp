## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- JWT para autenticação
- bcryptjs para criptografia de senhas

## Configuração do Ambiente

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
  ```
  PORT=3000
  JWT_SECRET=your-secret-key
  ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm start`: Inicia o servidor em modo de produção

## Endpoints da API

### Autenticação

- POST `/auth/login` - Login de usuário
- POST `/auth/register` - Registro de novo usuário
- POST `/auth/logout` - Logout
- GET `/auth/me` - Obter informações do usuário atual

### Consultas

- GET `/consultas` - Listar todas as consultas
- GET `/consultas/:id` - Obter consulta por ID
- POST `/consultas` - Criar nova consulta
- PUT `/consultas/:id` - Atualizar consulta
- PATCH `/consultas/:id/status` - Atualizar status da consulta
- DELETE `/consultas/:id` - Excluir consulta
- GET `/consultas/status/:status` - Listar consultas por status
- GET `/consultas/paciente/:pacienteId` - Listar consultas por paciente
- GET `/consultas/medico/:medicoId` - Listar consultas por médico

## Observações

Este é um servidor de mock para desenvolvimento, que será substituído posteriormente por uma implementação real. Os dados são armazenados em memória e serão perdidos quando o servidor for reiniciado.
