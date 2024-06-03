import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';

import { RootState, closeSuccessAlert } from '../../redux';

interface Props {
  message: string;
}

export const SuccessAlert: FC<Props> = ({ message }) => {
  const isOpen = useSelector((state: RootState) => state.alert.successAlert.isOpen);

  const dispatch = useDispatch();

  return (
    <Box sx={{
      width: '30%',
      position: 'absolute',
      bottom: '10px',
      right: '50px',
      zIndex: 10
    }}>
      <Collapse in={isOpen}>
        <Alert
          variant='filled'
          icon={<CheckCircleIcon sx={{ color: '#24A15F' }} />}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => { dispatch(closeSuccessAlert()) }}
              sx={{
                color: '#000000'
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            backgroundColor: '#B6DFC7',
            borderBottom: '2px solid #0AAB54',
            mb: 2
          }}
        >
          <Typography sx={{
            color: '#5D5E5C',
            fontWeight: 'bold',
            fontSize: 15
          }}>
            {message}
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  );
}