import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClassesPage } from '../../pages/classes';

export const ClassesRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClassesPage />} />
    </Routes>
  );
};