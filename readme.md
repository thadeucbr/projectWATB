# OpenWA API com Socket.io

Este projeto é uma API em **Node.js + TypeScript** que integra o [OpenWA](https://openwa.dev/) e expõe um **WebSocket** via `socket.io` para comunicação com o front-end.

## 🚀 Tecnologias Utilizadas

- **Node.js 22 LTS**  
- **TypeScript**  
- **Express.js**  
- **Socket.io**  
- **OpenWA**  
- **Docker & Docker Compose**  

---

## 📦 Instalação e Execução

### **1. Clonar o Repositório**

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### **2. Configurar as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto e defina as variáveis:

```env
PORT=3000
SECRET_KEY=minha-chave-secreta
```

### **3. Subir o Container Docker**

```sh
sudo docker-compose up --build
```

Agora a API estará disponível em `http://localhost:3000`.

---

## 🛠️ Endpoints da API

### **1. Verificar Status**

```http
GET /status
```

**Resposta:**

```json
{ "status": "online" }
```

### **2. Conectar ao WhatsApp**

```http
POST /connect
```

### **3. Enviar Mensagem**

```http
POST /send
```

**Body:**

```json
{
  "number": "5511999999999",
  "message": "Olá, este é um teste!"
}
```

---

## 💼 WebSocket (`socket.io`)

O servidor expõe um WebSocket que permite receber eventos do WhatsApp em tempo real.

### **Exemplo de Conexão no Front-end**

```js
const socket = io("http://localhost:3000");

socket.on("message", (data) => {
  console.log("Nova mensagem recebida:", data);
});
```

---

## 🛠 Desenvolvimento

Se quiser rodar o projeto sem Docker:

### **1. Instalar Dependências**

```sh
npm install
```

### **2. Rodar o Servidor**

```sh
npm run dev
```

Agora a API estará disponível em `http://localhost:3000`.

---

## 🐜 Licença

Este projeto é open-source e está sob a licença **MIT**.

---

🚀 **Contribuições são bem-vindas!** Qualquer dúvida, abra uma **issue** ou faça um **pull request**. 😃
