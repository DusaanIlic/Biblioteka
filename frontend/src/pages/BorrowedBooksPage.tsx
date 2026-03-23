import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BorrowedBook {
  id: number;
  firstname: string;
  lastname: string;
  date_take: string;
  date_return: string;
  id_book: number;
}

const BorrowedBooksPage: React.FC = () => {
  const [borrowed, setBorrowed] = useState<BorrowedBook[]>([]);

  const fetchBorrowed = async () => {
    try {
      const res = await axios.get('http://localhost:8081/Borrowed/all');
      setBorrowed(res.data);
    } catch (err) {
      console.error('Error fetching borrowed books:', err);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  return (
    <div>
      <h2>Borrowed Books</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Take</th>
            <th>Date Return</th>
            <th>Book ID</th>
          </tr>
        </thead>
        <tbody>
          {borrowed.map(b => (
            <tr key={b.id}>
              <td>{b.firstname}</td>
              <td>{b.lastname}</td>
              <td>{b.date_take}</td>
              <td>{b.date_return || '-'}</td>
              <td>{b.id_book}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooksPage;