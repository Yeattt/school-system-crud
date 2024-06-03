import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { StudentsPage } from '../../pages';

export const StudentsRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentsPage />} />
    </Routes>
  );
};