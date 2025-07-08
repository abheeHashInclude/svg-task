import React, { useState } from 'react';
import { useUser } from '../components/UserContext';
import { UserType } from '../components/UserContext';
import Cookies from 'js-cookie';
import Table from '../components/Table';
import { Navigate } from 'react-router-dom';
import CreateUserModal from '../components/CreateUserModal';

const UserManagement = () => {
  const { user } = useUser();
  const [showAddUserModal, setShowAddUserModal] = useState(false);


  // Get all users from cookie (if present)
  let users: UserType[] = [];
  try {
    const allUsers = Cookies.get('all_users');
    if (allUsers) users = JSON.parse(allUsers);
  } catch { }

  // Fallback: show only current user if no cookie
  if (!users.length && user) users = [user];

  return (
    <div>
      <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)', borderRadius: 8, background: '#fff', padding: 24, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>User Management</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          onClick={() => setShowAddUserModal(true)}
          style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}
        >
          Add user
        </button>
      </div>

      <Table
        headers={["Name", "Email", "Role"]}
        rows={users.map(u => [u.name, u.email, u.role])}
      />

      <CreateUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={() => setShowAddUserModal(false)}
        permissionsList={["admin", "user", "viewer"]}
      />
    </div>
  );
};

export default UserManagement; 