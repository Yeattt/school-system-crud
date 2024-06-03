import { FC } from 'react';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { SchoolOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const SideBar: FC = () => {
  const menuItems = [
    {
      href: 'classes',
      icon: <DateRangeIcon />,
      title: 'Clases',
    },
    {
      href: 'students',
      icon: <PeopleAltIcon />,
      title: 'Estudiantes',
    },
    {
      href: 'teachers',
      icon: <LocalLibraryIcon />,
      title: 'Profesores',
    },
  ];

  return (
    <Drawer
      anchor='left'
      open={true}
      variant='persistent'
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'none', sm: 'block' },
        transition: 'all 0.5s ease-out',
      }}
    >
      <Box sx={{
        backgroundColor: '#18191A',
        paddingTop: 2,
        width: 260,
        '@media (min-height: 0px and max-height: 850px)': {
          height: '100%',
        },
        '@media (min-height: 850px)': {
          height: '100vh',
        },
      }}>
        <Box sx={{
          display: 'flex',
          marginBottom: '7px',
          paddingBottom: 2,
          paddingLeft: 1.5
        }}>
          <Typography sx={{ color: '#FFFF', fontSize: '17px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '15px' }}>
            SCHOOL SYSTEM
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: 0.5,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#FFFF',
              borderRadius: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px',
              height: '90px',
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            <SchoolOutlined sx={{ fontSize: 55 }} />
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 2,
          marginBottom: 2,
        }}>
          <Typography sx={{ color: '#7C8082', fontSize: '13px', marginRight: 1 }}>
            Administración
          </Typography>

          <hr style={{ flex: '1', marginRight: '10px', backgroundColor: '#303233', border: '0.0001px solid #303233' }} />
        </Box>

        {
          menuItems.map(menuItem => (
            <List
              sx={{
                color: '#FFFF',
                fontWeight: 'bold',
                '& > .MuiListItem-root': {
                  marginTop: '-10px',
                }
              }}
              key={menuItem.title}
            >
              <ListItem>
                <Link
                  to={`/${menuItem.href}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    sx={{
                      width: 225,
                      borderRadius: '3px',
                      '&:hover': {
                        backgroundColor: '#5e32fc',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: '#FFFF' }}>
                      {menuItem.icon}
                    </ListItemIcon>

                    <ListItemText primary={menuItem.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          ))
        }
      </Box>
    </Drawer>
  );
}