import React, { memo } from 'react';

import {
  TableHeaderCellContainer,
  TableBodyCellContainer
} from './TableCell.styles';

const TableCell = ({ value, header }) => {
  const td = header ?
    (<TableHeaderCellContainer>{value}</TableHeaderCellContainer>)
    :
    (<TableBodyCellContainer>{value}</TableBodyCellContainer>);
  return td;
};

export default memo(TableCell);