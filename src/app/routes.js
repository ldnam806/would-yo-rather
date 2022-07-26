import React from 'react';

const HomeContent = React.lazy(() => import('../components/HomeContent'));
const Preview = React.lazy(() => import('../features/preview/Preview'));
const Question = React.lazy(() => import('../components/Question'));
const Leaderboard = React.lazy(() =>
  import('../features/leaderboard/Leaderboard')
);
const NewQuestion = React.lazy(() =>
  import('../features/newQuestion/NewQuestion')
);
const Login = React.lazy(() => import('../components/Login'));
const NotFound = React.lazy(() => import('../components/404page'));

export const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    isPrivate: true,
    component: <HomeContent />,
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    isPrivate: false,
    component: <Login />,
  },
  {
    name: 'Add',
    path: '/add',
    exact: true,
    isPrivate: true,
    component: <NewQuestion />,
  },
  {
    name: 'Preview',
    path: '/preview/:id',
    exact: true,
    isPrivate: true,
    component: <Preview />,
  },
  {
    name: 'Question',
    path: '/question/:id',
    exact: true,
    isPrivate: true,
    component: <Question />,
  },
  {
    name: 'LeaderBoard',
    path: '/leaderboard',
    exact: true,
    isPrivate: true,
    component: <Leaderboard />,
  },
  {
    name: '404',
    path: '*',
    exact: false,
    isPrivate: true,
    component: <NotFound />,
  },
];

export default routes;
