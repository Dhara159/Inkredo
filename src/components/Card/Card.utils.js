import { getDataFromStorage, setDataToStorage } from './../../utils';

export const alreadyJoined = ({ userId, newEmployees }) => newEmployees.filter((employee) => (employee.uid === userId));

export const joinOrLeaveCompany = ({ currentUser, updateEmployees, id, newEmployees }) => {
  const data = alreadyJoined({ userId: currentUser.id, newEmployees });

  (data.length === 0 || ((data[0].endDate) && !(data[0].isCurrentEmployee))) ?
    joinCompany({ currentUser, updateEmployees, id, newEmployees, employee: data[0] || null }) :
    leaveCompany({ currentUser, updateEmployees, id })
}

export const joinCompany = ({ currentUser: { id: userId, displayName, email }, updateEmployees, id, employee }) => {
  const companies = getDataFromStorage('companies');
  const newCompanies = companies.map(company => {
    let { id: companyId, employees } = company;
    if (companyId === id) {
      if (!employee) {
        const updatedEmployees = [...employees, { uid: userId, displayName: displayName, email: email, joinDate: new Date(Date.now()).toLocaleString().split(',')[0], endDate: null, isCurrentEmployee: true }]
        company.employees = updatedEmployees
      } else {
        const employeeIndex = company.employees.findIndex((eachEmployee) => eachEmployee.uid === employee.uid);
        company.employees[employeeIndex].endDate = null;
        company.employees[employeeIndex].isCurrentEmployee = true;
      }
      updateEmployees(company.employees);
      updateUserCompanies({ userId, company });
    };
    return company;
  });
  setDataToStorage('companies', newCompanies);
};

export const leaveCompany = ({ currentUser: { id: userId }, updateEmployees, id }) => {
  const companies = getDataFromStorage('companies');

  const newCompanies = companies.map(company => {
    const { id: companyId } = company;
    if (companyId === id) {
      const updatedEmployees = company.employees.map(employee => {
        if (employee.uid === userId) {
          const updatedEmployee = { ...employee, endDate: new Date(Date.now()).toLocaleString().split(',')[0], isCurrentEmployee: false };
          employee = updatedEmployee;
        }
        return employee;
      });
      company.employees = updatedEmployees;
      updateEmployees(updatedEmployees);
      updateUserCompanies({ userId, company });
    };
    return company;
  });

  setDataToStorage('companies', newCompanies);
};

const updateUserCompanies = ({ userId, company }) => {
  const userCompanies = getDataFromStorage('userCompanies') || {};
  if (userCompanies[userId]) {
    userCompanies[userId][company.id] = company;
  } else {
    userCompanies[userId] = {};
    userCompanies[userId][company.id] = company;
  }
  setDataToStorage('userCompanies', userCompanies);
};

export const countDuration = ({ companyId, userId }) => {
  const companies = getDataFromStorage('companies') || {};
  const companyDetails = companies.find(({ id }) => id === companyId);
  const employeeDetails = companyDetails.employees.find(({ uid }) => uid === userId);
  let diffDays = 0;
  if (employeeDetails) {
    const date1 = new Date(employeeDetails.joinDate);
    const date2 = (employeeDetails.endDate && new Date(employeeDetails.endDate)) || new Date();
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  return diffDays;
}

