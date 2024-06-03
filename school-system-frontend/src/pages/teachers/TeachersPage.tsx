import { FC } from 'react';
import { MainLayout } from '../../components/';
import { TeachersTable } from '../../components/teachers';

export const TeachersPage: FC = () => {
  return (
    <MainLayout>
      <TeachersTable />
    </MainLayout>
  );
}