import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQuestions,
  getAllQuestion,
  selectQuestion,
  submited,
  selectLogin,
  setLogin,
  setQuestions,
} from '../features/home/homeSlice';
import { useNavigate } from 'react-router-dom';

export default function Question() {
  const dispatch = useDispatch();
  const question = useSelector(selectQuestion);
  const questions = useSelector(selectQuestions);
  const login = useSelector(selectLogin);
  const [tempQuestion, setTempQuestion] = useState({});
  const [option, setQuestion] = useState('');
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
  useEffect(() => {
    tempQuestion?.optionOne?.text === question.option.text
      ? setQuestion('optionOne')
      : setQuestion('optionTwo');
  }, [tempQuestion]);

  const setGender = (event) => {
    setQuestion(event.target.value);
  };
  const navigate = useNavigate();

  const onSubmited = async () => {
    await dispatch(
      submited({
        authedUser: login.id,
        qid: question.id,
        answer: option,
      })
    );
    dispatch(
      setLogin({
        ...login,
        answers: {
          ...login.answers,
          [question.id]: option,
        },
      })
    );
    await dispatch(getAllQuestion());
    navigate(`/preview/${question.id}`);
  };

  return (
    <div className="max-w-[600px] mx-auto mt-[20px]  border rounded-[4px]">
      <div className="pl-5 bg-gray-200 border-b py-2 font-bold">
        {tempQuestion?.name} asks:
      </div>
      <div className="flex items-center gap-[30px] p-5">
        <img
          className="w-[100px] h-[100px] rounded-full object-cover"
          src={tempQuestion.avatar}
        />
        <div className="flex flex-col flex-1">
          <span className="text-[22px] font-bold">Would You Rather ...</span>
          <div onChange={(e) => setGender(e)} className="mb-4 mt-2">
            <div className="flex items-center gap-[10px]">
              <input
                type="radio"
                value="optionOne"
                name="option"
                id="option1"
                checked={option === 'optionOne' && true}
              />
              <label for="option1" className="font-semibold">
                {tempQuestion.optionOne?.text}
              </label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                id="option2"
                type="radio"
                value="optionTwo"
                name="option"
                checked={option === 'optionTwo' && true}
              />
              <label for="option2" className="font-semibold">
                {tempQuestion.optionTwo?.text}
              </label>
            </div>
          </div>
          <button
            onClick={() => onSubmited()}
            className="border rounded-[4px] font-bold border-blue-400 text-white bg-blue-400 py-1"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
