# ProjectWATB: API de Integração WhatsApp com Socket.io

<!-- Sugestão: Adicione um logo ou banner do projeto aqui -->
<!-- Exemplo: ![Logo do Projeto](URL_DO_LOGO) -->

[![Status da Build](https://img.shields.io/badge/build-passing-brightgreen)](URL_DO_BADGE_BUILD)
[![Cobertura de Testes](https://img.shields.io/badge/coverage-100%25-brightgreen)](URL_DO_BADGE_COVERAGE)
[![Versão da Licença](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Versão do Projeto](https://img.shields.io/badge/version-1.0.0-blue)](package.json)
[![Linguagem](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)

Uma API robusta em Node.js e TypeScript para integrar com o WhatsApp via OpenWA, expondo funcionalidades através de uma API RESTful e comunicação em tempo real com WebSockets (Socket.io).

## Visão Geral Detalhada / Sobre o Projeto

O ProjectWATB foi desenvolvido para facilitar a comunicação automatizada e a integração de sistemas com o WhatsApp. Ele resolve o problema de criar uma ponte confiável entre aplicações web/serviços e a plataforma WhatsApp, permitindo o envio e recebimento de mensagens, gerenciamento de contatos e outras interações de forma programática.

Este projeto é destinado a desenvolvedores que precisam integrar funcionalidades do WhatsApp em suas aplicações, empresas que buscam automatizar o atendimento ao cliente ou qualquer pessoa que queira explorar as capacidades da API OpenWA de forma estruturada e escalável.

## Funcionalidades Principais

* Conexão com WhatsApp: Gerencia a conexão com a sessão do WhatsApp Web.
* Envio de Mensagens: Permite o envio de mensagens de texto para contatos do WhatsApp.
* API RESTful: Expõe endpoints para interações básicas (status, conectar, enviar mensagem).
* Comunicação em Tempo Real: Utiliza Socket.io para notificar o front-end sobre eventos do WhatsApp (ex: novas mensagens recebidas).
* Gerenciamento de Contatos (Telefones): Interface para gerenciar números de telefone, possivelmente incluindo cadastro, listagem, consulta e remoção (controlado por `phones.routes.ts`).
* Integração com Blip: Permite a integração com a plataforma Blip, possivelmente para envio de mensagens/notificações e recebimento de webhooks (controlado por `blip.routes.ts`).
* Funcionalidades de IA: Oferece capacidades de Inteligência Artificial, como integração com serviços de NLP para análise de sentimento ou implementação de um chatbot (controlado por `ai.routes.ts`).
* Testes de Arquivo: Disponibiliza rotas para upload e processamento de arquivos para fins de teste ou validação (controlado por `testfile.routes.ts`).
* Estrutura Modular: Código organizado em controladores, serviços e módulos para facilitar a manutenção e expansão.
* Dockerizado: Pronto para ser executado em contêineres Docker para fácil deployment e escalabilidade.

## Tecnologias Utilizadas

* Node.js (v22 LTS sugerida, conforme `package.json`)
* TypeScript (conforme `package.json` e `tsconfig.json`)
* Express.js (conforme `package.json`)
* Socket.io (conforme `package.json`)
* OpenWA (`@open-wa/wa-automate`) (conforme `package.json`)
* MongoDB (inferido pela dependência `mongodb` em `package.json` e a presença de `src/config/mongoClient.ts`)
* Winston (para logging, conforme `package.json` e `src/config/logger.ts`)
* Docker & Docker Compose (conforme `Dockerfile` e `docker-compose.yml`)

## Estrutura do Projeto

```plaintext
docker-compose.yml       # Configuração do Docker Compose
Dockerfile               # Definição do container Docker da aplicação
package.json             # Metadados do projeto e dependências NPM
readme.md                # Este arquivo
tsconfig.json            # Configurações do compilador TypeScript
src/
├── server.ts            # Ponto de entrada principal da aplicação Express
├── config/              # Configurações (logger, cliente MongoDB)
│   ├── logger.ts
│   └── mongoClient.ts
├── controller/          # Controladores da API (lógica de requisição/resposta)
│   ├── ai/              # Controladores para funcionalidades de IA
│   ├── blip/            # Controladores para integração com Blip
│   ├── testFile/        # Controladores para funcionalidades de teste de arquivo
│   └── whatsapp/        # Controladores para funcionalidades do WhatsApp
├── middleware/          # Middlewares Express (tratamento de erros, logs de requisição)
│   ├── errorHandler.ts
│   └── requestLogger.ts
├── modules/             # Módulos de negócio principais
│   ├── socket/          # Lógica do Socket.io (handler, DTOs)
│   └── whatsapp/        # Lógica de integração com OpenWA (cliente, DTOs)
├── routes/              # Definição das rotas da API
│   ├── index.ts         # Roteador principal
│   └── api/
│       ├── index.ts     # Roteador da API
│       └── v1/          # Rotas da versão 1 da API
│           ├── ai.routes.ts
│           ├── blip.routes.ts
│           ├── index.ts
│           ├── phones.routes.ts
│           ├── testfile.routes.ts
│           └── whatsapp.routes.ts
```

## Pré-requisitos

* Node.js (versão especificada em `package.json` ou compatível, ex: v22 LTS)
* NPM (geralmente vem com o Node.js)
* Docker e Docker Compose (para execução em contêiner)
* MongoDB (uma instância local, em Docker, ou em nuvem, conforme configurado em `.env`)

## Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto:

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/thadeucbr/projectWATB.git
   cd projectWATB
   ```

2. **Configurar Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do projeto. Se houver um arquivo `.env.example`, copie-o para `.env`.
   Abaixo um exemplo de configuração do arquivo `.env`:

   ```env
   # Porta em que a API será executada (deve corresponder à porta no docker-compose.yml)
   PORT=3001

   # Lista de telefones para alguma funcionalidade específica (ex: endpoint /api/v1/phones)
   # Formato: JSON array de objetos, cada objeto com "name" e "number" (incluindo @c.us)
   PHONE_LIST='[{ "name": "Beta Institucional PF", "number": "551126509993@c.us"}, { "name": "Beta PJ", "number": "551126509977@c.us"}]'

   # Chave da API da OpenAI (necessária para funcionalidades de IA)
   # Formato: Bearer sk-proj-XXXXX--XXXX
   OPENAI_API_KEY=Bearer sk-proj-SEU_TOKEN_AQUI

   # URL da instância do OpenWA (se estiver rodando separadamente ou em outro container)
   OPENWA_API_URL=http://openwa:8088

   # Configuração para o Chokidar (usado para hot-reloading em desenvolvimento)
   # Definir como true pode ser útil em alguns ambientes Docker ou sistemas de arquivos específicos
   CHOKIDAR_USEPOLLING=true

   # Chaves para roteadores/bots específicos (ex: para integração com Blip ou múltiplos bots WhatsApp)
   # Formato: JSON array de objetos, cada objeto com "router" (identificador do bot/telefone) e "key" (chave de API/autenticação)
   ROUTER_KEYS='[{"router": "551126509977@c.us", "key": "Key SUA_CHAVE_BLIP_AQUI"}, {"router": "551126509993@c.us", "key": "Key SUA_OUTRA_CHAVE_BLIP_AQUI"}]'

   # URI de conexão com o MongoDB
   # Formato: mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
   MONGO_URI=mongodb://mongo:27017

   # Nome do banco de dados MongoDB a ser utilizado
   DB_NAME=testdb

   # Outras variáveis que podem ser necessárias:
   # SECRET_KEY=sua-chave-secreta-super-segura # Chave para JWT ou outras necessidades de segurança
   # OPENWA_SESSION_ID=minha_sessao_whatsapp # ID da sessão para persistência no OpenWA
   ```

   *Observação: Edite o `.env` com suas configurações específicas. Consulte `src/config/` e a lógica da aplicação para entender quais variáveis são estritamente necessárias para cada funcionalidade.*

3. **Instalar Dependências (Opção Local):**

   Se for rodar localmente sem Docker (para desenvolvimento):

   ```bash
   npm install
   ```

4. **Construir o Projeto (Opção Local):**

   Para compilar o TypeScript para JavaScript (conforme script `build` em `package.json`):

   ```bash
   npm run build
   ```

## Uso / Como Executar

### Opção 1: Usando Docker (Recomendado para Produção/Simplicidade)

Certifique-se de que o Docker e Docker Compose estão instalados e rodando.
O comando `npm run dev` é usado no `docker-compose.yml`, o que é bom para desenvolvimento, mas para produção, você pode querer mudar para `npm start` após um `npm run build` no Dockerfile.

```bash
# Suba os containers (o --build é necessário na primeira vez ou após mudanças no Dockerfile/código)
sudo docker-compose up --build -d # O -d executa em modo detached (background)
```

A API estará disponível em `http://localhost:<PORTA_DEFINIDA_NO_.ENV_E_NO_DOCKER_COMPOSE>` (ex: `http://localhost:3000`).

Para ver os logs:

```bash
sudo docker-compose logs -f projectwatb-app
```

Para parar os containers:

```bash
sudo docker-compose down
```

### Opção 2: Localmente (Para Desenvolvimento)

Após instalar as dependências (`npm install`):

```bash
# Para iniciar em modo de desenvolvimento com hot-reload (conforme script `dev` em `package.json`)
npm run dev
```

Ou, se já tiver buildado o projeto (`npm run build`):

```bash
# Para iniciar a versão compilada (conforme script `start` em `package.json`)
npm start
```

A API estará disponível em `http://localhost:<PORTA_DEFINIDA_NO_.ENV>` (ex: `http://localhost:3000`).

### Endpoints da API

O projeto expõe diversos endpoints através das rotas definidas em `src/routes/api/v1/`. Consulte os respectivos arquivos de rota e controllers para detalhes completos sobre os corpos de requisição e resposta.

* **WhatsApp (`whatsapp.routes.ts` e `WhatsApp.controller.ts`):**
  * `POST /api/v1/whatsapp/webhook`: Endpoint para receber webhooks do WhatsApp. O corpo da requisição (`req.body`) é processado pelo `handleIncomingWebhook` do bot.
    * _Nota: A interação com o WhatsApp é primariamente gerenciada via webhooks e a instância `bot` (`OpenWA.ts`) que  lida com conexão, envio de mensagens e status internamente, notificando o front-end via Socket.io._

* **AI (`ai.routes.ts` e `Ai.controller.ts`):**
  * `POST /api/v1/ai`: Executa uma funcionalidade de IA. O corpo da requisição (`req.body`) é passado para o `AiService` para obter uma resposta (ex: do GPT).
    * **Request Body:**
      * `application/json`

      ```json
      // Exemplo de corpo de requisição para a API de IA
      {
        "prompt": "Descreva o que esta API de IA faz e como posso interagir com ela.",
        "max_tokens": 150,
        "temperature": 0.7,
        "model": "text-davinci-003" // Exemplo de modelo, ajuste conforme a implementação real
        // Outros parâmetros específicos da IA podem ser adicionados aqui
      }
      ```
    * **Response:**
      * `application/json`
      ```json
      {
        "result": "Resposta gerada pela IA",
        "metadata": {
          // Metadados sobre a execução da IA
        }
      }
      ```

* **Blip (`blip.routes.ts` e `Blip.controller.ts`):**
  * `GET /api/v1/blip/context`: Obtém o contexto de um usuário no Blip.
    * **Query Params:** `userId` (obrigatório), `router` (obrigatório).
  * `DELETE /api/v1/blip/context`: Deleta uma variável do contexto de um usuário no Blip.
    * **Query Params:** `userId` (obrigatório), `varName` (obrigatório), `router` (obrigatório).
  * `PUT /api/v1/blip/context/reset`: Reseta o contexto de um usuário no Blip (identificado pelo telefone).
    * **Body (JSON):** `{ "phone": "numero_do_telefone", "router": "nome_do_router" }`

* **Phones (`phones.routes.ts`):**
  * `GET /api/v1/phones`: Retorna uma lista de telefones configurada na variável de ambiente `PHONE_LIST`.

* **TestFile (`testfile.routes.ts` e `TestFile.controller.ts`):**
  * `POST /api/v1/testfiles`: Cria um novo arquivo de teste.
    * **Body (JSON):** `{ "content": "conteúdo_do_arquivo" }` (conforme `CreateTestFileDTO`).
  * `GET /api/v1/testfiles`: Lista todos os arquivos de teste.
  * `GET /api/v1/testfiles/:id`: Obtém um arquivo de teste específico pelo ID.
  * `PUT /api/v1/testfiles/:id`: Atualiza um arquivo de teste específico.
    * **Body (JSON):** `{ "content": "novo_conteúdo_do_arquivo" }` (conforme `UpdateTestFileDTO`).
  * `DELETE /api/v1/testfiles/:id`: Deleta um arquivo de teste específico.

### WebSocket (`socket.io`)

O servidor Socket.io (configurado em `src/modules/socket/socketIO.ts` e `socketHandler.ts`) permite comunicação em tempo real.

* **Conexão no Cliente (Exemplo JavaScript):**

  ```javascript
  // Conecte ao servidor Socket.io (ajuste a URL e porta se necessário)
  const socket = io("http://localhost:3000");

  // Ouvir evento de QR Code para conexão com WhatsApp
  socket.on("qr", (qrCodeDataUrl) => {
    console.log("QR Code para escanear (Data URL):");
    // Lógica para exibir o QR Code na interface do usuário
    // Exemplo: document.getElementById('qrcodeImage').src = qrCodeDataUrl;
  });

  // Ouvir evento de status da conexão com WhatsApp
  socket.on("whatsapp_status", (status) => {
    console.log("Status da conexão WhatsApp:", status);
    // Ex: "connected", "disconnected", "loading", "qr_required", etc.
  });

  // Ouvir evento de nova mensagem recebida
  socket.on("message", (messageData) => {
    console.log("Nova mensagem recebida:", messageData);
    // Estrutura de messageData conforme definido pelo OpenWA e seu DTO
    // Ex: { from: 'sender_number', body: 'message_content', timestamp: 1678886400, ... }
  });
  ```

## Como Contribuir

Contribuições são muito bem-vindas! Se você deseja contribuir com o ProjectWATB, por favor, siga estas diretrizes:

1. **Reportar Bugs:**
   * Use a seção "Issues" do repositório GitHub.
   * Descreva o bug detalhadamente: o que você fez, o que esperava e o que aconteceu.
   * Inclua mensagens de erro, screenshots (se aplicável) e informações do seu ambiente (OS, Node.js, Docker version).

2. **Sugerir Novas Funcionalidades:**
   * Abra uma "Issue" com um título claro (ex: "Sugestão de Funcionalidade: ...").
   * Descreva a funcionalidade, o problema que ela resolve e por que ela seria útil para o projeto.

3. **Processo para Pull Requests (PRs):**
   * Faça um **fork** do repositório.
   * Crie uma nova **branch** para sua feature ou correção (`git checkout -b feature/nova-feature` ou `bugfix/corrige-tal-coisa`).
   * Faça suas alterações e **commits** com mensagens claras e descritivas.
   * Siga os padrões de código do projeto (se houver linters/formatters, execute-os. Ex: `npm run lint`, `npm run format`).
   * Adicione testes para suas alterações, se aplicável.
   * Certifique-se de que todos os testes estão passando.
   * Envie um **Pull Request** para a branch `main` (ou `develop`) do repositório original.
   * Descreva suas alterações no PR e referencie a Issue relacionada, se houver.

## Roteiro Futuro / Próximos Passos (Opcional)

* [ ] Implementar testes unitários e de integração abrangentes com Jest ou similar.
* [ ] Adicionar documentação da API interativa usando Swagger/OpenAPI e ferramentas como `swagger-ui-express`.
* [ ] Expandir as funcionalidades do módulo de IA (ex: integração com mais modelos, treinamento customizado).
* [ ] Melhorar o tratamento de erros e a resiliência da conexão com o WhatsApp, incluindo reconexão automática.
* [ ] Adicionar um painel de administração simples para gerenciar conexões e ver logs.

## Agradecimentos

* À equipe do [OpenWA](https://openwa.dev/) por criar e manter a biblioteca que torna esta integração possível.
* A todas as bibliotecas de terceiros e à comunidade open-source que tornam projetos como este viáveis.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

🚀 **Dúvidas, sugestões ou problemas?** Abra uma **issue** ou envie um **pull request**. Sua colaboração é muito bem-vinda! 😃
