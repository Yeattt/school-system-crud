import { FC, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import { DataTable } from '../ui/DataTable';

import { openCreateModal } from '../../redux';
import { useDispatch } from 'react-redux';
import { useGetStudents } from '../../libs';

import { IStudent } from '../../interfaces';
import { StudentsFields, CreateStudentsModal, UpdateStudentsModal, ViewStudentsModal } from '.';
import { Loader } from '../../components/ui';

interface IStudentInfoToShow {
  id: number;
  idToShow: number;
  name: string;
  lastname: string;
  email: string;
};

export const StudentsTable: FC = () => {
  const dispatch = useDispatch();

  const [rowsStudent, setRowsStudent] = useState<IStudentInfoToShow[]>([]);
  const { data: { students } = {}, isPending } = useGetStudents();

  useEffect(() => {
    if (!students) return;

    const newStudents: IStudentInfoToShow[] = students?.map((student: IStudent, index: number) => {
      return {
        id: student.id,
        idToShow: index + 1,
        name: student.name,
        lastname: student.lastname,
        email: student.email,
      };
    });

    setRowsStudent(newStudents);
  }, [students])

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
          {'ESTUDIANTES'}
        </Typography>

        <Typography
          fontSize={15}
          fontWeight={400}
        >
          {'Administrar > Estudiantes'}
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
              {'Estudiantes'}
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

          <DataTable fields={StudentsFields} rows={rowsStudent} />
        </Box>
      </div>

      {/* MODALS */}
      <CreateStudentsModal />
      <UpdateStudentsModal />
      <ViewStudentsModal />

      {/* ALERTS */}
      {/* <SuccessAlert message='Created successfully' /> */}
    </>
  );
}