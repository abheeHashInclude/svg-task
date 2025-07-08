import React from 'react';
import CommentSection from '../components/CommentSection';
import { useUser } from '../components/UserContext';

const Clients = () => {
  const { user } = useUser();
  const perms = user?.permissions.Clients || { view: false, add: false, edit: false, delete: false };
  return (
    <div>
      <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)', borderRadius: 8, background: '#fff', padding: 24, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Clients</h2>
      </div>
      <CommentSection
        canAdd={perms.add}
        canEdit={perms.edit}
        canDelete={perms.delete}
        userName={user?.name || ''}
      />
    </div>
  );
};

export default Clients; 