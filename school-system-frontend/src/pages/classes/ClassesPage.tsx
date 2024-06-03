import { FC } from 'react';
import { MainLayout } from '../../components/';
import { ClassesTable } from '../../components/classes';

export const ClassesPage: FC = () => {
  return (
    <MainLayout>
      <ClassesTable />
    </MainLayout>
  );
}