import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const PrivateRouteInverse: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return !user ? <div className='mt-20 px-2 sm:px-6 lg:px-32'>
  <Outlet />
</div> : null;
};

export default PrivateRouteInverse;