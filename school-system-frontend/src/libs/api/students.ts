import { INewStudent, IStudent, IStudentsApiResp, IUpdateStudent } from '../../interfaces';
import schoolSystemApi from './school-system.api';

export const getStudents = async (): Promise<IStudentsApiResp> => {
  const { data } = await schoolSystemApi.get(`students`);

  return data;
};

export const getOneStudent = async (id: number): Promise<IStudent> => {
  const { data } = await schoolSystemApi.get(`students/${id}`);

  return data;
};

export const createStudent = async (studentData: INewStudent): Promise<IStudent> => {
  const { data } = await schoolSystemApi.post(`students`, studentData);

  return data;
};

export const updateStudent = async (id: number, studentData: IUpdateStudent): Promise<IStudent> => {
  const { data } = await schoolSystemApi.put(`students/${id}`, studentData);

  return data;
};

export const deleteStudent = async (id: number): Promise<IStudent> => {
  const { data } = await schoolSystemApi.delete(`students/${id}`);

  return data;
};
