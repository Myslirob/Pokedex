import styled from 'styled-components';

export const Button = styled.button<{ color?: 'green' | 'white'; maxWidth?: number }>`
  border: 1px solid green;
  background-color: ${(props) => props.color === 'green' ? '#77af77' : 'white'};
  color: ${(props) => props.color === 'green' ? 'white' : '#77af77'};
  padding: 1rem;
  text-align: center;
  max-width: ${(props) => props.maxWidth ? props.maxWidth + 'px' : 'inherit'};
  border-radius: 30px;
  width: 100%;
  cursor: pointer;
`;
