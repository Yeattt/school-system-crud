import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAssignStudentsMutation } from '../../libs';
import { RootState, setManageStudentsModalPayload } from '../../redux';
import { IStudent } from '../../interfaces';
import { showSuccessAlert } from '../helpers';

interface Props {
  student: IStudent;
};

export const StudentsCard: FC<Props> = ({ student }) => {
  const dispatch = useDispatch();
  const payload = useSelector((state: RootState) => state.modal.manageStudentsModal.data);
  const { mutateAsync: assignStudents } = useAssignStudentsMutation();

  const handleRemoveStudent = async () => {
    const classId: number = payload?.id;

    const currentStudentsIds: number[] = payload?.students?.map((student: IStudent) => student.id) || [];
    const updatedStudentIds: number[] = currentStudentsIds.filter((studentId: number) => studentId !== student.id);
    
    const resp = await assignStudents({
      id: classId,
      students: updatedStudentIds,
    });

    dispatch(setManageStudentsModalPayload({...payload, students: resp?.students}));

    showSuccessAlert(dispatch);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 35,
      width: '150px',
      backgroundColor: '#ebebf0',
      paddingRight: 0.5,
      paddingLeft: 2,
      borderRadius: 10
    }}>
      <Box>
        <Typography sx={{
          color: 'black',
        }}>
          { `${student.name} ${student.lastname[0]}.` }
        </Typography>
      </Box>

      <IconButton
        onClick={handleRemoveStudent}
        sx={{
          width: '30px',
          height: '30px',
          marginLeft: 0.6,
        }}
      >
        <CloseIcon
          sx={{
            color: '#5C5E5C',
            fontSize: '19px',
          }}
        />
      </IconButton>
    </Box>
  );
}