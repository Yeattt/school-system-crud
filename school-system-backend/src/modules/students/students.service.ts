import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { PaginationDto } from '../../common';
import { FindAllResult } from './interfaces';

@Injectable()
export class StudentsService {
  private readonly logger: Logger = new Logger('Students-Service')

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  //* ---- CREAR UN ESTUDIANTE ---- *//
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent: Student = plainToClass(Student, createStudentDto);

    try {
      await this.studentRepository.save(newStudent);
    } catch (error) {
      console.log(error.code);

      //* CON ESTA VALIDACIÓN PODEMOS VALIDAR FÁCILMENTE SI EL CORREO YA ESTÁ EN USO
      //* VALIDANDO SI EL CÓDIGO DEL ERROR CORRESPONDE AL CÓDIGO DE LLAVE DUPLICADA
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Email already in use`);

      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    return newStudent;
  }

  //* ---- LISTAR TODOS LOS ESTUDIANTES (SOLAMENTE LISTA LOS ESTUDIANTES ACTIVOS, NO LOS ELIMINADOS O INACTIVOS) ---- *//
  async findAll(paginationDto: PaginationDto): Promise<FindAllResult> {
    const { page, limit } = paginationDto;

    const totalPages: number = await this.studentRepository.count({
      where: {
        isActive: true,
      },
    });

    const students: Student[] = await this.studentRepository.find({
      where: {
        isActive: true,
      },
      // skip: (page - 1) * limit,
      // take: limit,
    });

    return {
      students,
      totalPages,
      currentPage: page,
    };
  }

  //* ---- ENCONTRAR UN ESTUDIANTE ---- *//
  async findOne(id: number): Promise<Student> {
    const student: Student = await this.studentRepository.findOne({
      where: {
        id,
      },
    });

    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);

    return student;
  }

  //* ---- ACTUALIZAR UN ESTUDIANTE ---- *//
  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student: Student = await this.findOne(id);

    const updatedStudent: Student = plainToClass(Student, updateStudentDto);

    Object.assign(student, updatedStudent);

    try {
      await this.studentRepository.save(student);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Email already in use`);

      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    return student;
  }

  //* ---- ELIMINAR UN ESTUDIANTE ---- *//
  async remove(id: number) {
    const student: Student = await this.findOne(id);

    await this.studentRepository.remove(student);

    return student;
  }
}
