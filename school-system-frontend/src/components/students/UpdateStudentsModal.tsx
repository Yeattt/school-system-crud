import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useUpdateStudentMutation } from '../../libs';

import { IUpdateStudent } from '../../interfaces';
import { UpdateModal } from '../ui/UpdateModal';
import { RootState, closeUpdateModal } from '../../redux';
import { showErrorAlert, showSuccessAlert } from '../helpers';

export const UpdateStudentsModal: FC = () => {
  const payload = useSelector((state: RootState) => state.modal.updateModal.data);

  const { mutateAsync: updateStudent } = useUpdateStudentMutation();

  const dispatch = useDispatch();

  const { handleSubmit, register, setValue, formState: { errors }, setError, trigger } = useForm<IUpdateStudent>();

  useEffect(() => {
    if (payload?.data !== null) {
      setValue('name', payload?.data.name);
      setValue('lastname', payload?.data.description);
      setValue('email', payload?.data.teacher);
    }
  }, [payload?.data, setValue]);

  const onSubmit: SubmitHandler<IUpdateStudent> = async (data) => {
    try {
      await updateStudent({ id: payload?.id, student: data });

      dispatch(closeUpdateModal());

      showSuccessAlert(dispatch);
    } catch (error: any) {
      showErrorAlert(dispatch);

      if (error.response.data.message.toLowerCase() === 'email already in use') {
        setError('email', { type: 'manual', message: 'El correo ya se encuentra en uso' });
      };
    }
  }

  return (
    <UpdateModal title={'Actualizar Estudiante'}>
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
              {'Actualizar'}
            </Typography>
          </Button>
        </Box>
      </form>
    </UpdateModal >
  );
}
