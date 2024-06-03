import 'dotenv/config';
import * as joi from 'joi';

//* En este archivo, se hace la validación de todas las variables de entorno que hay en el sistema
//* Si alguna variable no está escrita o no cumple con alguna validación de la que haya acá en el
//* Archivo .env, entonces nos va a salir un error especificando lo que falta o lo que está mal
//* Y la aplicación no se va a ejecutar

interface EnvVars {
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

//* ---- AGREGAMOS VALIDACIONES A LAS VARIABLES DE ENTORNO DEFINIDAS EN LA APLICACIÓN ---- *//
const envsSchema = joi.object({
  PORT: joi.number().required(),

  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
})
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

//* ---- SI HAY UN ERROR, SE RETORNARÁ EL SIGUIENTE MENSAJE Y NO SE CONTINUARÁ CON LA EJECUCIÓN DE LA APLICACIÓN ---- *//
if (error) {
  throw new Error(`Config validation error: ${error}`);
};

const envVars: EnvVars = value;

//* ---- EXPORTAMOS LAS VARIABLES DE ENTORNO PARA USARLAS ---- *//
export const envs = {
  port: envVars.PORT,
  dbPort: envVars.DB_PORT,
  dbHost: envVars.DB_HOST,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
};
