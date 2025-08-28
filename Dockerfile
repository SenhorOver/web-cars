# Estágio de compilação
FROM node:22.18.0-alpine AS build-stage

# Definir diretório de trabalho dentro do container
WORKDIR /src

# Copia os arquivos de configuração do projeto (package.json e package-lock.json)
COPY package*.json /src/

# Instalar as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . /src

# Compila a aplicação para produção
RUN npm run build

# Estágio de publicação
FROM nginx:alpine AS publish-stage

# Copiar os arquivos compilados do estágio de compilação para o diretório
COPY --from=build-stage /src/dist/ /usr/share/nginx/html

# Expõe a porta 80 para o serviço HTTP
EXPOSE 80

# Inicia o Nginx e mantém o processo em primeiro plano
CMD ["nginx", "-g", "daemon off;"]