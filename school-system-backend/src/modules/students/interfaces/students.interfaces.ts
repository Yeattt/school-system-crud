import { Student } from '../entities/student.entity';

export interface FindAllResult {
  students: Student[];
  totalPages: number;
  currentPage: number;
};