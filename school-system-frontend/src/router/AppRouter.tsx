import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { StudentsRoutes } from './students';
import { TeachersRoutes } from './teachers';
import { ClassesRoutes } from './classes';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/students/*" element={<StudentsRoutes />} />
      <Route path="/teachers/*" element={<TeachersRoutes />} />
      <Route path="/classes/*" element={<ClassesRoutes />} />
    </Routes>
  );
};