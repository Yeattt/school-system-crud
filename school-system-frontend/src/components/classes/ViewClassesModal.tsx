import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

import { ViewModal } from '../ui';

export const ViewClassesModal: FC = () => {
  const payload = useSelector((state: RootState) => state.modal.viewModal.data);

  return (
    <ViewModal title={'Ver Clase'}>
      <p>{'Nombre'}: {payload?.data?.name}</p>
      <p>{'Descripción'}: {payload?.data?.description}</p>
      <p>{'Profesor'}: {payload?.data?.teacherName}</p>
    </ViewModal>
  );
}