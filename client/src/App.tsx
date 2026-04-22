import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { Fleets } from "./pages/Fleets";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flota"
              element={
                <ProtectedRoute>
                  <Fleets />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
