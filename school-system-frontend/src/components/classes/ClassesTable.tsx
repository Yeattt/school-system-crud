import { FC, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';

import { DataTable } from '../ui/DataTable';
import { openCreateModal } from '../../redux';
import { useGetClasses } from '../../libs';
import { IClass } from '../../interfaces';
import { ClassesFields, CreateClassesModal, ManageStudentsModal, UpdateClassesModal, ViewClassesModal } from '.';
import { Loader } from '../../components/ui';

interface IClassInfoToShow {
  id: number;
  idToShow: number;
  name: string;
  description: string;
  teacherId: number;
  teacherName: string;
};

export const ClassesTable: FC = () => {
  const dispatch = useDispatch();
  
  const [rowsClass, setRowsClass] = useState<IClassInfoToShow[]>([]);
  const { data: { classes } = {}, isPending } = useGetClasses();

  useEffect(() => {
    if (!classes) return;

    const newClasses: IClassInfoToShow[] = classes?.map((iclass: IClass, index: number) => {
      return {
        id: iclass.id,
        idToShow: +index + 1,
        name: iclass.name,
        description: iclass.description,
        teacherId: iclass.teacher.id,
        teacherName: iclass.teacher.name,
      };
    });

    setRowsClass(newClasses);
  }, [classes])

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
          {'CLASES'}
        </Typography>

        <Typography
          fontSize={15}
          fontWeight={400}
        >
          {'Administrar > Clases'}
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
              {'Clases'}
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

          <DataTable fields={ClassesFields} rows={rowsClass} />
        </Box>
      </div>

      {/* MODALS */}
      <CreateClassesModal />
      <UpdateClassesModal />
      <ViewClassesModal />
      <ManageStudentsModal />

      {/* ALERTS */}
      {/* <SuccessAlert message='Created successfully' /> */}
    </>
  );
}
