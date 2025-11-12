import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Check your email for the confirmation link!');
      setLoading(false);
      // Optionally navigate after a delay
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};
