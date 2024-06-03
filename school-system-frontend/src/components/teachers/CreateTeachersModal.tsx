import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { closeCreateModal } from '../../redux';
import { useCreateTeacherMutation } from '../../libs';

import { Box, Button, TextField, Typography } from '@mui/material';
import { CreateModal } from '../ui';

import { INewTeacher } from '../../interfaces';
import { showErrorAlert, showSuccessAlert } from '../helpers';

export const CreateTeachersModal: FC = () => {
  const { mutateAsync: createNewTeacher } = useCreateTeacherMutation();
  const dispatch = useDispatch();

  const { handleSubmit, register, formState: { errors }, setError, trigger } = useForm<INewTeacher>();

  const onSubmit: SubmitHandler<INewTeacher> = async (data) => {
    try {
      await createNewTeacher(data);
      dispatch(closeCreateModal());
      showSuccessAlert(dispatch);
    } catch (error: any) {
      showErrorAlert(dispatch);
      console.log('Error creating teacher', error);

      if (error.response?.data?.message?.toLowerCase() === 'email already in use') {
        setError('email', { type: 'manual', message: 'El correo ya se encuentra en uso' });
      }
    }
  }

  return (
    <CreateModal title={'Nuevo Profesor'}>
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%', width: '100%' }}
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
            label='Nombre'
            variant='outlined'
            size='small'
            {...register('name', {
              required: 'El nombre es requerido',
              onBlur: () => trigger('name')
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary',
                },
              },
              '& label.Mui-focused': { color: '#18191A' },
            }}
          />

          <TextField
            id='lastname'
            label='Apellido'
            variant='outlined'
            size='small'
            {...register('lastname', {
              required: 'El apellido es requerido',
              onBlur: () => trigger('lastname')
            })}
            error={!!errors.lastname}
            helperText={errors.lastname ? errors.lastname.message : ''}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary',
                },
              },
              '& label.Mui-focused': { color: '#18191A' },
            }}
          />

          <TextField
            id='email'
            label='Correo'
            variant='outlined'
            size='small'
            {...register('email', {
              required: 'El correo es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Correo no válido',
              },
              onBlur: () => trigger('email')
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary',
                },
              },
              '& label.Mui-focused': { color: '#18191A' },
            }}
          />
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
            <Typography
              fontSize={13}
              fontWeight='bold'
            >
              {'Crear'}
            </Typography>
          </Button>
        </Box>
      </form>
    </CreateModal>
  );
}
