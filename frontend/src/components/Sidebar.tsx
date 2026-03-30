import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

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
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
        📚 Библиотека
        </Typography>
      </Toolbar>

      {/* Linkovi */}
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
      </List>
    </Drawer>
  );
};

export default Sidebar;