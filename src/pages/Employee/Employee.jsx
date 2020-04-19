import React, { useContext } from 'react';

import CardList from './../../components/CardList/CardList';
import Spinner from './../../components/Spinner/Spinner';
import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';
import { getDataFromStorage } from '../../utils';
import { formatCompanyDetails } from './Employee.utils';

import { Title, H1Title } from './Employee.styles';

const Employee = ({ currentUser }) => {

  const userCompanies = getDataFromStorage('userCompanies');
  const companies = currentUser && formatCompanyDetails({ userCompanies, userId: currentUser.id });

  return (<div className="employee">
    <Title>
      <H1Title>{companies.length > 0 ? 'MY COMPANIES' : 'YOU ARE JOBELESS! JUST LIKE ME :)'}</H1Title>
    </Title>
    <CardList userCompany companies={companies} />
  </div>);
};

const WithEmployee = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser ? (
    <Employee currentUser={currentUser} />
  ) : <Spinner />
}


export default WithEmployee;