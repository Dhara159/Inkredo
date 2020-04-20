import React, { memo } from 'react';

import CardList from './../../components/CardList/CardList';

import { Title, H1Title } from './Employee.styles';

const Employee = ({ companies }) => {
  return (<div className="employee">
    <Title>
      <H1Title>{companies.length > 0 ? 'MY COMPANIES' : 'YOU ARE JOBELESS! JUST LIKE ME :)'}</H1Title>
    </Title>
    <CardList userCompany companies={companies} />
  </div>);
};

export default memo(Employee);