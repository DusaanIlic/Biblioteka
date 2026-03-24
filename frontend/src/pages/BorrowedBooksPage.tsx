import React, { useEffect, useState } from 'react';
import { getBorrowedBooks, returnBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
  Button
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
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchBorrowed();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Borrowed Books
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Ime</b></TableCell>
              <TableCell><b>Prezime</b></TableCell>
              <TableCell><b>Datum pozajmljivanja</b></TableCell>
              <TableCell><b>Datum vracanja</b></TableCell>
              <TableCell><b>Knjiga</b></TableCell>
              <TableCell><b>Akcije</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((b) => (
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
                        Return
                      </Button>
                    )}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BorrowedBooksPage;