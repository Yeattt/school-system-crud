import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

import { ViewModal } from '../ui';

export const ViewStudentsModal: FC = () => {
  const payload = useSelector((state: RootState) => state.modal.viewModal.data);

  return (
    <ViewModal title={'Ver Estudiante'}>
      <p>{'Nombre'}: {payload?.data?.name}</p>
      <p>{'Apellido'}: {payload?.data?.lastname}</p>
      <p>{'Correo'}: {payload?.data?.email}</p>
    </ViewModal>
  );
}