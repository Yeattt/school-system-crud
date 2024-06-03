import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignStudents, createClass, createStudent, createTeacher, deleteClass, deleteStudent, deleteTeacher, getClasses, getOneClass, getOneStudent, getOneTeacher, getStudents, getStudentsByClass, getTeachers, updateClass, updateStudent, updateTeacher } from "../api";
import { INewClass, INewStudent, INewTeacher, IStudent, IUpdateClass, IUpdateStudent, IUpdateTeacher } from "../../interfaces";

//* REACT QUERY O TANSTACK QUERY ES UNA LIBRERÍA QUE NOS PERMITE HACER UN MEJOR MANEJO DE LOS ESTADOS
//* A LA HORA DE HACER MANEJO DE PETICIONES AL API, LO ESTOY USANDO POR SU FACILIDAD Y POR LAS VENTAJAS
//* QUE DA EN MUCHOS ASPECTOS, INCLUYENDO EL RENDIMIENTO

//* ---- ACCIONES PARA EL MÓDULO DE ESTUDIANTES ---- *//
export const useGetStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => getStudents(),
  });
};

export const useGetOneStudent = (id: number) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => getOneStudent(id),
  });
};

export const useCreateStudentMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: INewStudent) => createStudent(student),
    onSuccess: () => {
      //* ON SUCCESS NOS SIRVE PARA QUE CUANDO INSERTEMOS UNA MUTACIÓN, POR EJEMPLO, CUANDO CREEMOS UN DATO
      //* O ACTUALICEMOS UN DATO, LOS CAMBIOS SE VEAN REFLEJADOS AUTOMÁTICAMENTE SIN TENER QUE RECARGAR LA PÁGINA
      //* Y SIN NECESIDAD DE AGREGAR MÁS LÓGICA PARA QUE LOS CAMBIOS SE VEAN REFLEJADOS AL HACER LA PETICIÓN 

      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { id: number, student: IUpdateStudent }) => updateStudent(params.id, params.student),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  })
};

export const useDeleteStudentMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });
};

//* ---- ACCIONES PARA EL MÓDULO DE PROFESORES ---- *//
export const useGetTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: () => getTeachers(),
  });
};

export const useGetOneTeacher = (id: number) => {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: () => getOneTeacher(id),
  });
};

export const useCreateTeacherMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacher: INewTeacher) => createTeacher(teacher),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });
};

export const useUpdateTeacherMutation = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { id: number, teacher: IUpdateTeacher }) => updateTeacher(params.id, params.teacher),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  })
};

export const useDeleteTeacherMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });
};

//* ---- ACCIONES PARA EL MÓDULO DE CLASES ---- *//
export const useGetClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => getClasses(),
  });
};

export const useGetOneClass = (id: number) => {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: () => getOneClass(id),
  });
};

export const useCreateClassMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (Class: INewClass) => createClass(Class),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
    },
  });
};

export const useUpdateClassMutation = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { id: number, class: IUpdateClass }) => updateClass(params.id, params.class),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
    },
  })
};

export const useDeleteClassMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
    },
  });
};

export const useAssignStudentsMutation = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number, students: number[] }) => assignStudents(params.id, params.students),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
    },
  });
}

export const useGetStudentsByClass = (id: number) => {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: () => getStudentsByClass(id),
  });
};
