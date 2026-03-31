import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black', marginTop: 3, marginBottom: 3 }}>
        Библиотека
        </Typography>
      </Toolbar>

      
      <List>
        <ListItemButton onClick={() => navigate("/books")}
        sx={{
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            '&:hover': {
              backgroundColor: '#e3f2fd'
            }
          }}>
          <ListItemText primary="Књиге" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/borrowed")}
        sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                '&:hover': {
                  backgroundColor: '#e3f2fd'
               }
        }}>
          <ListItemText primary="Позајмљене књиге" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/users")}
        sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                '&:hover': {
                  backgroundColor: '#e3f2fd'
               }
        }}>
          <ListItemText primary="Корисници" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;