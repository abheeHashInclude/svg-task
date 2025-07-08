import React, { useEffect, useState } from 'react';
import '../styles/modal.css';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: { username: string; email: string; password: string; permissions: string[] }) => void;
  permissionsList: string[];
}

const generatePassword = (length = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onSave, permissionsList }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setEmail('');
      setPassword(generatePassword());
      setPermissions([]);
    }
  }, [isOpen]);

  const handlePermissionChange = (perm: string) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = () => {
    onSave({ username, email, password, permissions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create User</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text" value={password} readOnly />
        </label>
        <div>
          <span>Permissions:</span>
          <div className="permissions-list">
            {permissionsList.map((perm) => (
              <label key={perm} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={permissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
                {perm}
              </label>
            ))}
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal; 