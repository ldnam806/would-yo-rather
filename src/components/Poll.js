import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  setLogin,
  setQuestion,
  setPreview,
} from '../features/home/homeSlice';
import { useNavigate } from 'react-router-dom';

export default function Poll({ question }) {
  const { id, option, name, avatar, isAnswered } = question;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onMoveToQuestion = () => {
    if (isAnswered) {
      navigate(`/preview/${id}`);
      dispatch(
        setQuestion({
          ...question,
        })
      );
      // dispatch(setPreview({ ...question }));
      return;
    }
    dispatch(
      setQuestion({
        ...question,
      })
    );
    navigate(`/question/${id}`);
  };
  return (
    <div className="poll border mb-4 rounded-[4px]">
      <div className="pl-5 bg-gray-200 border-b py-2 font-bold">
        {name} asks:
      </div>
      <div className="flex items-center gap-[30px] p-5">
        <img
          className="w-[80px] h-[80px] rounded-full object-cover"
          src={avatar}
        />
        <div className="flex flex-col flex-1 gap-[15px]">
          <span className="text-[18px] font-bold">Would you rather</span>
          <span>{option?.text}</span>
          <button
            onClick={() => onMoveToQuestion()}
            className="border rounded-[4px] border-blue-400 text-blue-400 py-1 text-center"
          >
            View Poll
          </button>
        </div>
      </div>
    </div>
  );
}
