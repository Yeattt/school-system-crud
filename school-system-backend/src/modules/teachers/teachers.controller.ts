import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto';
import { PaginationDto } from '../../common';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Post()
  create(
    @Body() createTeacherDto: CreateTeacherDto,
  ) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.teachersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
  ) {
    return this.teachersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: number,
  ) {
    return this.teachersService.remove(+id);
  }
}
