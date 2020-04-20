import React from 'react';

import TableCell from '../TableCell/TableCell';

import { TableContainer, TableTitle, H1Title } from './List.styles';

const List = ({ location: { state: { title, headerMapping, data, alterValue } } }) => {
  const displayHeader = Object.keys(headerMapping) || [];

  const renderHeadingRow = (cell, cellIndex) => (
    <TableCell
      key={`heading_${cellIndex}`}
      value={cell}
      header
    />
  );

  const renderBodyRow = (row, rowIndex) => {
    return (
      <tr key={`row_${rowIndex}`}>
        {displayHeader.map((header, headerIndex) => {
          const keyName = headerMapping[header];
          const value = typeof (row[keyName]) === 'boolean' ? ((row[keyName] && 'YES')) || 'NO' : (headerIndex === 0 ? headerIndex : row[keyName])
          return <TableCell key={`row_${rowIndex}_${headerIndex}`} value={value} />
        })}
      </tr>
    )
  }

  const theadMarkup = (headers) => (
    <tr>
      {headers.map(renderHeadingRow)}
    </tr>
  );

  const tbodyMarkup = (data) => data.map(renderBodyRow);

  return data.length > 0 ?
    (
      <>
        <TableTitle>
          <H1Title>{title}</H1Title>
        </TableTitle>
        <TableContainer>
          <thead>
            {theadMarkup(displayHeader)}
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
};

export default List;

