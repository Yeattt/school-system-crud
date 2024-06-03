import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

import { useGetTeachers, useUpdateClassMutation } from '../../libs';
import { ITeacher, IUpdateClass } from '../../interfaces';
import { UpdateModal } from '../ui/UpdateModal';
import { RootState, closeUpdateModal } from '../../redux';
import { showErrorAlert, showSuccessAlert } from '../helpers';

export const UpdateClassesModal: FC = () => {
  const payload = useSelector((state: RootState) => state.modal.updateModal.data);

  const { mutateAsync: updateClass } = useUpdateClassMutation();
  const { data: teachers } = useGetTeachers();
  const dispatch = useDispatch();

  const { handleSubmit, register, setValue, formState: { errors }, trigger } = useForm<IUpdateClass>();

  useEffect(() => {
    if (payload?.data) {
      setValue('name', payload?.data?.name);
      setValue('teacher', payload?.data?.teacherId);
      setValue('description', payload?.data?.description);
    }
  }, [payload?.data, setValue]);

  const onSubmit: SubmitHandler<IUpdateClass> = async (data) => {
    try {
      await updateClass({ id: payload?.id, class: data });
      dispatch(closeUpdateModal());
      showSuccessAlert(dispatch);
    } catch (error: any) {
      showErrorAlert(dispatch);
    }
  };

  return (
    <UpdateModal title={'Actualizar Clase'}>
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
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '35px',
            height: '100%',
            width: '100%',
            marginBottom: 2,
            paddingBottom: 3.5,
          }}
        >
          <TextField
            id='name'
            label={'Nombre de la Clase'}
            variant='outlined'
            size='small'
            {...register('name', {
              required: 'El nombre de la clase es requerido',
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
            id='teacher'
            label={'Profesor'}
            select
            variant='outlined'
            size='small'
            defaultValue={payload?.data?.teacherId}
            {...register('teacher', { required: 'Selecciona un profesor' })}
            error={!!errors.teacher}
            helperText={errors.teacher ? errors?.teacher?.message : ''}
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
          >
            {teachers?.teachers?.map((teacher: ITeacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id='description'
            label={'Descripción'}
            variant='outlined'
            size='small'
            multiline
            rows={4}
            {...register('description', {
              required: 'La descripción de la clase es requerida',
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
            <Typography fontSize={13} fontWeight='bold'>
              {'Actualizar'}
            </Typography>
          </Button>
        </Box>
      </form>
    </UpdateModal>
  );
}
