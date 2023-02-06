# 🧪 Teste técnico Toraline

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- Express
- TypeScript
- Zod

## 📥 Instalando o Projeto

### Programas necessários

- Git **(ou baixe o repositório como .zip)**
- Node **(preferência na versão LTS)**

### Etapas

- Vá até a pasta do projeto `orcamento-api` e rode o comando `yarn` ou `npm install` para instalar as dependências do projeto;
- Crie o arquivo `.env` na raíz do projeto e adicione as variáveis necessárias como mostra o arquivo `.env.example`;
- Rode o projeto com o comando `yarn start` ou `npm start`;

## 🌐 API

### Lista dos Usuários **/users [GET]**

- Response 200 (application/json)
  ```json
  [
    {
      "id": 1,
      "name": "cvRhuZicvV",
      "tax": 79
    },
    {
      "id": 2,
      "name": "P5hBDBonm3",
      "tax": 121
    },
    // ...
  ]
  ```

### Lista dos Produtos **/products [GET]**

- Response 200 (application/json)
  ```json
  [
    {
      "id": 1,
      "name": "explicabo alias hic reprehenderit deleniti quos id reprehenderit consequuntur ipsam iure voluptatem ea culpa excepturi ducimus repudiandae ab",
      "price": 6945
    },
    {
      "id": 2,
      "name": "nostrum veritatis reprehenderit repellendus vel numquam soluta ex inventore ex",
      "price": 2435
    },
    // ...
  ]
  ```

### Cálculo de orçamento **/budget [POST]**

- Request (application/json)
  - Body
    ```json
    {
      "userId": 1,
      "productsId": [1, 2],
    }
    ```

- Response 200 (application/json)
  ```json
  {
    "total": 7410.2
  }
  ```
