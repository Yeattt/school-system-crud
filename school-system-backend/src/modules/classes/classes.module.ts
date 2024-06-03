import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';
import { Class } from './entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    StudentsModule,
    TeachersModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [TypeOrmModule, ClassesService],
})
export class ClassesModule {}
