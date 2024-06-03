import { INewTeacher, ITeacher, ITeachersApiResp, IUpdateTeacher } from '../../interfaces';
import schoolSystemApi from './school-system.api';

export const getTeachers = async (): Promise<ITeachersApiResp> => {
  const { data } = await schoolSystemApi.get(`teachers`);

  return data;
};

export const getOneTeacher = async (id: number): Promise<ITeacher> => {
  const { data } = await schoolSystemApi.get(`teachers/${id}`);

  return data;
};

export const createTeacher = async (teacherData: INewTeacher): Promise<ITeacher> => {
  const { data } = await schoolSystemApi.post(`teachers`, teacherData);

  return data;
};

export const updateTeacher = async (id: number, teacherData: IUpdateTeacher): Promise<ITeacher> => {
  const { data } = await schoolSystemApi.put(`teachers/${id}`, teacherData);

  return data;
};

export const deleteTeacher = async (id: number): Promise<ITeacher> => {
  const { data } = await schoolSystemApi.delete(`teachers/${id}`);

  return data;
};
