import React, { memo, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';

import { CardContainer, CardName, JoinButton, ListButton, TotalEmployees } from './Card.styles.jsx';
import './Card.styles.jsx';

const Card = ({ company: { name, id, employees }, history, match }) => {

  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  const joinCompany = () => {
    const companies = JSON.parse(localStorage.getItem('companies'));
    const { employees: data } = companies.find(({ id: companyId }) => id === companyId);

    // Update employees list when new employee will join company

  }

  const listEmployees = (event) => {
    history.push({ pathname: `${match.url}companies/${name}`, state: { companyId: id } });
    event.stopPropagation();
  }

  return (
    <CardContainer>
      <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt="company" />
      <div>
        <CardName> {name} </CardName>
        <TotalEmployees>Employees: {employees.length}</TotalEmployees>
      </div>
      <div className="buttons">
        <ListButton onClick={listEmployees}>EMPLOYEES</ListButton>
        {/* Display join button if employee is logged in */}
        <JoinButton onClick={joinCompany}>JOIN + </JoinButton>
      </div>
    </CardContainer>
  );
};

export default memo(withRouter(Card));