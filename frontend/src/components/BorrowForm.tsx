import React, { useState } from 'react';
import { borrowBook } from '../services/api';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface Props {
  bookId: number;
  onClose: () => void;
  onBorrowed: (id: number) => void;
}

const BorrowForm: React.FC<Props> = ({ bookId, onClose, onBorrowed }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({
        idBook: bookId,
        firstname,
        lastname,
        dateTake: new Date().toISOString(),
        dateReturn: null
      });
      onBorrowed(bookId);
      onClose();
    } catch (err) {
      console.error('Error borrowing book:', err);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Borrow Book</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />

          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Borrow
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BorrowForm;