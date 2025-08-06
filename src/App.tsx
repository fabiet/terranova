
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PresidentLoginPage from './pages/PresidentLoginPage';
import ClientLoginPage from './pages/ClientLoginPage';
import SignUpPage from './pages/SignUpPage';
import ClientPortalPage from './pages/ClientPortalPage';
import PresidentDashboardPage from './pages/president/PresidentDashboardPage';
import PresidentAnalyticsPage from './pages/president/PresidentAnalyticsPage';
import PresidentProjectsPage from './pages/president/PresidentProjectsPage';
import PresidentClientsPage from './pages/president/PresidentClientsPage';
import PresidentInvoicesPage from './pages/president/PresidentInvoicesPage';
import PresidentPaymentsPage from './pages/president/PresidentPaymentsPage';
import PresidentMembersPage from './pages/president/PresidentMembersPage';
import PresidentSettingsPage from './pages/president/PresidentSettingsPage';
import PresidentHelpPage from './pages/president/PresidentHelpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/president" element={<PresidentLoginPage />} />
          <Route path="/login/client" element={<ClientLoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/client" element={<ClientPortalPage />} />
          
          {/* Legacy redirect */}
          <Route path="/dashboard" element={<Navigate to="/president/dashboard" replace />} />
          
          {/* President routes */}
          <Route path="/president/dashboard" element={<PresidentDashboardPage />} />
          <Route path="/president/analytics" element={<PresidentAnalyticsPage />} />
          <Route path="/president/projects" element={<PresidentProjectsPage />} />
          <Route path="/president/clients" element={<PresidentClientsPage />} />
          <Route path="/president/invoices" element={<PresidentInvoicesPage />} />
          <Route path="/president/payments" element={<PresidentPaymentsPage />} />
          <Route path="/president/members" element={<PresidentMembersPage />} />
          <Route path="/president/settings" element={<PresidentSettingsPage />} />
          <Route path="/president/help" element={<PresidentHelpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;