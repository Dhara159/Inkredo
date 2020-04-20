import React, { useState, useEffect } from 'react';

import Home from './Home';
import Spinner from './../../components/Spinner/Spinner';
import { firestore } from './../../firebase/firebase.utils';
import { fetchCompanies } from './Home.utils';
import CompaniesContext from '../../contexts/Companies/Companies';

const HomeContainer = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fectchCompanies = async () => {
      const companies = await fetchCompanies(firestore);
      setCompanies(companies);
    };
    fectchCompanies();
  }, []);

  return companies ? (
    <CompaniesContext.Provider value={companies}>
      <Home companies={companies} />
    </CompaniesContext.Provider>
  ) : <Spinner />
};

export default HomeContainer;
