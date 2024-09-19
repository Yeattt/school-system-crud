# 🏫 - School System Backend

School System Backend es un sistema que permite el manejo de los datos para un colegio, donde principalmente se hace la administración de profesores, clases y estudiantes.

Para simplificar el proceso de asignación de profesores a clases, implementé la opción de asignar un profesor directamente al crear una clase,
si no se desea asignar un profesor durante la creación, también se puede asignarlo mediante una actualización de la clase, donde se puede seleccionar al profesor.

En cuanto a la gestión de estudiantes dentro de una clase, desarrollé un modal exclusivamente dedicado a esta función.
Aquí se muestran los estudiantes asignados a la clase, dándonos también la opción de agregar o remover estudiantes.

## 🔱 - Información sobre el Backend y pasos para ejecutarlo
### Tech Stack
- NestJS como framework para el backend
- TypeORM como ORM para administrar la base de datos
- Joi para la validación de las variables de entorno
- Docker
- MySQL

### Ejecutar el proyecto
Para correr el projecto, hacer lo siguiente:

1. Instalar las dependencias de node ```npm i```
2. Ejecutar docker para levantar la base de datos ```docker compose up -d```
3. Reemplazar el nombre del archivo de .env.template por .env
4. Ejecutar el siguiente comando para correr el proyecto ```npm run start:dev```
5. La url es <strong>localhost:3000/api/</strong>

## 👨🏻‍💻 - Información sobre el Frontend y pasos para ejecutarlo
### Tech Stack
- React como librería de Frontend
- React Router Dom
- React Query o TanStack Query para manejar el estado de las peticiones
- React Hook Form para el manejo de los formularios
- Axios para realizar las peticiones al API
- MaterialUI como librería para los componentes de la vista
- Redux Toolkit como manejador de estado global

### Ejecutar el proyecto
Para correr el proyecto, hacer lo siguiente:

1. Instalar las dependencias de node ```npm i```
2. Renombrar el archivo .env.template por .env
3. Ejecutar el proyecto ```npm run dev```
