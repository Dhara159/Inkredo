import React, { useState, useEffect } from 'react';

import Home from './Home';
import Spinner from './../../components/Spinner/Spinner';
import { firestore } from './../../firebase/firebase.utils';
import { fetchCompanies } from './Home.utils';

const HomeContainer = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fectchCompanies = async () => {
      const companies = await fetchCompanies(firestore);
      setCompanies(companies);
    };
    fectchCompanies();
  }, [companies.data]);

  return companies ? (
    <Home companies={companies} />
  ) : <Spinner />
};

export default HomeContainer;
