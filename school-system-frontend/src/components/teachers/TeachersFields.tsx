import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { openUpdateModal, openViewModal } from '../../redux';

import { Tooltip } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { useDeleteTeacherMutation } from '../../libs';
import { showErrorAlert, showSuccessAlert } from '../helpers';

interface CustomDataGridCellProps {
  row: GridCellParams;
}

const CustomDataGridCell: FC<CustomDataGridCellProps> = ({ row }) => {
  const dispatch = useDispatch();
  const { mutateAsync: deleteTeacher } = useDeleteTeacherMutation();

  const handleView = () => {
    const payload = {
      id: row.row.id,
      data: {
        id: row.row.idToShow,
        name: row.row.name,
        lastname: row.row.lastname,
        email: row.row.email,
      }
    };

    dispatch(openViewModal(payload));
  };

  const handleEdit = () => {
    const payload = {
      id: row.row.id,
      data: {
        name: row.row.name,
        lastname: row.row.lastname,
        email: row.row.email,
      }
    };

    dispatch(openUpdateModal(payload));
  };

  const handleDelete = async () => {
    try {
      await deleteTeacher(row.row.id);
      showSuccessAlert(dispatch);
    } catch (error) {
      showErrorAlert(dispatch);
      console.log('Error deleting the teacher', error);
    }
  };

  return (
    <div>
      <Tooltip title={'Ver'}>
        <IconButton onClick={handleView}>
          <RemoveRedEyeIcon
            sx={{ color: '#565657' }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title={'Editar'}>
        <IconButton onClick={handleEdit}>
          <EditIcon
            sx={{ color: '#565657' }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title={'Eliminar'}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon
            sx={{ color: '#565657' }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const TeachersFields: GridColDef[] = [
  {
    field: 'idToShow',
    headerName: 'ID',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Nombre',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'lastname',
    headerName: 'Apellido',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {params.colDef.headerName}
      </div>
    ),
    renderCell: (params) => <CustomDataGridCell row={params} />
  },
];
