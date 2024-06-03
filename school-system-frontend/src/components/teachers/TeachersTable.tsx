import { FC, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import { DataTable } from '../ui/DataTable';

import { openCreateModal } from '../../redux';
import { useDispatch } from 'react-redux';
import { useGetTeachers } from '../../libs';

import { ITeacher } from '../../interfaces';
import { TeachersFields, CreateTeachersModal, UpdateTeachersModal, ViewTeachersModal } from '.';
import { Loader } from '../../components/ui';

interface ITeacherInfoToShow {
  id: number;
  idToShow: number;
  name: string;
  lastname: string;
  email: string;
};

export const TeachersTable: FC = () => {
  const dispatch = useDispatch();

  const [rowsTeacher, setRowsTeacher] = useState<ITeacherInfoToShow[]>([]);
  const { data: { teachers } = {}, isPending } = useGetTeachers();

  useEffect(() => {
    if (!teachers) return;

    const newTeachers: ITeacherInfoToShow[] = teachers?.map((teacher: ITeacher, index: number) => {
      return {
        id: teacher.id,
        idToShow: index + 1,
        name: teacher.name,
        lastname: teacher.lastname,
        email: teacher.email,
      };
    });

    setRowsTeacher(newTeachers);
  }, [teachers])

  if (isPending) return <Loader />

  return (
    <>
      <Box
        sx={{
          alignSelf: 'flex-start',
          mt: 2,
          mb: 18
        }}
      >
        <Typography
          fontSize={20}
          fontWeight={500}
        >
          {'PROFESORES'}
        </Typography>

        <Typography
          fontSize={15}
          fontWeight={400}
        >
          {'Administrar > Profesores'}
        </Typography>
      </Box>

      <div style={{ height: '40%', width: '98%' }}>
        <Box
          sx={{
            backgroundColor: '#FFFF',
            borderRadius: '10px',
            border: '1px solid #FFFF',
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={1}
          >
            <Typography
              fontWeight='bold'
            >
              {'Profesores'}
            </Typography>

            <Button
              variant='contained'
              onClick={() => dispatch(openCreateModal())}
              sx={{
                backgroundColor: 'primary',
              }}
            >
              <Typography
                fontSize={14}
                fontWeight={700}
              >
                {'AGREGAR'}
              </Typography>

              <QueueOutlinedIcon
                sx={{
                  fontSize: '19px',
                  marginLeft: '6px'
                }}
              />
            </Button>
          </Box>

          <DataTable fields={TeachersFields} rows={rowsTeacher} />
        </Box>
      </div>

      {/* MODALS */}
      <CreateTeachersModal />
      <UpdateTeachersModal />
      <ViewTeachersModal />

      {/* ALERTS */}
      {/* <SuccessAlert message='Created successfully' /> */}
    </>
  );
}
