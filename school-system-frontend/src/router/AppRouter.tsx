import { FC } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { StudentsRoutes } from './students';
import { TeachersRoutes } from './teachers';
import { ClassesRoutes } from './classes';

//* EN ESTE ARCHIVO ESTOY HACIENDO LA CONFIGURACIÓN DE LAS RUTAS DE LA APLICACIÓN
export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/students/*" element={<StudentsRoutes />} />
      <Route path="/teachers/*" element={<TeachersRoutes />} />
      <Route path="/classes/*" element={<ClassesRoutes />} />

      //* ACÁ ESTOY CONFIGURANDO MI RUTA POR DEFECTO, CUALQUIER RUTA QUE NO ESTÉ ESPECIFICADA, ME REENVIARÁ A STUDENTS
      <Route path="/*" element={<Navigate to="/students/" replace />} />
    </Routes>
  );
};