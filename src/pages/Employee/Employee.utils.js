export const formatCompanyDetails = ({ userCompanies, userId }) => {
  const myCompanies = (userCompanies && userCompanies[userId]) || {};
  return Object.keys(myCompanies).map(eachKey => myCompanies[eachKey]);
}