import React, { useEffect } from 'react';

import CardList from './../../components/CardList/CardList';

import { Title, H1Title } from './Home.styles';

const Home = ({ companies }) => {
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