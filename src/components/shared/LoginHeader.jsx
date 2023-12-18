import { useAuthContext } from 'context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

export const LoginHeaderComponent = () => {
  const { authUser, setAuthUser, isTokenValid, setIsTokenValid } = useAuthContext();

  const logout = async () => {
      localStorage.removeItem('_token')
      setAuthUser(undefined)
      setIsTokenValid(false)
  }

  return (
    <div>
      {authUser && isTokenValid ? (
        <>
          <p>Welcome! You are logged in.</p>
          <p onClick={logout}>logout</p>
        </>
      ) : (
        <Link to={'/login'}>
            You are not logged in. Please log in to access the content.
        </Link>
      )}
    </div>
  );
};