export interface ITeachersApiResp {
  totalPages: number;
  currentPage: number;
  teachers: ITeacher[];
};


export interface ITeacher {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

export interface INewTeacher {
  name: string;
  lastname: string;
  email: string;
};

export interface IUpdateTeacher {
  name?: string;
  lastname?: string;
  email?: string;
};
