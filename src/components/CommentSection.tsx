import React, { useState } from 'react';
import Table from './Table';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentSectionProps {
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  userName: string;
}

const initialComments: Comment[] = [
  { id: 1, text: 'This is a sample comment.', author: 'Super Admin' },
  { id: 2, text: 'Another comment here.', author: 'Regular User' },
];

const CommentSection: React.FC<CommentSectionProps> = ({ canAdd, canEdit, canDelete, userName }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [snackbar, setSnackbar] = useState('');

  const handleAdd = () => {
    if (!canAdd) {
      setSnackbar('You do not have permission to add comments.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, author: userName }]);
      setNewComment('');
    }
  };

  const handleEdit = (id: number, text: string) => {
    if (!canEdit) {
      setSnackbar('You do not have permission to edit comments.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    setEditingId(id);
    setEditText(text);
  };

  const handleEditSave = (id: number) => {
    setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id: number) => {
    if (!canDelete) {
      setSnackbar('You do not have permission to delete comments.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    setComments(comments.filter(c => c.id !== id));
  };

  const inputStyle = {
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: 'none',
    borderRadius: 4,
    padding: '8px 12px',
    outline: 'none',
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    fontSize: 15,
    background: '#fff',
  };

  return (
    <div className="comment-section">
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          style={{ ...inputStyle, width: 260, marginRight: 8 }}
          disabled={!canAdd}
        />
        <button onClick={handleAdd} disabled={!canAdd} style={{ padding: '6px 16px', background: canAdd ? '#2563eb' : '#ccc', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add
        </button>
      </div>
      <Table
        headers={["Comment", "Author", "Actions"]}
        rows={comments.map(c => [
          editingId === c.id ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input value={editText} onChange={e => setEditText(e.target.value)} style={{ ...inputStyle, width: 260, marginRight: 4 }} />
              <button
                onClick={() => handleEditSave(c.id)}
                style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            c.text
          ),
          c.author,
          <>
            <button
              onClick={() => handleEdit(c.id, c.text)}
              disabled={!canEdit}
              style={{ marginRight: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: canEdit ? 'pointer' : 'not-allowed' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(c.id)}
              disabled={!canDelete}
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: canDelete ? 'pointer' : 'not-allowed' }}
            >
              Delete
            </button>
          </>
        ])}
      />
      {snackbar && (
        <div style={{ marginTop: 16, color: 'white', background: '#ef4444', padding: 8, borderRadius: 4, textAlign: 'center' }}>{snackbar}</div>
      )}
    </div>
  );
};

export default CommentSection; 