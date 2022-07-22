import {
  selectQuestion,
  selectQuestions,
  selectLogin,
  selectUsers,
  getAllQuestion,
} from '../home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const classNamesVoted =
  'flex flex-col gap-2 bg-blue-200 border-2 border-blue-300 p-4 text-blue-800 font-bold text-[16px] rounded-[4px] voted';

const classNamesUnvoted =
  'flex flex-col gap-2 bg-gray-100 border-2 border-gray-200 p-4 text-gray-800 font-bold text-[16px] rounded-[4px]';

export default function Preview() {
  const users = useSelector(selectUsers);
  const [tempQuestion, setTempQuestion] = useState({});
  const questions = useSelector(selectQuestions);
  const question = useSelector(selectQuestion);
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = questions.find((cquestion) => cquestion.id === question.id);
    setTempQuestion({
      name: question.name,
      optionOne: temp.optionOne,
      optionTwo: temp.optionTwo,
      id: question.id,
      avatar: question.avatar,
    });
  }, [questions]);

  const calcPercents = (userAnswers, totalUser) => {
    let sum = (userAnswers / totalUser) * 100;
    return sum > 0 ? `${sum.toFixed(1)}%` : '';
  };

  return (
    <div className="max-w-[600px] mx-auto mt-[20px]  border rounded-[4px]">
      <div className="pl-5 bg-gray-100 border-b py-2 font-bold">
        Asked by {question?.name}
      </div>
      <div className="flex items-center gap-[30px] p-5">
        <img
          className="w-[100px] h-[100px] rounded-full object-cover"
          src={question.avatar}
        />
        <div className="flex flex-col flex-1">
          <span className="text-[22px] font-bold">Results:</span>
          <div className="mb-4 mt-2 flex flex-col gap-5">
            <div
              className={` ${
                tempQuestion?.optionOne?.votes?.includes(login.id)
                  ? classNamesVoted
                  : classNamesUnvoted
              } `}
            >
              <span>Would you rather {tempQuestion.optionOne?.text}</span>
              <div className="relative h-[30px] bg-gray-200 rounded-[4px]">
                <div
                  className="absolute rounded-[4px] text-white  h-full bg-blue-400 text-center flex items-center justify-center"
                  style={{
                    width: calcPercents(
                      tempQuestion?.optionOne?.votes?.length,
                      users.length
                    ),
                  }}
                >
                  {calcPercents(
                    tempQuestion?.optionOne?.votes?.length,
                    users.length
                  )}
                </div>
              </div>
              <div className="text-black text-center">
                {tempQuestion?.optionOne?.votes?.length} out of&nbsp;
                {users.length}&nbsp;votes
              </div>
            </div>
            <div
              className={`${
                tempQuestion?.optionTwo?.votes?.includes(login.id)
                  ? classNamesVoted
                  : classNamesUnvoted
              } `}
            >
              <span> Would you rather {tempQuestion.optionTwo?.text}</span>
              <div className="relative h-[30px] bg-gray-200 rounded-[4px]">
                <div
                  className="absolute rounded-[4px] text-white h-full bg-blue-400 text-center flex items-center justify-center"
                  style={{
                    width: calcPercents(
                      tempQuestion?.optionTwo?.votes?.length,
                      users.length
                    ),
                  }}
                >
                  {calcPercents(
                    tempQuestion?.optionTwo?.votes?.length,
                    users.length
                  )}
                </div>
              </div>
              <div className="text-black text-center">
                {tempQuestion?.optionTwo?.votes?.length} out of&nbsp;
                {users.length}&nbsp;votes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
