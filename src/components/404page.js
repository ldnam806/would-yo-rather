import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotFound } from '../features/home/homeSlice';

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackHome = () => {
    dispatch(setNotFound(false));
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center mt-[30px]">
      <div className="text-[20px] font-semibold">Not Found Here!</div>
      <span
        onClick={handleBackHome}
        className="text-blue-400 mt-[20px] text-underline cursor-pointer"
        to="/"
      >
        Back To Home
      </span>
    </div>
  );
};

export default NotFound;
