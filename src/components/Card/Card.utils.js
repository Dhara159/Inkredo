import { setOrUpdateUserCompanies } from './../../firebase/firebase.utils';

export const alreadyJoined = ({ userId, employees }) => employees.filter((employee) => (employee.uid === userId));

export const joinOrLeaveCompany = async (props) => {
  const { currentUser, updateEmployees, company, employees, companies, indexOfCompany, updateCompanies } = props;
  const data = await alreadyJoined({ userId: currentUser.id, employees });

  (data.length === 0 || ((data[0].endDate) && !(data[0].isCurrentEmployee)))
    ? await joinCompany({ ...props, isAlreadyJoined: data[0] || null })
    : await leaveCompany({ currentUser, employees, updateEmployees, company, companies, indexOfCompany, updateCompanies });
}

export const joinCompany = async ({ currentUser: { id: userId, displayName, email }, updateEmployees, employees, isAlreadyJoined, company: { id: companyId, name }, updateCompanies }) => {
  let userCompany, updatedEmployees;
  if (!isAlreadyJoined) {
    const joinDate = new Date(Date.now()).toLocaleString().split(',')[0];
    const endDate = null;
    updatedEmployees = [...employees, { uid: userId, displayName, email, joinDate, endDate, isCurrentEmployee: true }];
    userCompany = { companyId, name, joinDate, endDate, userId };
  } else {
    updatedEmployees = employees.map((employee) => {
      if (employee.uid === userId) {
        userCompany = { companyId, name, joinDate: employee.joinDate, endDate: null, userId };
        return { ...employee, endDate: null, isCurrentEmployee: true }
      }
      else return employee;
    });
  };

  await setOrUpdateUserCompanies(userCompany);
  await updateEmployees(updatedEmployees);
};

export const leaveCompany = async ({ currentUser: { id: userId }, employees, updateEmployees, company: { id: companyId, name }, updateCompanies }) => {
  let userCompany;
  const updatedEmployees = employees.map(employee => {
    if (employee.uid === userId) {
      const endDate = new Date(Date.now()).toLocaleString().split(',')[0];
      userCompany = { companyId, name, joinDate: employee.joinDate, endDate, userId };
      return { ...employee, endDate, isCurrentEmployee: false }
    }
    return employee;
  }
  );
  await setOrUpdateUserCompanies(userCompany);
  await updateEmployees(updatedEmployees);
};

export const countDuration = ({ companyId, userCompanies }) => {
  const cardCompany = userCompanies.find(({ id }) => (id === companyId));
  let diffDays = 0;
  if (cardCompany) {
    const date1 = new Date(cardCompany.joinDate);
    const date2 = (cardCompany.endDate && new Date(cardCompany.endDate)) || new Date();
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  return diffDays;
}
