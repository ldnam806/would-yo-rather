import { useState } from 'react';
import { createQuestion, selectLogin } from '../../features/home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function NewQuestion() {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const navigate = useNavigate();
  const [data, setData] = useState({
    optionOneText: '',
    optionTwoText: '',
  });
  const onChangeText = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onCreatedQuestion = async (e) => {
    if (data.optionOneText == '' || data.optionTwoText == '') return;
    let dataSubmit = {
      ...data,
      author: login.id,
    };
    await dispatch(createQuestion(dataSubmit));
    navigate('/');
  };

  return (
    <div className="leaderboard w-[600px] mx-auto mt-4 border rounded-[4px]">
      <div className="py-2 text-center text-[25px] font-bold border-b">
        Create a new question
      </div>
      <div className="p-4">
        <span className="font-semibold text-[14px]">
          Complete the question:
        </span>
        <div className="font-bold text-[20px] mb-2">Would you rather ...</div>
        <div>
          <input
            name="optionOneText"
            type="text"
            value={data.optionOneText}
            onChange={(e) => onChangeText(e)}
            placeholder="Enter Option One Text Here"
            className="w-full focus:outline-none border rounded-[4px] p-2 border-gray-200"
          />
          <div className="text-center font-bold my-1">OR</div>
          <input
            name="optionTwoText"
            type="text"
            value={data.optionTwoText}
            onChange={(e) => onChangeText(e)}
            placeholder="Enter Option Two Text Here"
            className="w-full focus:outline-none border rounded-[4px] p-2 border-gray-200"
          />

          <button
            onClick={onCreatedQuestion}
            className="mt-4 w-full py-2 bg-blue-400 rounded-[4px] text-white font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
