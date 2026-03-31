import React, { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Typography,
    Button,
    TablePagination
  } from '@mui/material';

const UsersPage: React.FC = () => {
    return (
        <div>
          <Typography variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1e293b'
            }}>
            Информације о корисницима
          </Typography>

          <TableContainer component={Paper}
         sx={{
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{background: 'linear-gradient(90deg, #1976d2, #42a5f5)'}}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Име</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Презиме</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Контакт телефон</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Мeил адреса</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
          </TableBody>
        </Table>
    
      </TableContainer>
    </div>)
}
export default UsersPage;