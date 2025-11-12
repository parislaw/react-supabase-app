import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1>Welcome to React + Supabase Template</h1>
      <p>
        This is a production-ready template with authentication, database CRUD
        operations, and Netlify deployment.
      </p>

      {user ? (
        <div>
          <p>You're logged in as: {user.email}</p>
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Get started by creating an account or logging in.</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};
