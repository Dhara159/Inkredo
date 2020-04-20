import React, { memo } from 'react';

import Card from './../Card/Card';

import { CardListContainer } from './CardList.styles'

export const CardList = ({ companies, userCompany }) => {

  return (<CardListContainer>
    {
      companies.map((company, index) => <Card userCompany={userCompany} key={company.id} company={company} indexOfCompany={index} />)
    }
  </CardListContainer>)
};

export default memo(CardList);