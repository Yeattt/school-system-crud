import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { openManageStudentsModal, openUpdateModal, openViewModal } from '../../redux';

import { Button, Tooltip, Typography } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteClassMutation, useGetStudentsByClass } from '../../libs';
import { showErrorAlert, showSuccessAlert } from '../helpers';

interface CustomDataGridCellProps {
  row: GridCellParams;
}

const CustomDataGridCell: FC<CustomDataGridCellProps> = ({ row }) => {
  const dispatch = useDispatch();

  const handleView = () => {
    const payload = {
      id: row.row.id,
      data: {
        id: row.row.idToShow,
        name: row.row.name,
        description: row.row.description,
        teacherName: row.row.teacherName,
        state: row.row.state,
      }
    };

    dispatch(openViewModal(payload));
  };

  const handleEdit = () => {

    const payload = {
      id: row.row.id,
      data: {
        name: row.row.name,
        description: row.row.description,
        teacherName: row.row.teacherName,
        teacherId: row.row.teacherId,
      }
    };

    dispatch(openUpdateModal(payload));
  };

  const { mutateAsync: deleteClass } = useDeleteClassMutation();
  const handleDelete = async () => {
    try {
      await deleteClass(row.row.id);
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

const StudentsGridCell: FC<CustomDataGridCellProps> = ({ row }) => {
  const dispatch = useDispatch();
  const { data: students } = useGetStudentsByClass(row.row.id);

  const handleManageStudents = () => {
    const payload = {
      id: row.row.id,
      students,
    };

    dispatch(openManageStudentsModal(payload));
  };

  return (
    <div>
      <Tooltip title={'Administrar estudiantes'}>
        <Button
          variant='contained'
          onClick={() => handleManageStudents()}
          sx={{
            backgroundColor: 'primary',
          }}
        >
          <Typography
            fontSize={14}
            fontWeight={700}
          >
            {'ADM. ESTUDIANTES'}
          </Typography>

          {/* <QueueOutlinedIcon
            sx={{
              fontSize: '19px',
              marginLeft: '6px'
            }}
          /> */}
        </Button>
      </Tooltip>
    </div>
  );
};

export const ClassesFields: GridColDef[] = [
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
    field: 'description',
    headerName: 'Descripción',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'teacherName',
    headerName: 'Profesor',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
  },
  {
    field: 'students',
    headerName: 'Estudiantes Asignados',
    sortable: false,
    flex: 1,
    renderHeader: (params) => (
      <div style={{ fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
    renderCell: (params) => <StudentsGridCell row={params} />,
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
