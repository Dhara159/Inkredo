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
          const value = typeof (cell) === 'boolean' ? row.endDate ? 'YES' : 'NO' : cellIndex === 0 ? rowIndex + 1 : cell;
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

const List = ({ location: { state: { title, headers, data } } }) => {

  const toBeReturned = data.length > 0 ?
    (
      <>
        <TableTitle>
          <H1Title>{title}</H1Title>
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

