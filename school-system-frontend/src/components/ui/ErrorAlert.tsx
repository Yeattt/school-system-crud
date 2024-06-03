import { FC } from 'react';

import { RootState, closeErrorAlert } from '../../redux';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  message: string;
}

export const ErrorAlert: FC<Props> = ({ message }) => {
  const isOpen = useSelector((state: RootState) => state.alert.errorAlert.isOpen);

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
          icon={<WarningIcon sx={{ color: '#EE4432' }} />}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => { dispatch(closeErrorAlert()) }}
              sx={{
                color: '#000000'
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            backgroundColor: '#FFE3DF',
            borderBottom: '2px solid #EF3B28',
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