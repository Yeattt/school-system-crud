import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { closeCreateModal } from '../../redux';
import { useCreateClassMutation, useGetTeachers } from '../../libs';

import { Box, Button, CircularProgress, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CreateModal } from '../ui';

import { INewClass, ITeacher } from '../../interfaces';
import { showErrorAlert, showSuccessAlert } from '../helpers';

export const CreateClassesModal: FC = () => {
  const { mutateAsync: createNewClass } = useCreateClassMutation();
  const { data: teachers, isLoading: isLoadingTeachers } = useGetTeachers();

  const dispatch = useDispatch();

  const { handleSubmit, register, formState: { errors }, trigger } = useForm<INewClass>();

  const onSubmit: SubmitHandler<INewClass> = async (data) => {
    try {
      await createNewClass(data);
      dispatch(closeCreateModal());
      showSuccessAlert(dispatch);
    } catch (error) {
      showErrorAlert(dispatch);
      console.log('Error creating class', error);
    }
  };

  return (
    <CreateModal title={'Nueva Clase'}>
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            borderBottom: '2px solid #E0E0E0',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '35px',
            height: '100%',
            width: '100%',
            marginBottom: 2,
            paddingBottom: 3.5,
          }}
        >
          <TextField
            id='name'
            label={'Nombre'}
            variant='outlined'
            size='small'
            {...register('name', {
              required: 'El nombre es requerido',
              onBlur: () => trigger('name')
            })}
            error={!!errors.name}
            helperText={errors.name ? errors?.name?.message : ''}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary',
                },
              },
              '& label.Mui-focused': {
                color: '#18191A',
              },
            }}
          />

          <TextField
            id='description'
            label={'Descripción'}
            variant='outlined'
            size='small'
            {...register('description', {
              required: 'La descripción es requerida',
              onBlur: () => trigger('description')
            })}
            error={!!errors.description}
            helperText={errors.description ? errors?.description?.message : ''}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary',
                },
              },
              '& label.Mui-focused': {
                color: '#18191A',
              },
            }}
          />

          <FormControl
            variant='outlined'
            size='small'
            error={!!errors.teacher}
            sx={{
              width: '100%',
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
            <InputLabel id='teacher-label'>Profesor</InputLabel>
            <Select
              labelId='teacher-label'
              id='teacher'
              label='Profesor'
              {...register('teacher')}
              defaultValue=''
            >
              {isLoadingTeachers ? (
                <MenuItem value="">
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                teachers?.teachers?.map((teacher: ITeacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))
              )}
            </Select>
            {errors.teacher && <Typography variant="caption" color="error">{errors.teacher.message}</Typography>}
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Button
            variant='contained'
            type='submit'
            sx={{
              backgroundColor: 'primary',
              padding: '6px 5px',
              width: '15%',
            }}
          >
            <Typography fontSize={13} fontWeight='bold'>{'Crear'}</Typography>
          </Button>
        </Box>
      </form>
    </CreateModal>
  );
};
