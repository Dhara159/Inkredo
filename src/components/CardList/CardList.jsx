import React, { memo } from 'react';

import Card from './../Card/Card';

import { CardListContainer } from './CardList.styles'

export const CardList = ({ companies }) => {
  return (<CardListContainer>
    {
      companies.map(company => {
        return (
          <Card key={company.id} company={company} />
        )
      })
    }
  </CardListContainer>)
};

export default memo(CardList);