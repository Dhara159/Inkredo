import React, { memo, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';

import { CardContainer, CardName, JoinButton, ListButton, TotalEmployees } from './Card.styles.jsx';
import './Card.styles.jsx';

const Card = ({ company: { name, id, employees }, history, match }) => {

  const currentUser = useContext(CurrentUserContext);

  const joinCompany = () => {
    const companies = JSON.parse(localStorage.getItem('companies'));
    const { employees: data } = companies.find(({ id: companyId }) => id === companyId);

    // update employee list

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
        {currentUser ? <JoinButton onClick={joinCompany}>JOIN + </JoinButton> : null}
      </div>
    </CardContainer>
  );
};

export default memo(withRouter(Card));