import { FC } from 'react';
import { MainLayout } from '../../components/';
import { StudentsTable } from '../../components/students';

export const StudentsPage: FC = () => {
  return (
    <MainLayout>
      <StudentsTable />
    </MainLayout>
  );
}