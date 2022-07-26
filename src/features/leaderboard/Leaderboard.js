import {
  selectUsers,
  selectQuestions,
  getAllQuestion,
  selectLogin,
  getAllUser,
} from '../../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [board, setBoard] = useState([]);
  const users = useSelector(selectUsers);
  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);

  useEffect(() => {
    dispatch(getAllUser()).then((res) => {
      let temps = res.payload
        .map((user) => {
          return {
            ...user,
            scope: Object.keys(user.answers).length + user.questions.length,
          };
        })
        .sort((a, b) => b.scope - a.scope);
      setBoard(temps);
    });
  }, [login]);

  useEffect(() => {}, []);
  return (
    <div className="leaderboard w-[600px] mx-auto">
      <div className="mt-6">
        {board?.map((user, index) => (
          <div
            key={user.id}
            className="relative flex items-center justify-between gap-4 mb-4 rounded-[4px] border p-4"
          >
            <div className="flex items-center gap-8 flex-1">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user.avatarURL}
                />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <span className="text-[18px] font-bold">{user.name}</span>
                <div className="flex flex-col">
                  <span className="font-semibold pb-2 border-b flex items-center justify-between">
                    <span>Answered questions</span>
                    <span>{Object.keys(user.answers).length}</span>
                  </span>
                  <span className="font-semibold pt-2 flex items-center justify-between">
                    <span>Created questions </span>
                    <span>{user.questions.length}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 border rounded-[4px]">
              <div className="bg-gray-100 px-8 py-2 font-bold border-b">
                Score
              </div>
              <div className="flex items-center justify-center pb-2">
                <span className="bg-blue-200 rounded-full w-[50px] h-[50px] flex items-center justify-center text-white font-bold">
                  {user.scope}
                </span>
              </div>
            </div>

            <div
              className={`absolute flex items-center justify-center text-white rounded-[4px] top-1 left-1 w-[25px] h-[25px] bg-blue-100 bg-red-${
                board.length - index
              }00`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
