<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 🏫 - School System Backend
Repositorio del API para la prueba técnica.

School System Backend es un sistema que permite el manejo de los datos para un colegio, donde principalmente se hace la administración de profesores, clases y estudiantes.

## Tech Stack
- NestJS como framework para el backend
- TypeORM como ORM para administrar la base de datos
- Joi para la validación de las variables de entorno
- Docker
- MySQL

## Ejecutar el proyecto
Para correr el projecto, hacer lo siguiente:

1. Instalar las dependencias de node ```npm i```
2. Ejecutar docker para levantar la base de datos ```docker compose up -d```
3. Reemplazar el nombre del archivo de .env.template por .env
4. Ejecutar el siguiente comando para correr el proyecto ```npm run start:dev```
5. La url es <strong>localhost:3000/api/</strong>