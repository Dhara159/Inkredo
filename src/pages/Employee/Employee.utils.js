export const formatCompanyDetails = ({ userCompanies, userId }) => {
  const myCompanies = userCompanies[userId] || {};
  return Object.keys(myCompanies).map(eachKey => myCompanies[eachKey]);
}