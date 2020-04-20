import React, { useContext, useEffect, useState } from 'react';

import Employee from './Employee';
import Spinner from './../../components/Spinner/Spinner';
import { formatCompanyDetails } from './Employee.utils';
import { fetchUserCompanies } from '../../firebase/firebase.utils';
import EmployeeContext from '../../contexts/Employee/Employee';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';

const EmployeeContainer = () => {
  const [companies, setUserCompanies] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchData = async () => {
      const userCompanies = await fetchUserCompanies({ userId: currentUser.id });
      const companies = await formatCompanyDetails({ userCompanies });
      setUserCompanies(companies);
    };
    fetchData();
  }, [currentUser.id]);

  return currentUser && companies ? (
    <EmployeeContext.Provider value={companies}>
      <Employee currentUser={currentUser} companies={companies} />
    </EmployeeContext.Provider>
  ) : <Spinner />
};

export default EmployeeContainer;
