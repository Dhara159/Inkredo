/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

import { GlobalStyle } from './global.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/CurrentUser/CurrentUser';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const List = lazy(() => import('./components/List/List'));
const SignInAndSignUp = lazy(() => import('./pages/SignInAndSignUp/SignInAndSignUp'));
const Employee = lazy(() => import('./pages/Employee/Employee'));

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }, []);

  useEffect(() => {
    return () => unsubscribeFromAuth();
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
      </CurrentUserContext.Provider>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <CurrentUserContext.Provider value={currentUser}>
              <PrivateRoute inverted currentUser={currentUser} component={SignInAndSignUp} path="/signin" exact />
              <PrivateRoute currentUser={currentUser} component={Employee} path="/mycompanies" exact />
              <Route component={List} path="/companies/:company" exact />
              <Route component={Home} path="/" exact />
            </CurrentUserContext.Provider>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div >
  );
}

export default App;