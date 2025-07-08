import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

// Dummy users and permissions
type Permission = {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
};

type Role = 'superadmin' | 'admin' | 'user';

type SidebarItem =
  | 'Dashboard'
  | 'Clients'
  | 'CustomerSupport'
  | 'FinanceAccounting'
  | 'MarketingList'
  | 'MediaPlans'
  | 'OfferPricingSKUs'
  | 'OrderList'
  | 'ProductsList'
  | 'SalesReports'
  | 'Suppliers'
  | 'UserManagement';

export type UserType = {
  name: string;
  email: string;
  role: Role;
  permissions: Record<SidebarItem, Permission>;
};

const dummyUsers: UserType[] = [
  {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'superadmin',
    permissions: {
      Dashboard: { view: true, add: true, edit: true, delete: true },
      Clients: { view: true, add: true, edit: true, delete: true },
      CustomerSupport: { view: true, add: true, edit: true, delete: true },
      FinanceAccounting: { view: true, add: true, edit: true, delete: true },
      MarketingList: { view: true, add: true, edit: true, delete: true },
      MediaPlans: { view: true, add: true, edit: true, delete: true },
      OfferPricingSKUs: { view: true, add: true, edit: true, delete: true },
      OrderList: { view: true, add: true, edit: true, delete: true },
      ProductsList: { view: true, add: true, edit: true, delete: true },
      SalesReports: { view: true, add: true, edit: true, delete: true },
      Suppliers: { view: true, add: true, edit: true, delete: true },
      UserManagement: { view: true, add: true, edit: true, delete: true },
    },
  },
  {
    name: 'Marketing Admin',
    email: 'marketing@example.com',
    role: 'admin',
    permissions: {
      Dashboard: { view: true, add: false, edit: false, delete: false },
      Clients: { view: false, add: false, edit: false, delete: false },
      CustomerSupport: { view: false, add: false, edit: false, delete: false },
      FinanceAccounting: { view: false, add: false, edit: false, delete: false },
      MarketingList: { view: true, add: true, edit: true, delete: true },
      MediaPlans: { view: true, add: true, edit: false, delete: false },
      OfferPricingSKUs: { view: false, add: false, edit: false, delete: false },
      OrderList: { view: false, add: false, edit: false, delete: false },
      ProductsList: { view: true, add: true, edit: false, delete: false },
      SalesReports: { view: false, add: false, edit: false, delete: false },
      Suppliers: { view: false, add: false, edit: false, delete: false },
      UserManagement: { view: false, add: false, edit: false, delete: false },
    },
  },
  {
    name: 'Sales Admin',
    email: 'sales@example.com',
    role: 'admin',
    permissions: {
      Dashboard: { view: true, add: false, edit: false, delete: false },
      Clients: { view: true, add: true, edit: true, delete: false },
      CustomerSupport: { view: true, add: false, edit: false, delete: false },
      FinanceAccounting: { view: false, add: false, edit: false, delete: false },
      MarketingList: { view: false, add: false, edit: false, delete: false },
      MediaPlans: { view: false, add: false, edit: false, delete: false },
      OfferPricingSKUs: { view: false, add: false, edit: false, delete: false },
      OrderList: { view: true, add: true, edit: false, delete: false },
      ProductsList: { view: true, add: false, edit: false, delete: false },
      SalesReports: { view: true, add: false, edit: false, delete: false },
      Suppliers: { view: true, add: false, edit: false, delete: false },
      UserManagement: { view: false, add: false, edit: false, delete: false },
    },
  },
  {
    name: 'Support User',
    email: 'support@example.com',
    role: 'user',
    permissions: {
      Dashboard: { view: true, add: false, edit: false, delete: false },
      Clients: { view: false, add: false, edit: false, delete: false },
      CustomerSupport: { view: true, add: true, edit: true, delete: false },
      FinanceAccounting: { view: false, add: false, edit: false, delete: false },
      MarketingList: { view: false, add: false, edit: false, delete: false },
      MediaPlans: { view: false, add: false, edit: false, delete: false },
      OfferPricingSKUs: { view: false, add: false, edit: false, delete: false },
      OrderList: { view: false, add: false, edit: false, delete: false },
      ProductsList: { view: false, add: false, edit: false, delete: false },
      SalesReports: { view: false, add: false, edit: false, delete: false },
      Suppliers: { view: false, add: false, edit: false, delete: false },
      UserManagement: { view: false, add: false, edit: false, delete: false },
    },
  },
  {
    name: 'Basic User',
    email: 'user1@example.com',
    role: 'user',
    permissions: {
      Dashboard: { view: true, add: false, edit: false, delete: false },
      Clients: { view: false, add: false, edit: false, delete: false },
      CustomerSupport: { view: false, add: false, edit: false, delete: false },
      FinanceAccounting: { view: false, add: false, edit: false, delete: false },
      MarketingList: { view: false, add: false, edit: false, delete: false },
      MediaPlans: { view: false, add: false, edit: false, delete: false },
      OfferPricingSKUs: { view: false, add: false, edit: false, delete: false },
      OrderList: { view: false, add: false, edit: false, delete: false },
      ProductsList: { view: true, add: true, edit: false, delete: false },
      SalesReports: { view: false, add: false, edit: false, delete: false },
      Suppliers: { view: false, add: false, edit: false, delete: false },
      UserManagement: { view: false, add: false, edit: false, delete: false },
    },
  },
];

// Context types
interface UserContextType {
  user: UserType | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Restore user from cookies on mount
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch {}
    }
  }, []);

  // Dummy login logic
  const login = (email: string, password: string) => {
    if (email === 'superadmin@example.com' && password === 'user@123') {
      setUser(dummyUsers[0]);
      Cookies.set('user', JSON.stringify(dummyUsers[0]), { expires: 1 });
      return true;
    }
    // All other users use 'user@123' as password
    const found = dummyUsers.find(u => u.email === email && password === 'user@123');
    if (found) {
      setUser(found);
      Cookies.set('user', JSON.stringify(found), { expires: 1 });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}; 