import { ITeacher } from './teachers.interfaces';

export interface IClassesApiResp {
  totalPages: number;
  currentPage: number;
  classes: IClass[];
};

export interface IClass {
  id: number;
  name: string;
  description: string;
  teacherId: number;
  teacher: ITeacher;
  students: number[];
};

export interface INewClass {
  name: string;
  description: string;
  teacher: number;
  students: number[];
};

export interface IUpdateClass {
  name?: string;
  description?: string;
  teacher?: number;
  students?: number[];
};
