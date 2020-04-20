import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Home from './Home';
import Spinner from './../../components/Spinner/Spinner';

const HomeContainer = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fectchCompanies = async () => {
      const companies = await axios.get('https://my.api.mockaroo.com/companies?key=9707c930');
      setCompanies(companies.data);
    };
    fectchCompanies();
  }, []);

  return companies ? (
    <Home companies={companies} />
  ) : <Spinner />
};

export default HomeContainer;
