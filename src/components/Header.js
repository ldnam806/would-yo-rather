import { Link, useNavigate, useLocation } from 'react-router-dom';
import { selectLogin, setLogin } from '../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const login = useSelector(selectLogin);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(
      setLogin({
        isLoggedIn: false,
      })
    );
    navigate('/');
  };
  return (
    <header className="border-b-4 border-blue-300 flex items-center justify-center gap-[20px] pt-[30px] pb-4">
      <div>
        <ul className="flex items-center justify-center  gap-[20px]">
          <li
            className={`text-[18px] font-semibold ${
              pathname === '/' &&
              'bg-blue-300 text-white rounded-[4px] py-1 px-3'
            }`}
          >
            <Link to="/">Home</Link>
          </li>

          {login.isLoggedIn && (
            <li
              className={`text-[18px] font-semibold ${
                pathname === '/add' &&
                'bg-blue-300 text-white rounded-[4px] py-1 px-3'
              }`}
            >
              <Link to="/add">New Question</Link>
            </li>
          )}
          {login.isLoggedIn && (
            <li
              className={`text-[18px] font-semibold ${
                pathname === '/leaderboard' &&
                'bg-blue-300 text-white rounded-[4px] py-1 px-3'
              }`}
            >
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          )}
        </ul>
      </div>
      {login.isLoggedIn && (
        <div className="flex items-center gap-[20px]">
          <span>Hello, {login.name}</span>
          <img
            className="w-[30px] h-[30px] rounded-full object-cover"
            src={login.avatarURL}
          />
          <button onClick={() => onLogout()}>Log out</button>
        </div>
      )}
    </header>
  );
}
