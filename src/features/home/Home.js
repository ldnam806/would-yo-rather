import { useEffect } from 'react';
import { getAllUser, selectLogin } from './homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/Login';
import HomeContent from '../../components/HomeContent';

export default function Home() {
  const login = useSelector(selectLogin);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const dispatch = useDispatch();
  return <div>{login.isLoggedIn ? <HomeContent /> : <Login />}</div>;
}
