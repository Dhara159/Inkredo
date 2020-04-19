/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

import { GlobalStyle } from './global.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/CurrentUser/CurrentUser';

const List = lazy(() => import('./components/List/List'));
const SignInAndSignUp = lazy(() => import('./pages/SignInAndSignUp/SignInAndSignUp'));

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
  }, [unsubscribeFromAuth])

  return (
    <div className="App">
      <GlobalStyle />
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
      </CurrentUserContext.Provider>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route path="/signin" exact
              render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignInAndSignUp />
                  )
              }
            />
            <Route component={List} path="/companies/:company" exact />
            <Route component={Home} path="/" exact />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div >
  );
}

export default App;