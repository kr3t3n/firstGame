import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';

const AuthComponent: React.FC = () => {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-150 ease-in-out"
        title="Sign Out"
      >
        <FaSignOutAlt className="mr-1" /> Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm transition duration-150 ease-in-out"
    >
      <FaGoogle className="mr-1 text-red-500" /> Sign in with Google
    </button>
  );
};

export default AuthComponent;