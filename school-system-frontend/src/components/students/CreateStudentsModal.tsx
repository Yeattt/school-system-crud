import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { closeCreateModal } from '../../redux';
import { useCreateStudentMutation } from '../../libs';

import { Box, Button, TextField, Typography } from '@mui/material';
import { CreateModal } from '../ui';

import { INewStudent } from '../../interfaces';
import { showErrorAlert, showSuccessAlert } from '../helpers';

export const CreateStudentsModal: FC = () => {
  const { mutateAsync: createNewStudent } = useCreateStudentMutation();

  const dispatch = useDispatch();

  const { handleSubmit, register, formState: { errors }, setError, trigger } = useForm<INewStudent>();

  const onSubmit: SubmitHandler<INewStudent> = async (data) => {
    try {
      await createNewStudent(data);

      dispatch(closeCreateModal());

      showSuccessAlert(dispatch);
    } catch (error: any) {
      showErrorAlert(dispatch);

      console.log('Error creating student');

      if (error.response.data.message.toLowerCase() === 'email already in use') {
        setError('email', { type: 'manual', message: 'El correo ya se encuentra en uso' });
      };
    }
  }

  return (
    <CreateModal title={'Nuevo Estudiante'}>
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
            id='lastname'
            label={'Apellido'}
            variant='outlined'
            size='small'
            {...register('lastname', {
              required: 'El apellido es requerido',
              //* ESTO SIRVE PARA QUE EL ERROR NO SOLAMENTE SALGA CUANDO SE HAGA LA PETICIÓN, SINO TAMBIÉN CUANDO SE QUITE EL FOCUS DEL INPUT
              onBlur: () => trigger('lastname')
            })}
            error={!!errors.lastname}
            helperText={errors.lastname ? errors?.lastname?.message : ''}
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
            id='email'
            label={'Correo'}
            variant='outlined'
            size='small'
            {...register('email', {
              required: 'El correo es requerido',
              pattern: {
                //* EXPRESIÓN REGULAR PARA HACER LA VALIDACIÓN DEL FORMATO DEL CORREO
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Correo no válido',
              },
              onBlur: () => trigger('email')
            })}
            error={!!errors.email}
            helperText={errors.email ? errors?.email?.message : ''}
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