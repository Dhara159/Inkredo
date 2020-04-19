import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c7eae4;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;

  :hover {
    transform: scale(1.05);
  }
`;

export const CardName = styled.h2`
  display: inline-block;
`;

export const ExtraDetails = styled.p`
  float: right;
  padding-top: 10px;
`;

export const JoinButton = styled.button`
  float: right;
  cursor: pointer;
`;

export const ListButton = styled.button`
  display: inline-block;
  cursor: pointer;
`;