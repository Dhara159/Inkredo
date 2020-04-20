import React, { memo, useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CurrentUserContext from './../../contexts/CurrentUser/CurrentUser';
import CompaniesContext from '../../contexts/Companies/Companies';
import EmployeeContext from './../../contexts/Employee/Employee';
import { joinOrLeaveCompany, alreadyJoined, countDuration } from './Card.utils';
import { updateCompanies } from '../../firebase/firebase.utils';

import { CardContainer, CardName, JoinButton, ListButton, ExtraDetails } from './Card.styles';

const Card = ({ company, history, match, userCompany, indexOfCompany }) => {
  const { name, id, employees: employeesFromProps } = company;
  const [employees, updateEmployees] = useState(employeesFromProps);
  const currentUser = useContext(CurrentUserContext);
  const companies = useContext(CompaniesContext);
  const userCompanies = useContext(EmployeeContext);

  useEffect(() => {
    const callUpdate = async () => {
      if (!userCompany) await updateCompanies({ id, employees });
    };
    callUpdate();
  }, [employees, id, userCompany]);

  const listEmployees = (event) => {
    history.push({
      pathname: `${match.url}companies/${name}`,
      state: {
        companyId: id,
        title: 'EMPLOYEES',
        data: employees,
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

  const data = (currentUser && employees && alreadyJoined({ userId: currentUser.id, employees })) || [];

  return (
    <CardContainer>
      <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt="company" />
      <div>
        <CardName> {name} </CardName>
        <ExtraDetails>{userCompany ? `Duration ${countDuration({ companyId: id, userCompanies })} Days` : `Employees: ${employees.length}`}</ExtraDetails>
      </div>
      {
        !userCompany ? (
          <div className="buttons">
            <ListButton onClick={listEmployees}>EMPLOYEES</ListButton>
            {currentUser ?
              <JoinButton onClick={() => joinOrLeaveCompany({ currentUser, updateEmployees, company, employees, companies, indexOfCompany, updateCompanies })}>
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