import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles/app.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SidebarLayout from './components/DashboardLayout';
import LoginSuperAdmin from './pages/LoginSuperAdmin';
import LoginUser from './pages/LoginUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductsList from './pages/ProductsList';
import MarketingList from './pages/MarketingList';
import OrderList from './pages/OrderList';
import MediaPlans from './pages/MediaPlans';
import OfferPricingSKUs from './pages/OfferPricingSKUs';
import Clients from './pages/Clients';
import Suppliers from './pages/Suppliers';
import CustomerSupport from './pages/CustomerSupport';
import SalesReports from './pages/SalesReports';
import FinanceAccounting from './pages/FinanceAccounting';
import UserManagement from './pages/UserManagement';
import { UserProvider } from './components/UserContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');
  if (accessToken && refreshToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login-superadmin" element={<LoginSuperAdmin />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/products-list" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
            <Route path="/marketing-list" element={<ProtectedRoute><MarketingList /></ProtectedRoute>} />
            <Route path="/order-list" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
            <Route path="/media-plans" element={<ProtectedRoute><MediaPlans /></ProtectedRoute>} />
            <Route path="/offer-pricing-skus" element={<ProtectedRoute><OfferPricingSKUs /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            <Route path="/customer-support" element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
            <Route path="/sales-reports" element={<ProtectedRoute><SalesReports /></ProtectedRoute>} />
            <Route path="/finance-accounting" element={<ProtectedRoute><FinanceAccounting /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
