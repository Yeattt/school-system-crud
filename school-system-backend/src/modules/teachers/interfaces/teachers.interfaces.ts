import { Teacher } from '../entities/teacher.entity';

export interface FindAllResult {
  teachers: Teacher[];
  totalPages: number;
  currentPage: number;
};