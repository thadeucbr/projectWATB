# Use a imagem do Node.js como base
FROM node:22-bullseye

# Instala as dependências necessárias para o Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    unzip \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Definindo o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências separadamente para aproveitar o cache
COPY package.json package-lock.json ./

# Instala as dependências de forma rápida e determinística
RUN npm ci --silent

# Copia o restante do código para o container
COPY . .

# Expondo a variável de ambiente para que o Puppeteer saiba onde está o Chrome
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV CHROME_BIN=/usr/bin/chromium-browser

# Expondo a porta
EXPOSE $PORT

# Comando para iniciar a aplicação com hot reload usando ts-node-dev
CMD ["npm", "run", "dev"]
