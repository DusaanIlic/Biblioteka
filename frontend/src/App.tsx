import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BooksPage from './pages/BooksPage';
import BorrowedBooksPage from './pages/BorrowedBooksPage';
import { Box } from '@mui/material';


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Glavni sadržaj */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Routes>
            <Route path='/' element={<BooksPage />}></Route>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrowed" element={<BorrowedBooksPage />} />
          </Routes>
        </Box>

      </Box>
    </Router>
  );
}

export default App;