# WebCars

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/SenhorOver/web-cars/blob/master/LICENSE)

# Sobre o projeto

https://web-cars-ruddy.vercel.app/

WebCars é uma aplicação inspirada no site WebMotors.

WebCars oferece um ambiente onde possibilita o anúncio de carros, os usuários podem publicar seus anúncios e os clientes podem navegar e encontrar o carro desejado.

## Layout mobile

Home (/)

<img src="https://i.ibb.co/ymrgbpYY/Screenshot-from-2025-08-03-22-20-42.png" alt="Screenshot-from-2025-08-03-22-20-42" border="0" /> 

Dashboard (/dashboard -> protected)

<img src="https://i.ibb.co/pBYxwb3z/Screenshot-from-2025-08-03-22-20-56.png" alt="Screenshot-from-2025-08-03-22-20-56" border="0" />

New Car (/dashboard/new -> protected)

<img src="https://i.ibb.co/yn15FpVc/Screenshot-from-2025-08-03-22-20-50.png" alt="Screenshot-from-2025-08-03-22-20-50" border="0" /> 

Car preview (/car/:id)

<img src="https://i.ibb.co/996sVv4D/Screenshot-from-2025-08-03-22-21-18.png" alt="Screenshot-from-2025-08-03-22-21-18" border="0" />

## Layout web

Home
![Web 1](https://i.ibb.co/fJvfw9f/Screenshot-from-2025-08-03-22-19-31.png)

Login (/login)
![Web 2](https://i.ibb.co/N6hK5m1F/Screenshot-from-2025-08-03-22-19-49.png)

Dashboard (/dashboard) - Rota protegida
![Web 3](https://i.ibb.co/W434VLY9/Screenshot-from-2025-08-03-22-20-03.png)

New Car (/dashboard/new) - Rota protegida
![Web 4](https://i.ibb.co/27VXphLL/Screenshot-from-2025-08-03-22-20-07.png)

Entre outras páginas...

# Tecnologias utilizadas

## Back end

- Firebase (auth + car details)
- Supabase (image storage)

## Front end

- HTML / CSS / JS / TypeScript
- ReactJS
- React-router
- TailwindCSS
- React-hot-toast
- Swiper
- Uuid
- React-hook-form
- Zod

## Implantação em produção

- Back end: Firebase + Supabase
- Front end web: Vercel
- Banco de dados: Firestore

# Como executar o projeto

## Front end web

Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/SenhorOver/web-cars.git

# entrar na pasta do projeto front end web
cd web-cars

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run dev
```

# Autor

Marcos Vinicius Silva

https://www.linkedin.com/in/marcos-v-s/
