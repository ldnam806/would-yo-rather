import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from '../../_DATA';

const initialState = {
  users: [],
  questions: [],
  login: {
    isLoggedIn: false,
  },
  question: {},
  preview: {},
  hasNotFound: false,
};

export const getAllUser = createAsyncThunk('home/getAllUser', async () => {
  const response = await _getUsers();
  return Object.values(response);
});

export const getAllQuestion = createAsyncThunk(
  'home/getAllQuestion',
  async () => {
    const response = await _getQuestions();
    return Object.values(response);
  }
);
export const submited = createAsyncThunk('home/submited', async (data) => {
  const response = await _saveQuestionAnswer(data);
  return response;
});

export const createQuestion = createAsyncThunk(
  'home/createQuestion',
  async (data) => {
    const response = await _saveQuestion(data);
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.login = {
        ...payload,
      };
    },
    setQuestion: (state, { payload }) => {
      state.question = {
        ...payload,
      };
    },
    setQuestions: (state, { payload }) => {
      state.questions = [...payload];
    },
    setPreview: (state, { payload }) => {
      state.preview = { ...payload };
    },
    setNotFound: (state, { payload }) => {
      state.hasNotFound = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
    builder.addCase(getAllQuestion.fulfilled, (state, { payload }) => {
      state.questions = payload;
    });
  },
});

export const { setLogin, setQuestion, setPreview, setQuestions, setNotFound } =
  counterSlice.actions;
export const selectUsers = (state) => state.home.users;
export const selectLogin = (state) => state.home.login;
export const selectQuestions = (state) => state.home.questions;
export const selectQuestion = (state) => state.home.question;
export const selectNotFound = (state) => state.home.hasNotFound;

export default counterSlice.reducer;
