import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Modal, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RootState, closeManageStudentsModal, setManageStudentsModalPayload } from '../../redux';
import { StudentsCard } from './StudentsCard';
import { IStudent } from '../../interfaces';
import { useAssignStudentsMutation, useGetStudents } from '../../libs';
import { showErrorAlert, showSuccessAlert } from '../helpers';

interface IFormInput {
  student: number;
}

export const ManageStudentsModal: FC = () => {
  const dispatch = useDispatch();
  const payload = useSelector((state: RootState) => state.modal.manageStudentsModal.data);
  const isOpen = useSelector((state: RootState) => state.modal.manageStudentsModal.isOpen);

  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>();
  const { data: students } = useGetStudents();
  const { mutateAsync: assignStudents } = useAssignStudentsMutation();

  const [selectedStudent, setSelectedStudent] = useState<number | null>(null); // Estado para el valor seleccionado del estudiante

  const handleClose = () => dispatch(closeManageStudentsModal());

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const currentStudentsIds: number[] = payload?.students?.map((student: IStudent) => student.id) || [];
      const updatedStudentIds = Array.from(new Set([...currentStudentsIds, data.student]));
      const resp = await assignStudents({
        id: payload?.id,
        students: updatedStudentIds,
      });

      showSuccessAlert(dispatch);

      dispatch(setManageStudentsModalPayload({ ...payload, students: resp?.students }));
      setSelectedStudent(null);
    } catch (error) {
      showErrorAlert(dispatch);
    }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby=''
        aria-describedby=''
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFF',
            borderRadius: '10px',
            boxShadow: '1px 0px 10px #787775',
            height: 'auto',
            outline: 'none',
            width: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60px',
              width: '100%',
            }}
          >
            <Box
              component='div'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '90%',
                width: '96%',
              }}
            >
              <Typography
                sx={{
                  color: 'primary',
                  fontWeight: 'bold',
                }}
              >
                Administrar Estudiantes
              </Typography>

              <IconButton
                onClick={handleClose}
                sx={{
                  width: '30px',
                  height: '30px',
                  outline: 'none', 
                }}
              >
                <CloseIcon
                  sx={{
                    color: '#5C5E5C',
                    fontSize: '22px',
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <Grid container spacing={1}>
              {
                payload?.students?.length > 0
                  ? (
                    payload?.students?.map((student: IStudent) => (
                      <Grid item key={student.id}>
                        <StudentsCard student={student} />
                      </Grid>
                    ))
                  ) : (
                    <Typography sx={{ ml: 1 }}>Asigna estudiantes a la clase</Typography>
                  )
              }
            </Grid>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: '100%',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <FormControl
                    variant='outlined'
                    size='small'
                    fullWidth
                    error={!!errors.student}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#18191A',
                      },
                    }}
                  >
                    <InputLabel id='student-label'>Estudiante</InputLabel>
                    <Select
                      labelId='student-label'
                      id='student'
                      label='Estudiante'
                      {...register('student', { required: 'Selecciona un estudiante' })}
                      //* ESTOY LO ESTOY HACIENDO PARA QUE CUANDO YO HAGA EL ONSUBMIT, CUANDO AÑADA UN ESTUDIANTE, SE REINICIE
                      //* EL VALOR DEL INPUT
                      value={selectedStudent !== null && students?.students.find(student => student.id === selectedStudent) ? selectedStudent : ''}
                      onChange={(event) => setSelectedStudent(event.target.value as number)}
                    >
                      {students?.students?.map((student: IStudent) => (
                        <MenuItem key={student.id} value={student.id}>
                          {`${student.name} ${student.lastname}`}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.student && <Typography variant="caption" color="error">{errors.student.message}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant='contained'
                    type='submit'
                    fullWidth
                    sx={{
                      backgroundColor: 'primary',
                    }}
                  >
                    <Typography
                      fontSize={13}
                      fontWeight='bold'
                    >
                      {'ASIGNAR'}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
