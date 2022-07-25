import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-[30px]">
      <div className="text-[20px] font-semibold">Not Found Here!</div>
      <Link className="text-blue-400 mt-[20px] text-underline" to="/">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
