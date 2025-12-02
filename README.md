# Order API - Node.js (Desafio)

## Como executar (local)
1. Instale Node.js (v16+).
2. Clone o repositório.
3. `cd order-api`
4. Copie `.env.example` para `.env` e ajuste `MONGODB_URI`.
5. `npm install`
6. `npm run dev` (requer nodemon) ou `npm start`
7. API rodando em `http://localhost:3000`

## Endpoints
- POST  `/order` — criar pedido (body no formato recebido no enunciado; será mapeado)
- GET   `/order/:numeroPedido` — obter pedido por número
- GET   `/order/list` — listar todos
- PUT   `/order/:numeroPedido` — atualizar pedido (body com mesmo formato)
- DELETE`/order/:numeroPedido` — deletar pedido

## Observações
- Dados são mapeados antes de salvar (ver controllers/orderController.js).
- Banco usado: MongoDB (Mongoose).
