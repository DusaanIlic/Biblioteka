import React, { useState } from 'react';
import { addBook } from '../services/api';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

const AddBookForm: React.FC<Props> = ({ onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook({
        title,
        author: author || 'Nepoznati autor',
        serialNumber,
        quantity
      });

      onAdded();
      onClose();
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Додај књигу</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Наслов књиге"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Аутор"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <TextField
            label="Редни број"
            fullWidth
            margin="normal"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />

          <TextField
            label="Количина"
            type="number"
            fullWidth
            margin="normal"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Откажи</Button>
          <Button type="submit" variant="contained" color="success">
            Додај
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBookForm;