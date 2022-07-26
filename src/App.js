import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import Leaderboard from './features/leaderboard/Leaderboard';
import NewQuestion from './features/newQuestion/NewQuestion';
import Question from './components/Question';
import Header from './components/Header';
import Preview from './features/preview/Preview';
import NotFound from './components/404page';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import routes from './app/routes';
import { setLogin } from './features/home/homeSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  if (window.performance) {
    if (performance.navigation.type == 1) {
      dispatch(
        setLogin({
          isLoggedIn: false,
        })
      );
    } else {
      dispatch(
        setLogin({
          isLoggedIn: false,
        })
      );
    }
  }

  return (
    <>
      <Router>
        <Header />
        <div className="container mx-auto">
          <Suspense fallback={''}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  element={
                    route.isPrivate ? (
                      <PrivateRoute>{route.component}</PrivateRoute>
                    ) : (
                      route.component
                    )
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  );
}

export default App;
