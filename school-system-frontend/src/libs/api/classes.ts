import { INewClass, IClass, IUpdateClass, IStudent, IClassesApiResp } from '../../interfaces';
import schoolSystemApi from './school-system.api';

export const getClasses = async (): Promise<IClassesApiResp> => {
  const { data } = await schoolSystemApi.get(`classes`);

  return data;
};

export const getOneClass = async (id: number): Promise<IClass> => {
  const { data } = await schoolSystemApi.get(`classes/${id}`);

  return data;
};

export const createClass = async (classData: INewClass): Promise<IClass> => {
  let classDataToSend: INewClass = classData;
  
  if (classData.teacher?.toString().trim() == '' || classData.teacher == undefined || classData.teacher == null) {
    classDataToSend = {
      name: classData.name,
      description: classData.description,
    };
  };

  const { data } = await schoolSystemApi.post(`classes`, classDataToSend);

  return data;
};

export const updateClass = async (id: number, classData: IUpdateClass): Promise<IClass> => {
  const { data } = await schoolSystemApi.put(`classes/${id}`, classData);

  return data;
};

export const deleteClass = async (id: number): Promise<IClass> => {
  const { data } = await schoolSystemApi.delete(`classes/${id}`);

  return data;
};

export const assignStudents = async (id: number, students: number[]): Promise<IClass> => {
  const { data } = await schoolSystemApi.post(`classes/${id}/assign-students`, {
    studentIds: students,
  });

  return data;
};

export const assignTeacher = async (id: number, teacher: number): Promise<IClass> => {
  const { data } = await schoolSystemApi.post(`classes/${id}/assign-teacher`, teacher);

  return data;
};

export const getStudentsByClass = async (id: number): Promise<IStudent[]> => {
  const { data } = await schoolSystemApi.get(`classes/${id}/students`);

  return data;
};
