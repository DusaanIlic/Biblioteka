import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Books from "./pages/Books";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <div>Books page</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;