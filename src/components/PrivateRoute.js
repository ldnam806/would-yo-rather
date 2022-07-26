import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectLogin } from '../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPath } from '../app/commonSlice';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPath(location.pathname));
  }, [location.pathname]);
  if (!login.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
