import React from 'react';
import CommentSection from '../components/CommentSection';
import { useUser } from '../components/UserContext';

const ProductsList = () => {
  const { user } = useUser();
  const perms = user?.permissions.ProductsList || { view: false, add: false, edit: false, delete: false };
  return (
    <div>
      <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)', borderRadius: 8, background: '#fff', padding: 24, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Products List</h2>
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

export default ProductsList; 