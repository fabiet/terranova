import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ConfigCheck from './components/ConfigCheck';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import UserSetup from './components/UserSetup';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <ConfigCheck />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user-setup" element={<UserSetup />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredRole="President">
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoices" 
                element={
                  <ProtectedRoute requiredRole="Client">
                    <InvoicesPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;