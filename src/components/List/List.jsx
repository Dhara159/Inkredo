import React from 'react';

import TableCell from '../TableCell/TableCell';

import { TableContainer, TableTitle, H1Title } from './List.styles';

const renderHeadingRow = (cell, cellIndex) => (
  <TableCell
    key={`heading_${cellIndex}`}
    value={cell}
    header
  />
);

const renderBodyRow = (row, rowIndex) => {
  const values = [...Object.values(row)];
  return (
    <tr key={`row_${rowIndex}`}>
      {
        values.map((cell, cellIndex) => {
          const value = typeof (cell) === 'boolean' ? row.endDate ? 'YES' : 'NO' : cell;
          return (<TableCell
            key={`row_${rowIndex}_${cellIndex}`}
            value={value}
          />)
        }
        )
      }
    </tr>
  );
}

const theadMarkup = (headers) => (
  <tr>
    {headers.map(renderHeadingRow)}
  </tr>
);

const tbodyMarkup = (data) => data.map(renderBodyRow);
const List = ({ location: { state: { companyId } } }) => {
  const companies = JSON.parse(localStorage.getItem('companies'));
  const { employees: data } = companies.find(({ id }) => id === companyId);
  const headers = ["id", "name", "email", "join date", "end date", "past employee"]
  const toBeReturned = data.length > 0 ?
    (
      <>
        <TableTitle>
          <H1Title>EMPLOYEES</H1Title>
        </TableTitle>
        <TableContainer>
          <thead>
            {theadMarkup(headers)}
          </thead>
          <tbody>
            {tbodyMarkup(data)}
          </tbody>
        </TableContainer>
      </>
    ) : (
      <div class="title">
        <h1>OOPS! YOU ARE ALONE!</h1>
      </div>
    );
  return toBeReturned;
};

export default List;

