import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { AssignClassDto, CreateClassDto, UpdateClassDto } from './dto/';
import { Class } from './entities/class.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { PaginationDto } from '../../common';
import { FindAllResult } from './interfaces';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  //* ---- CREAR UNA CLASE ---- *//
  async create(createClassDto: CreateClassDto): Promise<Class> {
    const newClass: Class = plainToClass(Class, createClassDto);

    if (createClassDto.teacher) {
      const teacherId: number = createClassDto.teacher;

      const teacher: Teacher = await this.teacherRepository.findOne({
        where: {
          id: teacherId,
        },
      });

      if (!teacher)
        throw new NotFoundException(`Teacher with id ${teacherId} not found`);

      if (!teacher.isActive)
        throw new BadRequestException(`Teacher with id ${teacherId} is currently inactive`);

      newClass.teacher = teacher;
    };

    if (createClassDto.students) {
      const studentsId: number[] = createClassDto.students;
      const students: Student[] = [];

      for (const studentId of studentsId) {
        const student: Student = await this.studentRepository.findOne({
          where: {
            id: studentId,
          },
        });

        if (!student)
          throw new NotFoundException(`Student with id ${studentId} not found`);

        if (!student.isActive)
          throw new BadRequestException(`Student with id ${studentId} is currently inactive`);

        students.push(student);
      };

      newClass.students = students;
    };

    await this.classRepository.save(newClass);

    return newClass;
  };

  //* ---- LISTAR TODAS LAS CLASES (SOLAMENTE LISTA LAS ACTIVAS, NO LAS ELIMINADAS O INACTIVAS) ---- *//
  async findAll(paginationDto: PaginationDto): Promise<FindAllResult> {
    const { page, limit } = paginationDto;

    const totalPages: number = await this.classRepository.count({
      where: {
        isActive: true,
      },
    });

    const classes: Class[] = await this.classRepository.find({
      where: {
        isActive: true,
      },
      relations: [
        'teacher',
        'students',
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      classes,
      totalPages,
      currentPage: page,
    };
  }

  //* ---- ENCONTRAR UNA CLASE ---- *//
  async findOne(id: number): Promise<Class> {
    const classDb: Class = await this.classRepository.findOne({
      where: {
        id,
      },
      relations: [
        'teacher',
        'students',
      ],
    });

    if (!classDb)
      throw new NotFoundException(`Class with id ${id} not found`);

    return classDb;
  }

  //* ---- ACTUALIZAR UNA CLASE ---- *//
  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const classDb: Class = await this.findOne(id);

    const updatedClass: Class = plainToClass(Class, updateClassDto);

    if (updateClassDto.teacher) {
      const teacherId: number = updateClassDto.teacher;

      const teacher: Teacher = await this.teacherRepository.findOne({
        where: {
          id: teacherId,
        },
      });

      if (!teacher)
        throw new NotFoundException(`Teacher with id ${teacherId} not found`);

      if (!teacher.isActive)
        throw new BadRequestException(`Teacher with id ${teacherId} is currently inactive`);

      updatedClass.teacher = teacher;
    };

    if (updateClassDto.students) {
      const studentsId: number[] = updateClassDto.students;
      const students: Student[] = [];

      for (const studentId of studentsId) {
        const student: Student = await this.studentRepository.findOne({
          where: {
            id: studentId,
          },
        });

        if (!student)
          throw new NotFoundException(`Student with id ${studentId} not found`);

        if (!student.isActive)
          throw new BadRequestException(`Student with id ${studentId} is currently inactive`);

        students.push(student);
      };

      updatedClass.students = students;
    };

    //* Acá se está haciendo la asignación de los nuevos datos para la clase que escribimos en el dto, asignandoselos
    //* A la clase que vamos a actualizar, a la clase que buscamos con su id en la base de datos, esto para evitar
    //* Asignar uno por uno los campos, de esta forma, asignamos todo lo que se haya actualizado de una vez
    Object.assign(classDb, updatedClass);

    const updatedClassDb: Class = await this.classRepository.save(classDb);

    return updatedClassDb;
  }

  //* ---- ELIMINAR UNA CLASE ---- *//
  async remove(id: number): Promise<Class> {
    const classDb: Class = await this.findOne(id);

    await this.classRepository.remove(classDb);

    return classDb;
  }

  //* ---- ASIGNAR PROFESORES A UNA CLASE ---- *//
  async assignTeacherToClass(id: number, assignClassDto: AssignClassDto) {
    const classDb: Class = await this.findOne(id);

    if (assignClassDto.teacherId) {
      const teacherId: number = assignClassDto.teacherId;

      const teacher: Teacher = await this.teacherRepository.findOne({
        where: {
          id: teacherId,
          isActive: true,
        },
      });

      if (!teacher)
        throw new NotFoundException(`Teacher with id ${id} not found`);

      classDb.teacher = teacher;
    };

    const savedClass: Class = await this.classRepository.save(classDb);

    return savedClass;
  }

  //* ----- ASIGNAR ESTUDIANTES A UNA CLASE ---- *//
  async assignStudentsToClass(id: number, assignClassDto: AssignClassDto) {
    const classDb: Class = await this.findOne(id);

    if (assignClassDto.studentIds) {
      const students: Student[] = [];
      const studentIds: number[] = assignClassDto.studentIds;

      for (const studentId of studentIds) {
        const student: Student = await this.studentRepository.findOne({
          where: {
            id: studentId,
            isActive: true,
          },
        });

        if (!student)
          throw new NotFoundException(`Student with id ${id} not found`);

        students.push(student);
      };

      classDb.students = students;
    };

    const savedClass: Class = await this.classRepository.save(classDb);

    return savedClass;
  }

  //* ---- OBTENER ESTUDIANTES ASIGNADOS A UNA CLASE ---- *//
  async getStudentsByClass(id: number): Promise<Student[]> {
    const studentsByClass: Student[] = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.classes', 'classes')
      .where('classes.id =:id', { id })
      .getMany();

    return studentsByClass;
  }
}
