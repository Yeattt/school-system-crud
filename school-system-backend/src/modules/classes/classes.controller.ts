import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';

import { ClassesService } from './classes.service';
import { AssignClassDto, CreateClassDto, UpdateClassDto } from './dto/';
import { PaginationDto } from '../../common';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Post()
  create(
    @Body() createClassDto: CreateClassDto
  ) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.classesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
  ) {
    return this.classesService.findOne(+id);
  }

  @Get(':id/students')
  getStudentsByClass(
    @Param('id') id: number,
  ) {
    return this.classesService.getStudentsByClass(+id);
  }

  @Post(':id/assign-teacher')
  assignTeacher(
    @Param('id') id: number,
    @Body() assignClassDto: AssignClassDto,    
  ) {
    return this.classesService.assignTeacherToClass(+id, assignClassDto);
  }

  @Post(':id/assign-students')
  assignStudents(
    @Param('id') id: number,
    @Body() assignClassDto: AssignClassDto,    
  ) {
    return this.classesService.assignStudentsToClass(+id, assignClassDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: number,
  ) {
    return this.classesService.remove(+id);
  }
}
