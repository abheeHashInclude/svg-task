import React, { useState } from 'react';
import '../styles/UserManagement.css';
import Button from './Button';
import Table from './Table';
import { useUser } from './UserContext';

const PAGES = [
  'Dashboard', 'Reports', 'Users', 'Settings', 'Billing',
  'Analytics', 'Content', 'Notifications', 'Support', 'Logs'
];
const PERMISSIONS = ['View', 'Edit', 'Create', 'Delete'];

const initialUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    role: 'Super Admin',
    permissions: PAGES.reduce((acc, page) => {
      acc[page] = { View: true, Edit: true, Create: true, Delete: true };
      return acc;
    }, {} as Record<string, Record<string, boolean>>),
  },
  {
    id: 2,
    email: 'user1@example.com',
    role: 'User',
    permissions: PAGES.reduce((acc, page) => {
      acc[page] = { View: true, Edit: false, Create: false, Delete: false };
      return acc;
    }, {} as Record<string, Record<string, boolean>>),
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPermissions, setModalPermissions] = useState<Record<string, Record<string, boolean>> | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState('User');
  const [addPermissions, setAddPermissions] = useState<Record<string, Record<string, boolean>>>(
    PAGES.reduce((acc, page) => {
      acc[page] = { View: false, Edit: false, Create: false, Delete: false };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  );
  const [snackbar, setSnackbar] = useState('');
  const { user } = useUser();
  const canAddUser = user?.permissions.UserManagement?.add;

  const selectedUser = users.find(u => u.id === selectedUserId);

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    const user = users.find(u => u.id === userId);
    setModalPermissions(user ? JSON.parse(JSON.stringify(user.permissions)) : null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalPermissions(null);
  };

  const handlePermissionChange = (page: string, perm: string) => {
    if (!modalPermissions) return;
    setModalPermissions({
      ...modalPermissions,
      [page]: {
        ...modalPermissions[page],
        [perm]: !modalPermissions[page][perm],
      },
    });
  };

  const handleSave = () => {
    if (!selectedUserId || !modalPermissions) return;
    setUsers(users.map(u =>
      u.id === selectedUserId
        ? { ...u, permissions: modalPermissions }
        : u
    ));
    closeModal();
  };

  // Add user modal handlers
  const handleAddPermissionChange = (page: string, perm: string) => {
    setAddPermissions({
      ...addPermissions,
      [page]: {
        ...addPermissions[page],
        [perm]: !addPermissions[page][perm],
      },
    });
  };

  const handleAddUser = () => {
    if (!canAddUser) {
      setSnackbar('You do not have permission to add users.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    if (!addName || !addEmail) {
      setSnackbar('Name and email are required.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    setUsers([
      ...users,
      {
        id: Date.now(),
        email: addEmail,
        role: addRole,
        permissions: JSON.parse(JSON.stringify(addPermissions)),
      },
    ]);
    setAddModalOpen(false);
    setAddName('');
    setAddEmail('');
    setAddRole('User');
    setAddPermissions(PAGES.reduce((acc, page) => {
      acc[page] = { View: false, Edit: false, Create: false, Delete: false };
      return acc;
    }, {} as Record<string, Record<string, boolean>>));
    setSnackbar('User added successfully!');
    setTimeout(() => setSnackbar(''), 3000);
  };

  // Prepare table data
  const tableHeaders = ['Email', 'Role', 'Permissions'];
  const tableRows = users.map(user => [
    user.email,
    user.role,
    Object.entries(user.permissions)
      .map(([page, perms]) =>
        Object.entries(perms)
          .filter(([_, v]) => v)
          .map(([perm]) => `${page}:${perm}`)
      )
      .flat()
      .slice(0, 2)
      .join(', ') +
      (Object.entries(user.permissions).flatMap(([_, perms]) => Object.values(perms)).flat().filter(Boolean).length > 2 ? '...' : '')
  ]);

  return (
    <div className="user-mgmt-layout">
      {/* Sidebar with user list */}
      <div className="user-sidebar" style={{ minWidth: 200, marginRight: 24 }}>
        <h4 style={{ marginBottom: 12 }}>All Users</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(u => (
            <li
              key={u.id}
              style={{
                padding: '8px 12px',
                background: selectedUserId === u.id ? '#e6f0ff' : 'transparent',
                cursor: 'pointer',
                borderRadius: 4,
                marginBottom: 4,
              }}
              onClick={() => openModal(u.id)}
            >
              {u.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="user-table-panel">
        <h3>Users</h3>
        {canAddUser && (
          <Button color="blue" size="large" onClick={() => setAddModalOpen(true)}>
            Add User
          </Button>
        )}
        <div>
          <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2563eb', color: '#fff' }}>
                <th style={{ padding: 8 }}>Email</th>
                <th style={{ padding: 8 }}>Role</th>
                <th style={{ padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal(user.id)}
                >
                  <td style={{ padding: 8 }}>{user.email}</td>
                  <td style={{ padding: 8 }}>{user.role}</td>
                  <td style={{ padding: 8 }}>
                    <button
                      style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 8, cursor: 'pointer' }}
                      onClick={e => { e.stopPropagation(); openModal(user.id); }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}
                      onClick={e => { e.stopPropagation(); setUsers(users.filter(u => u.id !== user.id)); }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for permissions */}
      {modalOpen && selectedUser && modalPermissions && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h4>Permissions for {selectedUser.email}</h4>
            <div className="permissions-scroll">
              <table className="permissions-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    {PERMISSIONS.map(p => <th key={p}>{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {PAGES.map(page => (
                    <tr key={page}>
                      <td>{page}</td>
                      {PERMISSIONS.map(perm => (
                        <td key={perm}>
                          <input
                            type="checkbox"
                            checked={modalPermissions[page][perm]}
                            onChange={() => handlePermissionChange(page, perm)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <Button color="blue" size="large" onClick={handleSave}>Save</Button>
              <Button color="red" size="large" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {/* Add User Modal */}
      {addModalOpen && (
        <div className="modal-overlay" onClick={() => setAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAddModalOpen(false)}>&times;</button>
            <h4>Add New User</h4>
            <div style={{ marginBottom: 12 }}>
              <input
                type="text"
                placeholder="Name"
                value={addName}
                onChange={e => setAddName(e.target.value)}
                style={{ marginRight: 8 }}
              />
              <input
                type="email"
                placeholder="Email"
                value={addEmail}
                onChange={e => setAddEmail(e.target.value)}
                style={{ marginRight: 8 }}
              />
              <select value={addRole} onChange={e => setAddRole(e.target.value)} style={{ marginRight: 8 }}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="permissions-scroll">
              <table className="permissions-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    {PERMISSIONS.map(p => <th key={p}>{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {PAGES.map(page => (
                    <tr key={page}>
                      <td>{page}</td>
                      {PERMISSIONS.map(perm => (
                        <td key={perm}>
                          <input
                            type="checkbox"
                            checked={addPermissions[page][perm]}
                            onChange={() => handleAddPermissionChange(page, perm)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <Button color="blue" size="large" onClick={handleAddUser}>Add</Button>
              <Button color="red" size="large" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {snackbar && (
        <div style={{ marginTop: 16, color: 'white', background: '#ef4444', padding: 8, borderRadius: 4, textAlign: 'center' }}>{snackbar}</div>
      )}
    </div>
  );
};

export default UserManagement;
