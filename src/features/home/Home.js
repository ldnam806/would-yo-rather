import { useEffect } from 'react';
import { getAllUser, selectLogin, selectNotFound } from './homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/Login';
import HomeContent from '../../components/HomeContent';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const login = useSelector(selectLogin);
  const hasNotFound = useSelector(selectNotFound);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const dispatch = useDispatch();
  return (
    <div>
      {login.isLoggedIn ? (
        hasNotFound ? (
          <Navigate to="/404" />
        ) : (
          <HomeContent />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}
