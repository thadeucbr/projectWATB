# Utiliza a imagem Node 22 LTS baseada em Alpine para manter o tamanho reduzido
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências separadamente para aproveitar o cache
COPY package.json package-lock.json ./

# Instala as dependências de forma rápida e determinística
RUN npm ci --silent

# Copia o restante do código para o container
COPY . .

# Expõe a porta
EXPOSE $PORT

# Comando para iniciar a aplicação com hot reload usando ts-node-dev
CMD ["npm", "run", "dev"]
