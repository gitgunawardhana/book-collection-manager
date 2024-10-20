import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const ProtectedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // console.log(user)
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div className='mt-20 px-2 sm:px-6 lg:px-32'>
    <Outlet />
  </div>;
};

export default ProtectedRoute;