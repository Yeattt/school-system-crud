import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersModule } from './modules/teachers/teachers.module';
import { StudentsModule } from './modules/students/students.module';
import { ClassesModule } from './modules/classes/classes.module';
import { envs } from './config';

@Module({
  imports: [
    //* ---- CONEXIÓN A LA BASE DE DATOS ---- *//
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPassword,
      database: envs.dbName,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TeachersModule, 
    StudentsModule, 
    ClassesModule,
  ],
})
export class AppModule {}
