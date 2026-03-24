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
      {/* Naslov */}
      <Toolbar>
        <Typography variant="h6">
          Biblioteka
        </Typography>
      </Toolbar>

      {/* Linkovi */}
      <List>
        <ListItemButton onClick={() => navigate("/books")}>
          <ListItemText primary="Knjige" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/borrowed")}>
          <ListItemText primary="Pozajmljene knjige" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;