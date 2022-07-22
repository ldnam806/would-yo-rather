import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQuestions,
  getAllQuestion,
  selectLogin,
  selectUsers,
} from '../features/home/homeSlice';
import Poll from './Poll';

export default function HomeContent() {
  const questions = useSelector(selectQuestions);
  const users = useSelector(selectUsers);
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();
  const [all, setAll] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [currentAnswered, setCurrentAnswered] = useState([]);
  useEffect(() => {
    dispatch(getAllQuestion());
  }, []);
  useEffect(() => {
    setCurrentAnswered(Object.keys(login.answers));
  }, [login]);

  useEffect(() => {
    let clone = [];
    const temp = questions
      .map((item) => {
        return {
          id: item.id,
          author: item.author,
          options: [item.optionOne, item.optionTwo],
          timestamp: item.timestamp,
          name: users.find((user) => user.id === item.author).name || 'N/A',
          avatar: users.find((user) => user.id === item.author).avatarURL,
        };
      })
      .forEach((item) => {
        item.options.forEach((option) => {
          clone.push({
            id: item.id,
            author: item.author,
            option,
            timestamp: item.timestamp,
            name: item.name,
            avatar: item.avatar,
          });
        });
      });
    setAll(clone);
  }, [questions]);

  return (
    <div className="max-w-[400px] mx-auto mt-[20px]  border rounded-[4px]">
      <div className="w-full flex items-center justify-center border-b ">
        <div
          className={`text-blue-400 text-center flex-1 font-bold text-[16px] py-2 cursor-pointer ${
            activeTab == 1 && 'bg-gray-200'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Unanswered Questions
        </div>
        <div
          className={`text-blue-400 text-center flex-1 font-bold text-[16px] py-2 cursor-pointer ${
            activeTab == 2 && 'bg-gray-200'
          }`}
          onClick={() => setActiveTab(2)}
        >
          Answered Questions
        </div>
      </div>
      <div className="p-4">
        {activeTab === 1 && (
          <div>
            {all
              ?.filter((item) => !currentAnswered.includes(item.id))
              .map((option, index) => (
                <Poll key={index} question={{ ...option, isAnswered: false }} />
              ))}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {all
              ?.filter((item) => item.option?.votes.includes(login.id))
              .map((option, index) => (
                <Poll key={index} question={{ ...option, isAnswered: true }} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
