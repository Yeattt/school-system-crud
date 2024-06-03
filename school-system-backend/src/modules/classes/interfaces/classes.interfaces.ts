import { Class } from '../entities/class.entity';

export interface FindAllResult {
  classes: Class[];
  totalPages: number;
  currentPage: number;
};