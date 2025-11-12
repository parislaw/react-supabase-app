import React, { useState } from 'react';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? <Login /> : <SignUp />}
    </div>
  );
};
