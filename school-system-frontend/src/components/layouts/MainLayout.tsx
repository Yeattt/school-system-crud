import { FC } from 'react';

import { Box } from '@mui/material';

import { ErrorAlert, SideBar, SuccessAlert } from '../ui';
// import { ErrorAlert } from '../admin/ui/ErrorAlert';

interface Props {
  children?: React.ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{ width: '100vw', height: '100vh', display: 'flex', m: 0, p: 0, backgroundColor: '#F1F1F7' }}
    >
      <Box
        component='aside'
        sx={{ width: { sm: '260px' }, height: '100vh', flexShrink: { xs: 0 }, m: 0, p: 0 }}
      >
        <SideBar />
      </Box>

      <Box
        component='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ height: '100%', minWidth: 'calc(100vw - 260px)', maxWidth: 'calc(100vw - 260px)', m: 0, p: 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: 'calc(99% - 62px)',
            width: '98%',
          }}
        >
          {children}
        </Box>

        {/* Alerts */}
        <SuccessAlert message='Acción realizada satisfactoriamente' />
        <ErrorAlert message='Whoops! error en la creación o actualización' />
      </Box>
    </Box>
  );
}