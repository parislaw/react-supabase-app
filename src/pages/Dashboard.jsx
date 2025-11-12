import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';
import { DataExample } from '../components/database/DataExample';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <div className="dashboard-content">
        <DataExample />
      </div>
    </div>
  );
};
