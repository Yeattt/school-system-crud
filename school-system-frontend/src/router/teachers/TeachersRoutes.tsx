import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TeachersPage } from '../../pages/teachers';

export const TeachersRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TeachersPage />} />
    </Routes>
  );
};