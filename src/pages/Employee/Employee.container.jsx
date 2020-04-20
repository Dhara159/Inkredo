import React, { useContext } from 'react';

import Employee from './Employee';
import Spinner from './../../components/Spinner/Spinner';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';

const EmployeeContainer = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser ? (
    <Employee currentUser={currentUser} />
  ) : <Spinner />
};

export default EmployeeContainer;
