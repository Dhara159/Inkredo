import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CardList from './../../components/CardList/CardList';

import { Title, H1Title } from './Home.styles';

const Home = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    const fectchCompanies = async () => {
      const companies = await axios.get('https://my.api.mockaroo.com/companies?key=9707c930');
      setCompanies(companies.data);
    };
    fectchCompanies();
  }, []);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies])

  return (
    (<div className="home">
      <Title>
        <H1Title>COMPANIES</H1Title>
      </Title>
      <CardList companies={companies} />
    </div>)
  )
};

export default Home;