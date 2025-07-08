import React, { useState } from 'react';
import './UserManagement.css';

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

  const selectedUser = users.find(u => u.id === selectedUserId);

  const handlePermissionChange = (page: string, perm: string) => {
    if (!selectedUser) return;
    setUsers(users.map(u =>
      u.id === selectedUser.id
        ? {
            ...u,
            permissions: {
              ...u.permissions,
              [page]: {
                ...u.permissions[page],
                [perm]: !u.permissions[page][perm],
              },
            },
          }
        : u
    ));
  };

  return (
    <div className="user-mgmt-layout">
      <div className="user-table-panel">
        <h3>Users</h3>
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className={selectedUserId === user.id ? 'selected' : ''}
                onClick={() => setSelectedUserId(user.id)}
              >
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {Object.entries(user.permissions)
                    .map(([page, perms]) =>
                      Object.entries(perms)
                        .filter(([_, v]) => v)
                        .map(([perm]) => `${page}:${perm}`)
                    )
                    .flat()
                    .slice(0, 2)
                    .join(', ')}
                  {Object.entries(user.permissions).flatMap(([_, perms]) => Object.values(perms)).flat().filter(Boolean).length > 2 && '...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="permissions-panel">
        {selectedUser ? (
          <>
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
                            checked={selectedUser.permissions[page][perm]}
                            onChange={() => handlePermissionChange(page, perm)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="permissions-placeholder">Select a user to manage permissions</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
