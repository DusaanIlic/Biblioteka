import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BooksPage from './pages/BooksPage';
import BorrowedBooksPage from './pages/BorrowedBooksPage';
import { Box } from '@mui/material';
import UsersPage from './pages/UserPage';


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            minHeight: '100vh'
          }}
        >
          <Routes>
            <Route path='/' element={<BooksPage />}></Route>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrowed" element={<BorrowedBooksPage />} />
            <Route path="/users" element={<UsersPage/>}/>
          </Routes>
        </Box>

      </Box>
    </Router>
  );
}

export default App;