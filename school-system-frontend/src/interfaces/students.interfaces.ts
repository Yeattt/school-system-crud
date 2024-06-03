export interface IStudentsApiResp {
  totalPages: number;
  currentPage: number;
  students: IStudent[];
};

export interface IStudent {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

export interface INewStudent {
  name: string;
  lastname: string;
  email: string;
};

export interface IUpdateStudent {
  name?: string;
  lastname?: string;
  email?: string;
};
