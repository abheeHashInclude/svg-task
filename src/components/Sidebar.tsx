import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useUser } from './UserContext';

const sidebarMap = [
  { label: 'Dashboard', route: '/dashboard', key: 'Dashboard' },
  { label: 'Users', route: '/user-management', key: 'UserManagement' },
  { label: 'Products List', route: '/products-list', key: 'ProductsList' },
  { label: 'Marketing List', route: '/marketing-list', key: 'MarketingList' },
  { label: 'Order List', route: '/order-list', key: 'OrderList' },
  { label: 'Media Plans', route: '/media-plans', key: 'MediaPlans' },
  { label: 'Offer Pricing', route: '/offer-pricing-skus', key: 'OfferPricingSKUs' },
  { label: 'Clients', route: '/clients', key: 'Clients' },
  { label: 'Suppliers', route: '/suppliers', key: 'Suppliers' },
  { label: 'Customer Support', route: '/customer-support', key: 'CustomerSupport' },
  { label: 'Sales Reports', route: '/sales-reports', key: 'SalesReports' },
  { label: 'Finance', route: '/finance-accounting', key: 'FinanceAccounting' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const filteredItems = sidebarMap.filter(item => {
    if (!user) return false;
    if (item.key === 'UserManagement' && user.role !== 'superadmin') return false;
    return user.permissions[item.key as keyof typeof user.permissions]?.view;
  });

  const handleItemClick = (item: any) => {
    if (item.route) navigate(item.route);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Dashboard</div>
      <ul className="sidebar-list">
        {filteredItems.map(item => (
          <li
            key={item.label}
            className={location.pathname === item.route ? 'active' : ''}
            onClick={() => handleItemClick(item)}
          >
            <span className="sidebar-label">{item.label}</span>
          </li>
        ))}
        <li onClick={handleLogout} style={{ color: '#ef4444', cursor: 'pointer', marginTop: 24 }}>
          <span className="sidebar-label">Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
