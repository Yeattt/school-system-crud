import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';

import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { PaginationDto } from '../../common';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.studentsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
  ) {
    return this.studentsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: number,
  ) {
    return this.studentsService.remove(+id);
  }
}
