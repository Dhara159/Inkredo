import React, { memo, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';
import { joinOrLeaveCompany, alreadyJoined, countDuration } from './Card.utils';

import { CardContainer, CardName, JoinButton, ListButton, ExtraDetails } from './Card.styles';

const Card = ({ company, history, match, userCompany }) => {
  const { name, id, employees } = company;

  const [newEmployees, updateEmployees] = useState(employees);
  const currentUser = useContext(CurrentUserContext);

  const listEmployees = (event) => {
    const companies = JSON.parse(localStorage.getItem('companies'));
    const { employees: data } = companies.find(({ id: companyId }) => id === companyId);
    history.push({
      pathname: `${match.url}companies/${name}`,
      state: {
        companyId: id,
        title: 'EMPLOYEES',
        data,
        headerMapping: {
          "id": "uid",
          "name": "displayName",
          "email": "email",
          "join date": "joinDate",
          "end date": "endDate",
          "current employee": "isCurrentEmployee"
        }
      }
    });
    event.stopPropagation();
  }

  const data = (currentUser && newEmployees && alreadyJoined({ userId: currentUser.id, newEmployees })) || [];

  return (
    <CardContainer>
      <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt="company" />
      <div>
        <CardName> {name} </CardName>
        {
          userCompany ?
            <ExtraDetails>Duration: {`${countDuration({ companyId: id, userId: currentUser.id })} Days`}</ExtraDetails>
            :
            <ExtraDetails>Employees: {newEmployees.length}</ExtraDetails>
        }
      </div>
      {
        !userCompany ? (
          <div className="buttons">
            <ListButton onClick={listEmployees}>EMPLOYEES</ListButton>
            {currentUser ?
              <JoinButton onClick={() => joinOrLeaveCompany({ currentUser, updateEmployees, id, newEmployees })}>
                {
                  data.length > 0 && !(data[0].endDate) ? 'Leave -' : 'Join +'
                }
              </JoinButton>
              : null}
          </div>
        ) : null
      }
    </CardContainer>
  );
};

export default memo(withRouter(Card));