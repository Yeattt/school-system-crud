import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeViewModal, RootState } from '../../redux'

import { Box, IconButton, Modal, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const ViewModal: FC<Props> = ({ children, title }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.viewModal.isOpen);

  const handleClose = () => dispatch(closeViewModal());

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
                {title}
              </Typography>

              <IconButton
                onClick={handleClose}
                sx={{
                  width: '30px',
                  height: '30px',
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
              height: 'calc(100% - 60px)',
              width: '100%',
            }}
          >
            <Box
              component='div'
              sx={{
                height: '90%',
                width: '92%',
                padding: '20px 0px 20px 0px',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}