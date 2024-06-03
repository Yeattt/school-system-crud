import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { CreateTeacherDto, UpdateTeacherDto } from './dto';
import { PaginationDto } from '../../common';
import { FindAllResult } from './interfaces';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  private readonly logger: Logger = new Logger('Teachers-Service');
  
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  //* ---- CREAR UN PROFESOR ---- *//
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher: Teacher = plainToClass(Teacher, createTeacherDto);

    try {
      await this.teacherRepository.save(newTeacher);
    } catch (error) {
      console.log(error.code);

      //* CON ESTA VALIDACIÓN PODEMOS VALIDAR FÁCILMENTE SI EL CORREO YA ESTÁ EN USO
      //* VALIDANDO SI EL CÓDIGO DEL ERROR CORRESPONDE AL CÓDIGO DE LLAVE DUPLICADA
      if (error.code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Email already in use`);

      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    return newTeacher;
  }

  //* ---- LISTAR TODOS LOS PROFESORES (SOLAMENTE LISTA LOS PROFESORES ACTIVOS, NO LOS ELIMINADOS O INACTIVOS) ---- *//
  async findAll(paginationDto: PaginationDto): Promise<FindAllResult> {
    const { page, limit } = paginationDto;

    const totalPages: number = await this.teacherRepository.count({
      where: {
        isActive: true,
      },
    });

    const teachers: Teacher[] = await this.teacherRepository.find({
      where: {
        isActive: true,
      },
      // skip: (page - 1) * limit,
      // take: limit,
    });

    return {
      teachers,
      totalPages,
      currentPage: page,
    };
  }

  //* ---- ENCONTRAR UN PROFESOR ---- *//
  async findOne(id: number): Promise<Teacher> {
    const teacher: Teacher = await this.teacherRepository.findOne({
      where: {
        id,
      },
    });

    if (!teacher)
      throw new NotFoundException(`Teacher with id ${id} not found`);

    return teacher;
  }

  //* ---- ACTUALIZAR UN PROFESOR ---- *//
  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const teacher: Teacher = await this.findOne(id);

    const updatedTeacher: Teacher = plainToClass(Teacher, updateTeacherDto);

    Object.assign(teacher, updatedTeacher);

    await this.teacherRepository.save(teacher);

    return teacher;
  }

  //* ---- ELIMINAR UN PROFESOR ---- *//
  async remove(id: number): Promise<Teacher> {
    const teacher: Teacher = await this.findOne(id);

    await this.teacherRepository.remove(teacher);

    return teacher;
  }
}
