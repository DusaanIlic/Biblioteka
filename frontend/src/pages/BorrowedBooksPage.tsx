import React, { useEffect, useState } from 'react';
import { getBorrowedBooks, returnBook } from '../services/api';

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

interface BorrowedBook {
  id: number;
  firstname: string;
  lastname: string;
  date_take: string;
  date_return: string | null;
  id_book: number;
}

const BorrowedBooksPage: React.FC = () => {
  const [data, setData] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchBorrowed = async () => {
    try {
      const res = await getBorrowedBooks();
      setData(res.data);
    } catch (err) {
      console.error('Error fetching borrowed books:', err);
      setError('Greška pri učitavanju');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id: number) => {
    try {
      await returnBook(id);
      fetchBorrowed();
    } catch (err) {
      console.error('Error returning book:', err);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: '#1e293b'
        }}>
        Trenutno pozajmljene knjige
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
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Ime</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Prezime</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Datum pozajmljivanja</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Datum vracanja</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Knjiga</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Akcije</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.firstname}</TableCell>
                <TableCell>{b.lastname}</TableCell>
                <TableCell>{b.date_take}</TableCell>
                <TableCell>{b.date_return || 'Not returned'}</TableCell>
                <TableCell>{b.id_book}</TableCell>
                <TableCell>
                    {!b.date_return && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleReturn(b.id)}
                      >
                        Vrati
                      </Button>
                    )}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </TableContainer>
    </div>
  );
};

export default BorrowedBooksPage;