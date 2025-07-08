import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    // (This logic can be improved with context)
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setSnackbar('Wrong password');
      setTimeout(() => setSnackbar(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ paddingRight: '2.5rem' }}
          />
          <span
            onClick={() => setShowPassword((prev: boolean) => !prev)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '38px',
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: '1.2rem',
              color: '#888'
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword((prev: boolean) => !prev); }}
          >
            {showPassword ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5.05 0-9.27-3.11-11-8 1.21-3.06 3.6-5.5 6.58-6.71"/>
                <path d="M1 1l22 22"/>
                <path d="M9.53 9.53A3.5 3.5 0 0 0 12 16.5c1.93 0 3.5-1.57 3.5-3.5 0-.47-.09-.92-.26-1.33"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
                <circle cx="12" cy="12" r="3.5"/>
              </svg>
            )}
          </span>
        </div>
        <div className="form-footer">
          <button
            type="button"
            className="forgot-password"
            style={{ background: 'none', border: 'none', padding: 0, color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.95rem' }}
            onClick={() => alert('Forgot password functionality not implemented.')}
          >
            Forgot password?
          </button>
        </div>
        <button type="submit" className="login-btn">Login</button>
        {snackbar && (
          <div style={{ marginTop: 16, color: 'white', background: '#ef4444', padding: 8, borderRadius: 4, textAlign: 'center' }}>{snackbar}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
